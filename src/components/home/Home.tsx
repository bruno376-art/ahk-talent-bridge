"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/LanguageProvider";
import type { JobView } from "@/lib/jobs";
import type { Lang } from "@/i18n/dictionary";

export default function Home({ jobsByLang }: { jobsByLang: Record<Lang, JobView[]> }) {
  const { t, lang } = useI18n();
  const jobs = jobsByLang[lang] ?? [];

  const eyebrow = "text-[13px] font-bold tracking-[1.5px] uppercase text-ahk-cyan";
  const h2 = "font-serif font-bold text-[28px] md:text-[38px] text-ahk-blue tracking-[-0.4px]";

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F7FB] to-white border-b border-[#EAEFF5]">
        <div className="max-w-shell mx-auto px-5 md:px-8 pt-10 md:pt-20 pb-14 md:pb-[90px] grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
          <div className="animate-floatUp">
            <div className="inline-flex items-center gap-[9px] py-[7px] px-[14px] bg-white border border-[#D7E0EC] rounded-full mb-[26px]">
              <span className="w-2 h-2 rounded-full bg-ahk-green inline-block" />
              <span className="text-[12.5px] font-bold tracking-[.3px] text-ahk-blue uppercase">
                {t.hero.badge}
              </span>
            </div>
            <h1 className="font-serif font-bold text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] lg:leading-[1.08] text-ahk-blue tracking-[-0.5px] mb-[22px] text-balance">
              {t.hero.title}
            </h1>
            <p className="text-[16.5px] md:text-[19px] leading-[1.55] text-[#4C5763] max-w-[520px] mb-[34px]">
              {t.hero.sub}
            </p>
            <div className="flex gap-[14px] flex-wrap">
              <Link
                href="/empresa"
                className="w-full sm:w-auto justify-center h-[54px] px-7 bg-ahk-blue text-white rounded-[7px] font-sans font-bold text-[16px] inline-flex items-center gap-[10px] no-underline"
              >
                {t.hero.ctaCompany} <span className="text-[18px]">→</span>
              </Link>
              <Link
                href="/candidato"
                className="w-full sm:w-auto justify-center h-[54px] px-7 bg-white border-[1.5px] border-[#C3CEDC] text-ahk-blue rounded-[7px] font-sans font-bold text-[16px] inline-flex items-center gap-[10px] no-underline"
              >
                {t.hero.ctaTalent} <span className="text-[18px]">→</span>
              </Link>
            </div>
            <div className="flex gap-5 sm:gap-[34px] mt-8 md:mt-11 flex-wrap">
              <Stat value="1.200+" label={t.hero.stats.members} />
              <div className="w-px bg-[#E2E8F0]" />
              <Stat value="1916" label={t.hero.stats.since} />
              <div className="w-px bg-[#E2E8F0]" />
              <Stat value="DACH" label={t.hero.stats.culture} />
            </div>
          </div>

          {/* Bridge motif */}
          <div className="relative animate-floatUp-slow">
            <div className="bg-white border border-[#E4EAF2] rounded-[18px] p-5 sm:p-[34px] shadow-card">
              <div className="flex items-center justify-between mb-[10px]">
                <span className="text-[12px] font-bold tracking-[.5px] uppercase text-[#8A93A0]">
                  {t.hero.cardLabel}
                </span>
                <span className="inline-flex items-center gap-[6px] text-[11.5px] font-bold text-ahk-green bg-brand-green-soft py-1 px-[9px] rounded-full">
                  <span className="w-[6px] h-[6px] rounded-full bg-ahk-green animate-pulseDot" />
                  {t.hero.cardLive}
                </span>
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 pt-[22px] px-[6px] pb-[26px]">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-[10px] rounded-[16px] bg-brand-green-soft border border-[#C7E9DB] flex items-center justify-center font-serif font-bold text-[22px] text-[#1F8F6B]">
                    BR
                  </div>
                  <div className="text-[12.5px] font-bold text-[#3C4652]">{t.hero.talent}</div>
                </div>
                <div className="relative w-[120px] h-[70px]">
                  <svg viewBox="0 0 120 70" className="w-full h-full overflow-visible">
                    <path
                      d="M6 35 C 45 35, 75 35, 114 35"
                      fill="none"
                      stroke="#00A6E3"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="1"
                      pathLength={1}
                      className="animate-drawLine"
                    />
                    <circle cx="60" cy="35" r="15" fill="#003366" />
                    <text x="60" y="39" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Source Sans 3">
                      IA
                    </text>
                  </svg>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-[10px] rounded-[16px] bg-brand-blue-soft border border-[#CBD9EC] flex items-center justify-center font-serif font-bold text-[22px] text-ahk-blue">
                    DE
                  </div>
                  <div className="text-[12.5px] font-bold text-[#3C4652]">{t.hero.company}</div>
                </div>
              </div>
              <div className="border-t border-dashed border-[#E1E7EF] pt-[18px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-bold text-ahk-blue">{t.hero.matchName}</span>
                  <span className="font-serif font-bold text-[20px] text-ahk-green">
                    94<span className="text-[12px] text-[#9AA6B2]">/100</span>
                  </span>
                </div>
                <div className="h-2 bg-[#EDF1F6] rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-ahk-green rounded-full animate-growBar" />
                </div>
                <p className="text-[12.5px] text-brand-muted-2 mt-[10px]">{t.hero.matchNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <div className="bg-ahk-blue">
        <div className="max-w-shell mx-auto px-5 md:px-8 py-4 flex items-center justify-center gap-[14px] flex-wrap text-center">
          <span className="text-[14px] text-ahk-light-blue font-semibold">🔒 {t.trustStrip}</span>
        </div>
      </div>

      {/* ============ COMO FUNCIONA ============ */}
      <section id="como-funciona" className="max-w-shell mx-auto px-5 md:px-8 pt-14 md:pt-24 pb-10 scroll-mt-24">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <div className={`${eyebrow} mb-[14px]`}>{t.how.eyebrow}</div>
          <h2 className={`${h2} mb-[14px]`}>{t.how.title}</h2>
          <p className="text-[17px] text-brand-muted">{t.how.sub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.how.steps.map((s) => (
            <div key={s.num} className="bg-white border border-brand-border rounded-[14px] p-8">
              <div className="w-[46px] h-[46px] rounded-[12px] bg-ahk-blue text-white font-serif font-bold text-[20px] flex items-center justify-center mb-5">
                {s.num}
              </div>
              <h3 className="font-sans font-bold text-[19px] text-ahk-blue mb-[9px]">{s.title}</h3>
              <p className="text-[15px] text-brand-muted leading-[1.55]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ VAGAS ============ */}
      <section id="vagas" className="max-w-shell mx-auto px-5 md:px-8 py-12 md:py-[72px] scroll-mt-24">
        <div className="flex items-end justify-between gap-6 mb-9 flex-wrap">
          <div>
            <div className={`${eyebrow} mb-3`}>{t.jobs.eyebrow}</div>
            <h2 className={h2}>{t.jobs.title}</h2>
          </div>
          <span className="text-[14.5px] text-brand-muted-2 font-semibold">{t.jobs.count}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/vagas/${job.id}`}
              className="job-card no-underline bg-white border border-brand-border rounded-[14px] pt-[26px] px-[26px] pb-[22px] cursor-pointer flex flex-col"
            >
              <div className="flex items-start justify-between gap-[14px] mb-[14px]">
                <div>
                  <h3 className="font-sans font-bold text-[18.5px] text-ahk-blue mb-[5px]">
                    {job.title}
                  </h3>
                  <div className="text-[14px] text-[#6B7583] font-semibold">
                    {job.companyName} · {job.area}
                  </div>
                </div>
                <span className="flex-shrink-0 text-[11.5px] font-bold py-[5px] px-[11px] rounded-full bg-brand-blue-soft text-ahk-blue whitespace-nowrap">
                  {job.model}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap mb-[18px]">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12.5px] font-semibold text-[#4C5763] bg-[#F3F6FA] border border-[#E5EBF2] py-1 px-[10px] rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#EEF2F6]">
                {job.match ? (
                  <div className="flex items-center gap-[9px]">
                    <span className="text-[12px] text-[#8A93A0] font-semibold">{t.jobs.fit}</span>
                    <span className="inline-flex items-center gap-[6px] font-serif font-bold text-[16px] text-ahk-green">
                      <span className="w-2 h-2 rounded-full bg-ahk-green" />
                      {job.match}
                    </span>
                  </div>
                ) : (
                  <span />
                )}
                <span className="text-[14px] font-bold text-ahk-blue inline-flex items-center gap-[6px]">
                  {t.jobs.details} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ DIFERENCIAIS ============ */}
      <section className="bg-[#F4F7FB] border-y border-[#EAEFF5]">
        <div className="max-w-shell mx-auto px-5 md:px-8 py-14 md:py-[92px]">
          <div className="max-w-[620px] mb-9 md:mb-[52px]">
            <div className={`${eyebrow} mb-[14px]`}>{t.diff.eyebrow}</div>
            <h2 className={`${h2} mb-[14px]`}>{t.diff.title}</h2>
            <p className="text-[17px] text-brand-muted">{t.diff.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
            {t.diff.items.map((d) => (
              <div key={d.title} className="bg-white border border-brand-border rounded-[14px] pt-7 px-6 pb-7">
                <div
                  className="w-11 h-11 rounded-[11px] flex items-center justify-center mb-[18px]"
                  style={{ background: d.bg }}
                >
                  <span className="text-[20px]">{d.icon}</span>
                </div>
                <h3 className="font-sans font-bold text-[17px] text-ahk-blue mb-2">{d.title}</h3>
                <p className="text-[14.5px] text-brand-muted leading-[1.55]">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ IA ============ */}
      <section id="ia" className="max-w-shell mx-auto px-5 md:px-8 py-14 md:py-24 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className={`${eyebrow} mb-[14px]`}>{t.ai.eyebrow}</div>
            <h2 className={`${h2} mb-4`}>{t.ai.title}</h2>
            <p className="text-[17px] text-brand-muted mb-7">{t.ai.sub}</p>
            <div className="flex flex-col gap-[14px] mb-[30px]">
              {t.ai.functions.map((f) => (
                <div key={f.h} className="flex items-start gap-[13px]">
                  <span className="flex-shrink-0 w-6 h-6 rounded-[7px] bg-brand-blue-soft text-ahk-blue flex items-center justify-center text-[13px] font-extrabold mt-px">
                    ✓
                  </span>
                  <span className="text-[15.5px] text-[#3C4652]">
                    <strong className="text-ahk-blue">{f.h}</strong> — {f.d}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-[10px] flex-wrap">
              {t.ai.principles.map((p) => (
                <span
                  key={p}
                  className="text-[12.5px] font-bold text-ahk-blue bg-brand-blue-soft border border-[#D3E0F0] py-[7px] px-[13px] rounded-full"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* explainable score panel */}
          <div className="bg-ahk-blue rounded-[18px] p-6 md:p-9 text-white shadow-card-strong">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[12px] tracking-[.5px] uppercase text-[#8CA6C6] font-bold">
                  {t.ai.panelLabel}
                </div>
                <div className="font-serif font-bold text-[20px] mt-1">{t.ai.panelName}</div>
              </div>
              <div className="text-right">
                <div className="font-serif font-bold text-[44px] leading-none text-brand-green-bright">
                  94
                </div>
                <div className="text-[12px] text-[#8CA6C6] font-semibold">/ 100 · {t.ai.score}</div>
              </div>
            </div>
            <div className="flex flex-col gap-[15px]">
              {t.ai.scoreBreakdown.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-[13.5px] mb-[6px]">
                    <span className="text-[#D6E2F0] font-semibold">{s.label}</span>
                    <span className="text-white font-bold">{s.val}</span>
                  </div>
                  <div className="h-[7px] bg-white/[0.14] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-brand-green-bright" style={{ width: s.pct }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-[26px] py-4 px-[18px] bg-white/[0.07] border border-white/[0.13] rounded-[11px] text-[14px] text-[#DCE7F3] leading-[1.55]">
              <strong className="text-white">{t.ai.summaryLabel}:</strong> {t.ai.summary}
            </div>
          </div>
        </div>
      </section>

      {/* ============ GOVERNANCA ============ */}
      <section id="governanca" className="bg-gradient-to-b from-[#F4F7FB] to-white border-t border-[#EAEFF5] scroll-mt-24">
        <div className="max-w-shell mx-auto px-5 md:px-8 py-14 md:py-[92px]">
          <div className="text-center max-w-[660px] mx-auto mb-9 md:mb-[52px]">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[1px] uppercase text-ahk-green bg-brand-green-soft border border-[#C7E9DB] py-[7px] px-[15px] rounded-full mb-[18px]">
              🔐 {t.gov.badge}
            </div>
            <h2 className={`${h2} mb-[14px]`}>{t.gov.title}</h2>
            <p className="text-[17px] text-brand-muted">{t.gov.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {t.gov.principles.map((l) => (
              <div
                key={l.title}
                className="bg-white border border-brand-border rounded-[13px] p-6 flex items-start gap-[14px]"
              >
                <span className="flex-shrink-0 w-[34px] h-[34px] rounded-[9px] bg-brand-green-soft text-[#1F8F6B] flex items-center justify-center text-[15px] font-extrabold">
                  ✓
                </span>
                <div>
                  <h3 className="font-sans font-bold text-[16px] text-ahk-blue mb-[5px]">{l.title}</h3>
                  <p className="text-[14px] text-brand-muted leading-[1.5]">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-ahk-blue">
        <div className="max-w-shell mx-auto px-5 md:px-8 py-14 md:py-[82px] text-center">
          <h2 className="font-serif font-bold text-[28px] md:text-[40px] text-white tracking-[-0.4px] mb-4 text-balance">
            {t.final.title}
          </h2>
          <p className="text-[16px] md:text-[18px] text-ahk-light-blue max-w-[560px] mx-auto mb-[34px]">
            {t.final.sub}
          </p>
          <div className="flex gap-[14px] justify-center flex-wrap">
            <Link
              href="/empresa"
              className="w-full sm:w-auto justify-center h-[54px] px-[30px] bg-white text-ahk-blue rounded-[7px] font-sans font-bold text-[16px] inline-flex items-center no-underline"
            >
              {t.hero.ctaCompany} →
            </Link>
            <Link
              href="/candidato"
              className="w-full sm:w-auto justify-center h-[54px] px-[30px] bg-transparent border-[1.5px] border-[#6B86A8] text-white rounded-[7px] font-sans font-bold text-[16px] inline-flex items-center no-underline"
            >
              {t.hero.ctaTalent} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif font-bold text-[30px] text-ahk-blue">{value}</div>
      <div className="text-[13.5px] text-brand-muted-2 font-semibold">{label}</div>
    </div>
  );
}
