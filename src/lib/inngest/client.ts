import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "ahk-talent-bridge" });

/** Nomes de eventos (contrato entre server actions e funções). */
export const EVENTS = {
  jobCreated: "job/created",
  talentCreated: "talent/created",
  matchingRun: "matching/run",
  shortlistGenerate: "shortlist/generate",
} as const;
