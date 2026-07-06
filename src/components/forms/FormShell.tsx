"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/LanguageProvider";

export default function FormShell({
  eyebrow,
  title,
  sub,
  benefits,
  trust,
  trustIcon,
  benefitIconClass,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  benefits: { h: string; d: string }[];
  trust: string;
  trustIcon: string;
  benefitIconClass: string;
  children: React.ReactNode;
}) {
  const { t } = useI18n();

  return (
    <main>
      <div className="bg-ahk-blue text-white">
        <div className="max-w-shell-narrow mx-auto px-8 pt-[38px] pb-[46px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-[#9FB6D2] cursor-pointer mb-[22px] no-underline"
          >
            ← {t.vaga.back}
          </Link>
          <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[.5px] uppercase text-brand-green-bright mb-3">
            {eyebrow}
          </div>
          <h1 className="font-serif font-bold text-[38px] tracking-[-0.4px] mb-[10px]">{title}</h1>
          <p className="text-[17px] text-ahk-light-blue max-w-[560px]">{sub}</p>
        </div>
      </div>

      <div className="max-w-shell-narrow mx-auto px-8 pt-11 pb-[84px] grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10 items-start">
        <aside className="flex flex-col gap-5">
          {benefits.map((b) => (
            <div key={b.h} className="flex gap-[13px] items-start">
              <span
                className={`flex-shrink-0 w-[30px] h-[30px] rounded-lg flex items-center justify-center text-[14px] font-extrabold ${benefitIconClass}`}
              >
                ✓
              </span>
              <div>
                <div className="font-bold text-[15px] text-ahk-blue mb-[3px]">{b.h}</div>
                <div className="text-[14px] text-brand-muted leading-[1.5]">{b.d}</div>
              </div>
            </div>
          ))}
          <div className="bg-[#F4F7FB] border border-[#E4EAF2] rounded-[12px] p-[18px] text-[13.5px] text-brand-muted leading-[1.55] mt-[6px]">
            {trustIcon} {trust}
          </div>
        </aside>

        <div className="bg-white border border-brand-border rounded-[16px] p-9 shadow-form">
          {children}
        </div>
      </div>
    </main>
  );
}

export function SuccessPanel({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  const { t } = useI18n();
  return (
    <div className="text-center py-[26px] px-2">
      <div className="w-16 h-16 rounded-full bg-brand-green-soft text-[#1F8F6B] flex items-center justify-center text-[30px] mx-auto mb-5">
        ✓
      </div>
      <h2 className="font-serif font-bold text-[26px] text-ahk-blue mb-[10px]">{title}</h2>
      <p className="text-[15.5px] text-brand-muted max-w-[380px] mx-auto mb-6 leading-[1.6]">
        {message}
      </p>
      <Link
        href="/"
        className="inline-flex items-center h-12 px-6 bg-white border-[1.5px] border-[#C3CEDC] text-ahk-blue rounded-lg font-bold text-[15px] no-underline"
      >
        {t.vaga.back}
      </Link>
    </div>
  );
}
