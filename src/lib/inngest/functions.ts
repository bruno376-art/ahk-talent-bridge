import { inngest, EVENTS } from "./client";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";
import { sendEmail } from "@/lib/email";
import { isAIConfigured, AI_MODEL, PROMPT_VERSION } from "@/lib/ai/anthropic";
import { standardizeJob, structureTalent } from "@/lib/ai/standardize";
import { matchJobToTalent, summarizeShortlist } from "@/lib/ai/match";

const SHORTLIST_THRESHOLD = 80;
const SHORTLIST_LIMIT = 10;

/* ───────── Cenário 1 — Cadastro de VAGA (empresa) ───────── */
export const onJobCreated = inngest.createFunction(
  { id: "job-created", name: "Padroniza vaga e confirma", triggers: [{ event: EVENTS.jobCreated }] },
  async ({ event, step }) => {
    const jobId = event.data.jobId as string;
    const job = await step.run("load-job", () =>
      prisma.job.findUnique({ where: { id: jobId } }),
    );
    if (!job) return { skipped: "job-not-found" };

    if (isAIConfigured()) {
      const std = await step.run("standardize", () =>
        standardizeJob({
          companyName: job.companyName,
          rawTitle: job.title,
          area: job.area,
          seniority: job.seniority,
          languages: job.languages,
          location: job.location,
          rawDescription: job.rawDescription,
        }),
      );
      await step.run("save-standardized", () =>
        prisma.job.update({
          where: { id: jobId },
          data: {
            title: std.title || job.title,
            seniority: std.seniority || job.seniority,
            summary: std.idealProfile,
            tags: JSON.stringify(std.tags),
            model: std.workModel || job.model,
            structuredProfile: JSON.stringify(std),
          },
        }),
      );
    }

    await step.run("audit", () =>
      audit({ entityType: "job", entityId: jobId, action: "created", actor: "company" }),
    );

    const company = await step.run("load-company", () =>
      job.companyId ? prisma.company.findUnique({ where: { id: job.companyId } }) : null,
    );
    if (company?.contactEmail) {
      await step.run("email-company", () =>
        sendEmail({
          to: company.contactEmail!,
          subject: "Vaga recebida — AHK Talent Bridge",
          html: `<p>Vaga recebida. Iniciaremos o matching com IA e a curadoria da AHK e retornaremos com perfis qualificados.</p>`,
        }),
      );
    }

    // Dispara matching para a nova vaga.
    await step.sendEvent("trigger-matching", {
      name: EVENTS.matchingRun,
      data: { jobId },
    });

    return { ok: true, jobId };
  },
);

/* ───────── Cenário 2 — Cadastro de TALENTO ───────── */
export const onTalentCreated = inngest.createFunction(
  { id: "talent-created", name: "Estrutura perfil de talento", triggers: [{ event: EVENTS.talentCreated }] },
  async ({ event, step }) => {
    const talentId = event.data.talentId as string;
    const talent = await step.run("load-talent", () =>
      prisma.talent.findUnique({ where: { id: talentId } }),
    );
    if (!talent) return { skipped: "talent-not-found" };

    if (isAIConfigured()) {
      const structured = await step.run("structure", () =>
        structureTalent({
          fullName: talent.fullName,
          area: talent.area,
          seniority: talent.seniority,
          languages: talent.languages,
          internationalExperience: talent.internationalExperience ?? "",
        }),
      );
      await step.run("save-structured", () =>
        prisma.talent.update({
          where: { id: talentId },
          data: { structuredProfile: JSON.stringify(structured) },
        }),
      );
    }

    await step.run("audit", () =>
      audit({ entityType: "talent", entityId: talentId, action: "created", actor: "applicant" }),
    );

    await step.run("email-talent", () =>
      sendEmail({
        to: talent.email,
        subject: "Perfil incluído no Talent Pool — Câmara Brasil-Alemanha",
        html: `<p>Seu perfil foi incluído no Talent Pool da Câmara Brasil-Alemanha. Avisaremos quando houver vagas com alta aderência.</p>`,
      }),
    );

    return { ok: true, talentId };
  },
);

/* ───────── Cenário 3 — MATCHING automático ───────── */
export const runMatching = inngest.createFunction(
  {
    id: "matching-run",
    name: "Matching vaga × candidatos",
    // manual/evento OU toda segunda 06:00
    triggers: [{ event: EVENTS.matchingRun }, { cron: "0 6 * * 1" }],
  },
  async ({ event, step }) => {
    if (!isAIConfigured()) return { skipped: "ai-not-configured" };

    const jobId = event?.data?.jobId as string | undefined;

    const jobs = await step.run("load-open-jobs", () =>
      prisma.job.findMany({ where: { status: "open", ...(jobId ? { id: jobId } : {}) } }),
    );

    // Talentos ativos COM consentimento de matching por IA (LGPD).
    const talents = await step.run("load-consented-talents", async () => {
      const rows = await prisma.talent.findMany({
        where: { status: "active" },
        include: { consents: true },
      });
      return rows.filter((t) =>
        t.consents.some((c) => c.type === "ai_matching" && c.granted && !c.revokedAt),
      );
    });

    let created = 0;
    for (const job of jobs) {
      const jobProfile = job.structuredProfile || `${job.title} — ${job.summary} (${job.languages}, ${job.seniority})`;
      for (const talent of talents) {
        const exists = await step.run(`exists-${job.id}-${talent.id}`, () =>
          prisma.match.findUnique({ where: { jobId_talentId: { jobId: job.id, talentId: talent.id } } }),
        );
        if (exists) continue;

        const talentProfile =
          talent.structuredProfile ||
          `${talent.fullName} — ${talent.area}, ${talent.seniority}, ${talent.languages}. ${talent.internationalExperience ?? ""}`;

        const result = await step.run(`match-${job.id}-${talent.id}`, () =>
          matchJobToTalent({ jobProfile, talentProfile }),
        );

        await step.run(`save-match-${job.id}-${talent.id}`, () =>
          prisma.match.create({
            data: {
              jobId: job.id,
              talentId: talent.id,
              score: Math.max(0, Math.min(100, Math.round(result.score))),
              justification: result.justification,
              gap: result.gap,
              model: AI_MODEL,
              promptVersion: PROMPT_VERSION,
            },
          }),
        );
        await audit({ entityType: "match", entityId: `${job.id}:${talent.id}`, action: "matched" });
        created++;
      }
    }

    return { ok: true, jobs: jobs.length, talents: talents.length, created };
  },
);

/* ───────── Cenário 4 — SHORTLIST para empresa ───────── */
export const generateShortlist = inngest.createFunction(
  { id: "shortlist-generate", name: "Gera shortlist e envia ao RH", triggers: [{ event: EVENTS.shortlistGenerate }] },
  async ({ event, step }) => {
    const jobId = event.data.jobId as string;

    const job = await step.run("load-job", () => prisma.job.findUnique({ where: { id: jobId } }));
    if (!job) return { skipped: "job-not-found" };

    const top = await step.run("load-top-matches", () =>
      prisma.match.findMany({
        where: { jobId, score: { gte: SHORTLIST_THRESHOLD } },
        orderBy: { score: "desc" },
        take: SHORTLIST_LIMIT,
        include: { talent: true },
      }),
    );
    if (top.length === 0) return { ok: true, shortlisted: 0 };

    let summary = null;
    if (isAIConfigured()) {
      summary = await step.run("summarize", () =>
        summarizeShortlist({
          jobTitle: job.title,
          candidates: top.map((m) => ({
            name: m.talent.fullName,
            score: m.score,
            profile: m.talent.structuredProfile || m.talent.languages,
          })),
        }),
      );
    }

    await step.run("audit", () =>
      audit({ entityType: "job", entityId: jobId, action: "shortlisted", detail: { count: top.length } }),
    );

    const company = await step.run("load-company", () =>
      job.companyId ? prisma.company.findUnique({ where: { id: job.companyId } }) : null,
    );
    if (company?.contactEmail) {
      const bullets = (summary?.candidates ?? top.map((m) => ({ name: m.talent.fullName, note: m.justification })))
        .map((c) => `<li><strong>${c.name}</strong> — ${c.note}</li>`)
        .join("");
      await step.run("email-shortlist", () =>
        sendEmail({
          to: company.contactEmail!,
          subject: `Shortlist — ${job.title}`,
          html: `<p>Segue shortlist de candidatos com maior aderência ao perfil solicitado.</p>${summary?.overview ? `<p>${summary.overview}</p>` : ""}<ul>${bullets}</ul>`,
        }),
      );
    }

    return { ok: true, shortlisted: top.length };
  },
);

export const functions = [onJobCreated, onTalentCreated, runMatching, generateShortlist];
