import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";

/**
 * Serve o CV (blob PRIVADO) apenas para o backoffice. A rota está sob `/admin/*`,
 * protegida pelo middleware — o PDF nunca é acessível por URL pública.
 * Autenticação do blob: OIDC + BLOB_STORE_ID na Vercel (automático).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const talent = await prisma.talent.findUnique({ where: { id }, select: { cvUrl: true } });

  if (!talent?.cvUrl) {
    return NextResponse.json({ error: "no_cv" }, { status: 404 });
  }

  const result = await get(talent.cvUrl, { access: "private" });
  if (!result || !result.stream) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  await audit({ entityType: "talent", entityId: id, action: "accessed", actor: "admin", detail: { resource: "cv" } });

  return new NextResponse(result.stream as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="cv-${id}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
