"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/LanguageProvider";
import type { JobView } from "@/lib/jobs";
import type { Lang } from "@/i18n/dictionary";

export default function JobDetail({ jobByLang }: { jobByLang: Record<Lang, JobView> }) {
  const { t, lang } = useI18n();
  const job = jobByLang[lang];

  return (
    <main className="max-w-shell-detail mx-auto px-8 pt-11 pb-20">
      <Link
        href="/#vagas"
        className="inline-flex items-center gap-2 text-[14.5px] font-bold text-ahk-blue cursor-pointer mb-7 no-underline"
      >
        ← {t.vaga.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
        <div>
          <div className="bg-white border border-brand-border rounded-[16px] p-9">
            <div className="flex gap-3 flex-wrap mb-4">
              <span className="text-[12px] font-bold py-[5px] px-[11px] rounded-full bg-brand-blue-soft text-ahk-blue">
                {job.model}
              </span>
              <span className="text-[12px] font-bold py-[5px] px-[11px] rounded-full bg-[#F3F6FA] text-[#4C5763] border border-[#E5EBF2]">
                {job.area}
              </span>
            </div>
            <h1 className="font-serif font-bold text-[34px] text-ahk-blue tracking-[-0.4px] mb-2">
              {job.title}
            </h1>
            <div className="text-[16px] text-[#6B7583] font-semibold mb-[26px]">
              {job.companyName} · {job.location}
            </div>
            {job.summary && (
              <p className="text-[16px] text-[#3C4652] leading-[1.65] mb-7">{job.summary}</p>
            )}

            {job.requirements.length > 0 && (
              <>
                <h3 className="font-sans font-bold text-[16px] text-ahk-blue mb-[14px] uppercase tracking-[.5px]">
                  {t.vaga.profile}
                </h3>
                <div className="flex flex-col gap-[11px] mb-2">
                  {job.requirements.map((r) => (
                    <div key={r} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-[22px] h-[22px] rounded-md bg-brand-blue-soft text-ahk-blue flex items-center justify-center text-[12px] font-extrabold mt-px">
                        ✓
                      </span>
                      <span className="text-[15.5px] text-[#3C4652]">{r}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* match sidebar */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-[18px]">
          {job.match && (
            <div className="bg-ahk-blue rounded-[16px] p-7 text-white">
              <div className="text-[12px] tracking-[.5px] uppercase text-[#8CA6C6] font-bold mb-[6px]">
                {t.vaga.yourFit}
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif font-bold text-[48px] text-brand-green-bright leading-none">
                  {job.matchNum}
                </span>
                <span className="text-[15px] text-[#8CA6C6] font-semibold">/ 100</span>
              </div>
              <div className="h-[9px] bg-white/[0.14] rounded-full overflow-hidden mb-[18px]">
                <div
                  className="h-full rounded-full bg-brand-green-bright"
                  style={{ width: job.match }}
                />
              </div>
              {job.matchNote && (
                <p className="text-[13.5px] text-[#DCE7F3] leading-[1.55]">{job.matchNote}</p>
              )}
            </div>
          )}
          <div className="bg-white border border-brand-border rounded-[16px] p-6">
            <Link
              href="/candidato"
              className="w-full h-[50px] bg-ahk-blue text-white rounded-[7px] font-sans font-bold text-[15.5px] cursor-pointer mb-[10px] flex items-center justify-center no-underline"
            >
              {t.vaga.apply}
            </Link>
            <p className="text-[12.5px] text-[#8A93A0] text-center leading-[1.5]">
              {t.vaga.applyNote}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
