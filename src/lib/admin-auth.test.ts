import { describe, it, expect, beforeAll } from "vitest";
import { makeAdminToken, verifyAdminToken } from "./admin-auth";

beforeAll(() => {
  process.env.ADMIN_SESSION_SECRET = "segredo-de-teste-0123456789";
});

describe("admin-auth", () => {
  it("token gerado é aceito na verificação (round-trip)", async () => {
    const token = await makeAdminToken();
    expect(token).toMatch(/^[0-9a-f]{64}$/); // HMAC-SHA256 em hex
    expect(await verifyAdminToken(token)).toBe(true);
  });

  it("rejeita token inválido e vazio", async () => {
    expect(await verifyAdminToken("deadbeef")).toBe(false);
    expect(await verifyAdminToken("")).toBe(false);
    expect(await verifyAdminToken(undefined)).toBe(false);
    expect(await verifyAdminToken(null)).toBe(false);
  });

  it("token muda quando o segredo muda", async () => {
    const t1 = await makeAdminToken();
    process.env.ADMIN_SESSION_SECRET = "outro-segredo";
    const t2 = await makeAdminToken();
    expect(t1).not.toBe(t2);
    // o token antigo não vale mais com o novo segredo
    expect(await verifyAdminToken(t1)).toBe(false);
  });
});
