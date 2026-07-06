import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";

/**
 * Direito de acesso / portabilidade (LGPD/GDPR): exporta o talento e seus
 * dados relacionados em JSON. A rota fica sob `/admin/*`, protegida pelo middleware.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const talent = await prisma.talent.findUnique({
    where: { id },
    include: { consents: true, matches: true },
  });

  if (!talent) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  await audit({ entityType: "talent", entityId: id, action: "exported", actor: "admin" });

  return new NextResponse(JSON.stringify(talent, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="talento-${id}.json"`,
    },
  });
}
