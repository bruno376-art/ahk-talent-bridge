"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useI18n();
  const link = "text-[#B9C7D9] no-underline cursor-pointer hover:text-white";

  return (
    <footer className="bg-brand-blue-deep text-[#B9C7D9] border-t-4 border-ahk-cyan">
      <div className="max-w-shell mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-11">
          <div>
            <div className="flex items-center gap-[11px] mb-4">
              <div className="flex items-center justify-center h-9 px-[11px] bg-white rounded-[5px]">
                <span className="font-sans font-black text-[18px] tracking-[1px] text-ahk-blue">
                  AHK
                </span>
              </div>
              <span className="font-serif font-bold text-[17px] text-white">Talent Bridge</span>
            </div>
            <p className="text-[14px] leading-[1.6] max-w-[320px] text-[#93A6BD]">{t.footer.about}</p>
          </div>

          <div>
            <div className="text-[13px] font-bold text-white uppercase tracking-[.5px] mb-[14px]">
              {t.footer.col1}
            </div>
            <div className="flex flex-col gap-[9px] text-[14px]">
              <Link href="/empresa" className={link}>
                {t.cta.company}
              </Link>
              <a href="/#vagas" className={link}>
                {t.nav.jobs}
              </a>
              <a href="/#ia" className={link}>
                {t.footer.pricing}
              </a>
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold text-white uppercase tracking-[.5px] mb-[14px]">
              {t.footer.col2}
            </div>
            <div className="flex flex-col gap-[9px] text-[14px]">
              <Link href="/candidato" className={link}>
                {t.cta.talent}
              </Link>
              <a href="/#como-funciona" className={link}>
                {t.nav.how}
              </a>
              <a href="/#governanca" className={link}>
                {t.nav.gov}
              </a>
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold text-white uppercase tracking-[.5px] mb-[14px]">
              {t.footer.col3}
            </div>
            <div className="flex flex-col gap-[9px] text-[14px]">
              <Link href="/privacidade" className={link}>
                {t.footer.privacy}
              </Link>
              <Link href="/termos" className={link}>
                {t.footer.terms}
              </Link>
              <Link href="/uso-de-ia" className={link}>
                {t.footer.ai}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#123C63] pt-[22px] flex flex-wrap justify-between gap-4 text-[12.5px] text-[#7C90A8]">
          <span>{t.footer.legal}</span>
          <span>{t.footer.compliance}</span>
        </div>
      </div>
    </footer>
  );
}
