"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, makeAdminToken } from "@/lib/admin-auth";
import { inngest, EVENTS } from "@/lib/inngest/client";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";

export async function login(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  if (password && password === process.env.ADMIN_PASSWORD) {
    const token = await makeAdminToken();
    const store = await cookies();
    store.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8h
    });
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function triggerMatching(): Promise<void> {
  await inngest.send({ name: EVENTS.matchingRun, data: {} });
  redirect("/admin?ran=matching");
}

export async function triggerShortlist(formData: FormData): Promise<void> {
  const jobId = String(formData.get("jobId") ?? "");
  if (jobId) await inngest.send({ name: EVENTS.shortlistGenerate, data: { jobId } });
  redirect("/admin?ran=shortlist");
}

/**
 * Direito de exclusão (LGPD/GDPR): remove o talento e, em cascata,
 * seus consentimentos e matches. A entrada de auditoria é preservada
 * (referencia o id por valor, sem FK).
 */
export async function deleteTalent(formData: FormData): Promise<void> {
  const talentId = String(formData.get("talentId") ?? "");
  if (talentId) {
    await prisma.talent.delete({ where: { id: talentId } });
    await audit({ entityType: "talent", entityId: talentId, action: "deleted", actor: "admin" });
  }
  redirect("/admin?ran=deleted");
}
