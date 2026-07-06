/**
 * Autenticação mínima do backoffice: cookie assinado com HMAC-SHA256.
 * Edge-safe (usa Web Crypto), utilizável no middleware e em server actions.
 * Para produção séria, promover a NextAuth (mesma stack do EU-Mercosul).
 */

export const ADMIN_COOKIE = "ahk_admin";
const PAYLOAD = "ahk-admin-session-v1";

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(PAYLOAD));
  return toHex(sig);
}

export async function makeAdminToken(): Promise<string> {
  return hmac(process.env.ADMIN_SESSION_SECRET ?? "dev-secret");
}

export async function verifyAdminToken(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const expected = await hmac(process.env.ADMIN_SESSION_SECRET ?? "dev-secret");
  // Comparação de tamanho fixo suficiente aqui (hex de mesmo tamanho).
  return value === expected;
}
