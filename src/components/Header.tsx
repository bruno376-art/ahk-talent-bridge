"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { LANGS } from "@/i18n/dictionary";

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
        <span className="hidden min-[480px]:block text-[10.5px] tracking-[.4px] text-[#8A93A0] uppercase font-semibold">
          Câmara Brasil-Alemanha
        </span>
      </div>
    </div>
  );
}

function LangToggle() {
  const { lang, setLang } = useI18n();
  const btn = (active: boolean) =>
    `h-full px-2 sm:px-[10px] border-0 font-sans font-bold text-[12px] sm:text-[12.5px] cursor-pointer ${
      active ? "bg-ahk-blue text-white" : "bg-transparent text-brand-muted"
    }`;
  return (
    <div className="flex items-center border border-[#D7DEE7] rounded-full overflow-hidden h-8 flex-shrink-0">
      {LANGS.map((l) => (
        <button key={l} onClick={() => setLang(l)} className={btn(lang === l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const navLink =
    "text-[14.5px] font-semibold text-[#3C4652] no-underline cursor-pointer hover:text-ahk-blue";

  const navItems = [
    { href: "/#como-funciona", label: t.nav.how },
    { href: "/#vagas", label: t.nav.jobs },
    { href: "/#ia", label: t.nav.ai },
    { href: "/#governanca", label: t.nav.gov },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/[0.92] backdrop-blur-[10px] backdrop-saturate-[180%] border-b border-brand-border">
      <div className="max-w-shell mx-auto px-3 sm:px-4 md:px-8 h-[74px] flex items-center gap-2 md:gap-[28px]">
        <Link href="/" className="flex-shrink-0 no-underline" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden lg:flex gap-[26px] ml-[18px]">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <LangToggle />

          {/* CTAs desktop */}
          <Link
            href="/candidato"
            className="hidden lg:inline-flex items-center h-10 px-[18px] bg-transparent border-[1.5px] border-ahk-blue text-ahk-blue rounded-md font-sans font-bold text-[14px] cursor-pointer whitespace-nowrap no-underline"
          >
            {t.cta.talent}
          </Link>
          <Link
            href="/empresa"
            className="hidden lg:inline-flex items-center h-10 px-[18px] bg-ahk-blue border-[1.5px] border-ahk-blue text-white rounded-md font-sans font-bold text-[14px] cursor-pointer whitespace-nowrap no-underline"
          >
            {t.cta.company}
          </Link>

          {/* Botão do menu mobile */}
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-md border border-[#D7DEE7] bg-white cursor-pointer flex-shrink-0"
          >
            <span className={`block w-[18px] h-[2px] bg-ahk-blue transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-[18px] h-[2px] bg-ahk-blue transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-[18px] h-[2px] bg-ahk-blue transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Painel do menu mobile */}
      {open && (
        <div className="lg:hidden border-t border-brand-border bg-white shadow-[0_18px_30px_-20px_rgba(0,51,102,0.25)]">
          <nav className="max-w-shell mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 rounded-lg text-[15.5px] font-semibold text-[#3C4652] no-underline hover:bg-[#F4F7FB]"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2.5 pt-3 mt-2 border-t border-brand-border">
              <Link
                href="/empresa"
                onClick={() => setOpen(false)}
                className="h-12 bg-ahk-blue text-white rounded-md font-sans font-bold text-[15px] no-underline flex items-center justify-center"
              >
                {t.cta.company}
              </Link>
              <Link
                href="/candidato"
                onClick={() => setOpen(false)}
                className="h-12 bg-white border-[1.5px] border-ahk-blue text-ahk-blue rounded-md font-sans font-bold text-[15px] no-underline flex items-center justify-center"
              >
                {t.cta.talent}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
