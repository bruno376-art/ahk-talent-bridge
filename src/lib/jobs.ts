import { prisma } from "@/lib/db";
import type { Lang } from "@/i18n/dictionary";
import { localizeJob, type JobRow, type JobView } from "@/lib/job-localize";

export type { JobView } from "@/lib/job-localize";
export { localizeJob } from "@/lib/job-localize";

/** Vagas abertas, ordenadas por mais recentes. */
export async function getOpenJobs(lang: Lang): Promise<JobView[]> {
  const jobs = await prisma.job.findMany({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
  });
  return jobs.map((j) => localizeJob(j as JobRow, lang));
}

export async function getJobById(id: string, lang: Lang): Promise<JobView | null> {
  const job = await prisma.job.findUnique({ where: { id } });
  return job ? localizeJob(job as JobRow, lang) : null;
}

/**
 * Vagas abertas nos dois idiomas — permite o toggle de idioma no cliente
 * sem refetch (o componente escolhe a versão pela língua atual).
 */
export async function getOpenJobsAllLangs(): Promise<Record<Lang, JobView[]>> {
  const jobs = await prisma.job.findMany({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
  });
  return {
    pt: jobs.map((j) => localizeJob(j as JobRow, "pt")),
    en: jobs.map((j) => localizeJob(j as JobRow, "en")),
    de: jobs.map((j) => localizeJob(j as JobRow, "de")),
  };
}

export async function getJobAllLangs(id: string): Promise<Record<Lang, JobView> | null> {
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return null;
  return {
    pt: localizeJob(job as JobRow, "pt"),
    en: localizeJob(job as JobRow, "en"),
    de: localizeJob(job as JobRow, "de"),
  };
}
