"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { DEFAULT_LANG, getDict, type Dictionary, type Lang } from "./dictionary";

interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLang = DEFAULT_LANG,
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    // Persistência simples via cookie (1 ano) para o SSR inicial coincidir.
    if (typeof document !== "undefined") {
      document.cookie = `ahk_lang=${next}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.lang = next;
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: getDict(lang), setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n deve ser usado dentro de <LanguageProvider>");
  return ctx;
}
