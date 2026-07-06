"use client";

import { useI18n } from "@/i18n/LanguageProvider";

type Section = "privacy" | "terms" | "aiUse";

export default function LegalPage({ section }: { section: Section }) {
  const { t } = useI18n();
  const legal = t.legal;

  const title =
    section === "privacy" ? legal.privacyTitle : section === "terms" ? legal.termsTitle : legal.aiTitle;
  const blocks = section === "privacy" ? legal.privacy : section === "terms" ? legal.terms : legal.aiUse;

  return (
    <main className="max-w-shell-detail mx-auto px-8 pt-14 pb-24">
      <h1 className="font-serif font-bold text-[40px] text-ahk-blue tracking-[-0.4px] mb-3">
        {title}
      </h1>
      <p className="text-[13.5px] text-brand-muted-2 font-semibold mb-10">
        {legal.updated}: 2026-07
      </p>

      <div className="flex flex-col gap-8">
        {blocks.map((b) => (
          <section key={b.h}>
            <h2 className="font-sans font-bold text-[20px] text-ahk-blue mb-3">{b.h}</h2>
            <div className="flex flex-col gap-3">
              {b.p.map((para, i) => (
                <p key={i} className="text-[16px] text-[#3C4652] leading-[1.65]">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
