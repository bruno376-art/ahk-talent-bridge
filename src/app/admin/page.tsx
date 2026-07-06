import { prisma } from "@/lib/db";
import { logout, triggerMatching, triggerShortlist } from "./actions";
import { Logo } from "@/components/Header";
import { isAIConfigured } from "@/lib/ai/anthropic";
import DeleteTalentButton from "@/components/admin/DeleteTalentButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ ran?: string }>;
}) {
  const { ran } = await searchParams;

  const [jobs, talents, matches, jobCount, talentCount, matchCount] = await Promise.all([
    prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
      include: { _count: { select: { matches: true } } },
    }),
    prisma.talent.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
      include: { consents: true },
    }),
    prisma.match.findMany({
      orderBy: { score: "desc" },
      take: 15,
      include: { job: true, talent: true },
    }),
    prisma.job.count(),
    prisma.talent.count(),
    prisma.match.count(),
  ]);

  const card = "bg-white border border-brand-border rounded-xl";
  const th = "text-left text-[12px] font-bold uppercase tracking-[.5px] text-brand-muted-2 px-4 py-3";
  const td = "px-4 py-3 text-[14px] text-[#3C4652] border-t border-brand-border";

  return (
    <main className="min-h-screen bg-[#F4F7FB]">
      <header className="bg-white border-b border-brand-border">
        <div className="max-w-shell mx-auto px-8 h-[74px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="text-[13px] font-bold uppercase tracking-[.5px] text-brand-muted-2">
              Backoffice
            </span>
          </div>
          <div className="flex items-center gap-3">
            <form action={triggerMatching}>
              <button className="h-10 px-4 bg-ahk-blue text-white rounded-md font-bold text-[14px] cursor-pointer">
                Rodar matching
              </button>
            </form>
            <form action={logout}>
              <button className="h-10 px-4 bg-white border border-[#D7DEE7] text-ahk-blue rounded-md font-bold text-[14px] cursor-pointer">
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-shell mx-auto px-8 py-8 flex flex-col gap-6">
        {ran && (
          <div className="bg-brand-green-soft border border-[#C7E9DB] text-[#1F8F6B] rounded-lg px-4 py-3 text-[14px] font-semibold">
            {ran === "matching"
              ? "Matching disparado (processando em background via Inngest)."
              : ran === "deleted"
                ? "Talento e dados relacionados excluídos (LGPD/GDPR)."
                : "Geração de shortlist disparada."}
          </div>
        )}

        {!isAIConfigured() && (
          <div className="bg-[#FBF3E6] border border-[#F0DEB8] text-[#9A6B00] rounded-lg px-4 py-3 text-[14px]">
            ⚠️ <strong>ANTHROPIC_API_KEY</strong> não configurada — padronização, matching e resumos
            ficam inativos. O restante do fluxo funciona normalmente.
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          <Kpi label="Vagas" value={jobCount} />
          <Kpi label="Talentos" value={talentCount} />
          <Kpi label="Matches" value={matchCount} />
        </div>

        {/* Vagas */}
        <section className={card}>
          <h2 className="font-serif font-bold text-[18px] text-ahk-blue px-4 pt-4">Vagas</h2>
          <table className="w-full border-collapse mt-2">
            <thead>
              <tr>
                <th className={th}>Cargo</th>
                <th className={th}>Empresa</th>
                <th className={th}>Status</th>
                <th className={th}>Matches</th>
                <th className={th}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td className={td}>{j.title}</td>
                  <td className={td}>{j.companyName}</td>
                  <td className={td}>{j.status}</td>
                  <td className={td}>{j._count.matches}</td>
                  <td className={td}>
                    <form action={triggerShortlist}>
                      <input type="hidden" name="jobId" value={j.id} />
                      <button className="text-ahk-blue font-bold text-[13px] cursor-pointer underline">
                        Gerar shortlist
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td className={td} colSpan={5}>
                    Nenhuma vaga ainda. Rode <code>npm run db:seed</code> para dados de demonstração.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Talentos */}
        <section className={card}>
          <h2 className="font-serif font-bold text-[18px] text-ahk-blue px-4 pt-4">Talentos</h2>
          <table className="w-full border-collapse mt-2">
            <thead>
              <tr>
                <th className={th}>Nome</th>
                <th className={th}>Área</th>
                <th className={th}>Senioridade</th>
                <th className={th}>Consentimentos</th>
                <th className={th}>Status</th>
                <th className={th}>Dados (LGPD)</th>
              </tr>
            </thead>
            <tbody>
              {talents.map((tt) => {
                const has = (type: string) =>
                  tt.consents.some((c) => c.type === type && c.granted && !c.revokedAt);
                return (
                  <tr key={tt.id}>
                    <td className={td}>{tt.fullName}</td>
                    <td className={td}>{tt.area}</td>
                    <td className={td}>{tt.seniority}</td>
                    <td className={td}>
                      <span className="inline-flex gap-1 text-[11px]">
                        <Badge on={has("data_processing")}>dados</Badge>
                        <Badge on={has("ai_matching")}>IA</Badge>
                        <Badge on={has("communications")}>comms</Badge>
                      </span>
                    </td>
                    <td className={td}>{tt.status}</td>
                    <td className={td}>
                      <span className="inline-flex items-center gap-3">
                        <a
                          href={`/admin/talentos/${tt.id}/export`}
                          className="text-ahk-blue font-bold text-[13px] underline"
                        >
                          Exportar
                        </a>
                        <DeleteTalentButton id={tt.id} name={tt.fullName} />
                      </span>
                    </td>
                  </tr>
                );
              })}
              {talents.length === 0 && (
                <tr>
                  <td className={td} colSpan={6}>
                    Nenhum talento cadastrado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Matches */}
        <section className={card}>
          <h2 className="font-serif font-bold text-[18px] text-ahk-blue px-4 pt-4">
            Top matches
          </h2>
          <table className="w-full border-collapse mt-2">
            <thead>
              <tr>
                <th className={th}>Vaga</th>
                <th className={th}>Candidato</th>
                <th className={th}>Score</th>
                <th className={th}>Justificativa</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr key={m.id}>
                  <td className={td}>{m.job.title}</td>
                  <td className={td}>{m.talent.fullName}</td>
                  <td className={`${td} font-bold text-ahk-green`}>{m.score}</td>
                  <td className={td}>{m.justification}</td>
                </tr>
              ))}
              {matches.length === 0 && (
                <tr>
                  <td className={td} colSpan={4}>
                    Sem matches ainda — cadastre talentos e rode o matching.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-brand-border rounded-xl p-5">
      <div className="text-[13px] text-brand-muted-2 font-semibold">{label}</div>
      <div className="font-serif font-bold text-[32px] text-ahk-blue">{value}</div>
    </div>
  );
}

function Badge({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`px-[6px] py-[2px] rounded font-bold ${
        on ? "bg-brand-green-soft text-[#1F8F6B]" : "bg-[#F2F2F2] text-[#A0A6AD] line-through"
      }`}
    >
      {children}
    </span>
  );
}
