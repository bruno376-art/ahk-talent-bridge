"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/dictionary";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center h-10 px-3 rounded-[5px] ${
          dark ? "bg-white" : "bg-ahk-blue"
        }`}
      >
        <span
          className={`font-sans font-black text-[20px] tracking-[1px] ${
            dark ? "text-ahk-blue" : "text-white"
          }`}
        >
          AHK
        </span>
      </div>
      <div className="flex flex-col leading-[1.05]">
        <span className="font-serif font-bold text-[17px] text-ahk-blue">Talent Bridge</span>
        <span className="text-[10.5px] tracking-[.4px] text-[#8A93A0] uppercase font-semibold">
          Câmara Brasil-Alemanha
        </span>
      </div>
    </div>
  );
}

function LangToggle() {
  const { lang, setLang } = useI18n();
  const btn = (active: boolean) =>
    `h-full px-[13px] border-0 font-sans font-bold text-[12.5px] cursor-pointer ${
      active ? "bg-ahk-blue text-white" : "bg-transparent text-brand-muted"
    }`;
  return (
    <div className="flex items-center border border-[#D7DEE7] rounded-full overflow-hidden h-8">
      {(["pt", "en"] as Lang[]).map((l) => (
        <button key={l} onClick={() => setLang(l)} className={btn(lang === l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useI18n();

  const navLink =
    "text-[14.5px] font-semibold text-[#3C4652] no-underline cursor-pointer hover:text-ahk-blue";

  return (
    <header className="sticky top-0 z-50 bg-white/[0.92] backdrop-blur-[10px] backdrop-saturate-[180%] border-b border-brand-border">
      <div className="max-w-shell mx-auto px-8 h-[74px] flex items-center gap-[28px]">
        <Link href="/" className="flex-shrink-0 no-underline">
          <Logo />
        </Link>

        <nav className="hidden md:flex gap-[26px] ml-[18px]">
          <a href="/#como-funciona" className={navLink}>
            {t.nav.how}
          </a>
          <a href="/#vagas" className={navLink}>
            {t.nav.jobs}
          </a>
          <a href="/#ia" className={navLink}>
            {t.nav.ai}
          </a>
          <a href="/#governanca" className={navLink}>
            {t.nav.gov}
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <LangToggle />
          <Link
            href="/candidato"
            className="hidden sm:inline-flex items-center h-10 px-[18px] bg-transparent border-[1.5px] border-ahk-blue text-ahk-blue rounded-md font-sans font-bold text-[14px] cursor-pointer whitespace-nowrap no-underline"
          >
            {t.cta.talent}
          </Link>
          <Link
            href="/empresa"
            className="inline-flex items-center h-10 px-[18px] bg-ahk-blue border-[1.5px] border-ahk-blue text-white rounded-md font-sans font-bold text-[14px] cursor-pointer whitespace-nowrap no-underline"
          >
            {t.cta.company}
          </Link>
        </div>
      </div>
    </header>
  );
}
