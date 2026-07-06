import { prisma } from "@/lib/db";

/** Registra uma entrada na trilha de auditoria (LGPD/GDPR). */
export async function audit(entry: {
  entityType: "job" | "talent" | "consent" | "match" | "company";
  entityId?: string;
  action: "created" | "matched" | "shortlisted" | "deleted" | "exported" | "accessed";
  actor?: "system" | "admin" | "applicant" | "company";
  detail?: unknown;
}): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        entityType: entry.entityType,
        entityId: entry.entityId,
        action: entry.action,
        actor: entry.actor ?? "system",
        detail: entry.detail ? JSON.stringify(entry.detail) : null,
      },
    });
  } catch (e) {
    // Auditoria nunca deve derrubar o fluxo principal.
    console.error("[audit] falha ao registrar", e);
  }
}
