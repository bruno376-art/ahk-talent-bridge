import type { Lang } from "@/i18n/dictionary";

/** Forma de vaga consumida pela UI pública (já localizada). */
export interface JobView {
  id: string;
  title: string;
  companyName: string;
  area: string;
  model: string;
  location: string;
  summary: string;
  tags: string[];
  requirements: string[];
  /** ex.: "94%" — apenas em dados de demonstração; ausente em vagas reais */
  match?: string;
  matchNum?: string;
  matchNote?: string;
}

/** Conjunto de campos que podem ter tradução por idioma. */
interface JobTranslatable {
  title?: string;
  companyName?: string;
  area?: string;
  model?: string;
  location?: string;
  summary?: string;
  tags?: string[];
  requirements?: string[];
  matchNote?: string;
}

export type JobRow = {
  id: string;
  companyName: string;
  title: string;
  area: string;
  model: string;
  location: string;
  summary: string;
  tags: string;
  requirements: string;
  translations: string | null;
  demoMatch: string | null;
  matchNote: string | null;
};

function parseJSON<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Aplica traduções (se houver) sobre os campos-base da vaga. Função pura. */
export function localizeJob(job: JobRow, lang: Lang): JobView {
  const translations = parseJSON<Partial<Record<Lang, JobTranslatable>>>(job.translations, {});
  const tr = translations[lang] ?? {};

  const match = job.demoMatch ?? undefined;
  return {
    id: job.id,
    title: tr.title ?? job.title,
    companyName: tr.companyName ?? job.companyName,
    area: tr.area ?? job.area,
    model: tr.model ?? job.model,
    location: tr.location ?? job.location,
    summary: tr.summary ?? job.summary,
    tags: tr.tags ?? parseJSON<string[]>(job.tags, []),
    requirements: tr.requirements ?? parseJSON<string[]>(job.requirements, []),
    match,
    matchNum: match ? match.replace("%", "") : undefined,
    matchNote: tr.matchNote ?? job.matchNote ?? undefined,
  };
}
