"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";
import { inngest, EVENTS } from "@/lib/inngest/client";
import type { Lang } from "@/i18n/dictionary";

const POLICY_VERSION = "2026-07";

/**
 * Dispara um evento Inngest sem derrubar a action: o registro já foi
 * persistido; o processamento assíncrono pode ser reprocessado depois.
 */
async function dispatch(name: string, data: Record<string, unknown>) {
  try {
    await inngest.send({ name, data });
  } catch (e) {
    console.error(`[inngest] falha ao enviar ${name} (registro já salvo)`, e);
  }
}

export interface ActionResult {
  ok: boolean;
  error?: string;
}

/* ───────── Empresa: publicar vaga ───────── */
const jobSchema = z.object({
  companyName: z.string().min(2),
  contactEmail: z.string().email(),
  jobTitle: z.string().min(2),
  area: z.string().min(1),
  seniority: z.string().min(1),
  languages: z.string().min(1),
  location: z.string().min(2),
  description: z.string().min(10),
  consent: z.literal(true), // confirma associação + termos
  lang: z.enum(["pt", "en"]).default("pt"),
});

export async function submitJob(raw: unknown): Promise<ActionResult> {
  const parsed = jobSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "invalid" };
  }
  const d = parsed.data;

  try {
    const company = await prisma.company.create({
      data: {
        name: d.companyName,
        contactEmail: d.contactEmail,
        isMember: true,
        status: "active",
      },
    });

    const job = await prisma.job.create({
      data: {
        companyId: company.id,
        companyName: d.companyName,
        title: d.jobTitle,
        area: d.area,
        seniority: d.seniority,
        languages: d.languages,
        location: d.location,
        model: d.location, // até a IA padronizar o modelo de trabalho
        rawDescription: d.description,
        summary: "",
        status: "open",
        submittedLang: d.lang as Lang,
      },
    });

    await audit({ entityType: "company", entityId: company.id, action: "created", actor: "company" });
    await dispatch(EVENTS.jobCreated, { jobId: job.id });

    return { ok: true };
  } catch (e) {
    console.error("[submitJob]", e);
    return { ok: false, error: "server" };
  }
}

/* ───────── Talento: entrar no talent pool ───────── */
const talentSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  area: z.string().min(1),
  seniority: z.string().min(1),
  languages: z.string().min(1),
  internationalExperience: z.string().optional().default(""),
  consentData: z.literal(true), // obrigatório (dados + matching IA)
  consentComms: z.boolean().default(false),
  lang: z.enum(["pt", "en"]).default("pt"),
});

export async function submitTalent(raw: unknown): Promise<ActionResult> {
  const parsed = talentSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "invalid" };
  }
  const d = parsed.data;

  try {
    const talent = await prisma.talent.create({
      data: {
        fullName: d.fullName,
        email: d.email,
        area: d.area,
        seniority: d.seniority,
        languages: d.languages,
        internationalExperience: d.internationalExperience,
        status: "active",
        submittedLang: d.lang as Lang,
        // Consentimentos SEPARADOS por finalidade (LGPD/GDPR by design).
        consents: {
          create: [
            { type: "data_processing", granted: true, policyVersion: POLICY_VERSION },
            { type: "ai_matching", granted: true, policyVersion: POLICY_VERSION },
            {
              type: "communications",
              granted: d.consentComms,
              policyVersion: POLICY_VERSION,
              grantedAt: d.consentComms ? new Date() : null,
            },
          ],
        },
      },
    });

    await audit({ entityType: "talent", entityId: talent.id, action: "created", actor: "applicant" });
    await dispatch(EVENTS.talentCreated, { talentId: talent.id });

    return { ok: true };
  } catch (e) {
    console.error("[submitTalent]", e);
    return { ok: false, error: "server" };
  }
}
