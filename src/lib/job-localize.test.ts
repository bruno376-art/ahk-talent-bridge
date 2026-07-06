import { describe, it, expect } from "vitest";
import { localizeJob, type JobRow } from "./job-localize";

function baseRow(overrides: Partial<JobRow> = {}): JobRow {
  return {
    id: "j1",
    companyName: "Empresa PT",
    title: "Título PT",
    area: "Engenharia",
    model: "Híbrido · SP",
    location: "São Paulo, SP",
    summary: "Resumo PT",
    tags: JSON.stringify(["Alemão C1", "SAP"]),
    requirements: JSON.stringify(["Req PT 1", "Req PT 2"]),
    translations: null,
    demoMatch: null,
    matchNote: null,
    ...overrides,
  };
}

describe("localizeJob", () => {
  it("usa a tradução do idioma pedido quando existe", () => {
    const row = baseRow({
      translations: JSON.stringify({
        pt: { title: "Título PT", tags: ["Alemão C1"] },
        en: { title: "English Title", tags: ["German C1"] },
      }),
    });
    const en = localizeJob(row, "en");
    expect(en.title).toBe("English Title");
    expect(en.tags).toEqual(["German C1"]);
  });

  it("faz fallback para os campos-base quando não há tradução", () => {
    const en = localizeJob(baseRow(), "en");
    expect(en.title).toBe("Título PT");
    expect(en.tags).toEqual(["Alemão C1", "SAP"]);
    expect(en.requirements).toEqual(["Req PT 1", "Req PT 2"]);
  });

  it("deriva matchNum a partir de demoMatch e omite quando ausente", () => {
    expect(localizeJob(baseRow({ demoMatch: "94%" }), "pt").matchNum).toBe("94");
    expect(localizeJob(baseRow({ demoMatch: "94%" }), "pt").match).toBe("94%");

    const semMatch = localizeJob(baseRow(), "pt");
    expect(semMatch.match).toBeUndefined();
    expect(semMatch.matchNum).toBeUndefined();
  });

  it("é resiliente a JSON inválido em tags/translations", () => {
    const row = baseRow({ tags: "{não é json", translations: "quebrado" });
    const v = localizeJob(row, "pt");
    expect(v.tags).toEqual([]);
    expect(v.title).toBe("Título PT");
  });
});
