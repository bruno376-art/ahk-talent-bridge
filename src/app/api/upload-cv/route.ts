import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ["application/pdf"];

/**
 * Recebe o PDF do CV e armazena no Vercel Blob como blob PRIVADO.
 *
 * Blobs privados exigem autenticação para leitura (LGPD-friendly): não são
 * acessíveis por URL pública. Na Vercel, a autenticação é automática via OIDC
 * + BLOB_STORE_ID; localmente exige BLOB_READ_WRITE_TOKEN. Sem nenhum dos dois,
 * responde 503 e o formulário segue funcionando sem o anexo (CV é opcional).
 * A leitura do CV ocorre apenas pela rota autenticada do admin.
 */
export async function POST(req: Request) {
  // Consome o corpo antes de qualquer retorno (evita reset de conexão).
  const form = await req.formData();

  const blobConfigured = process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobConfigured) {
    return NextResponse.json(
      { error: "upload_disabled", message: "Armazenamento de arquivos não configurado." },
      { status: 503 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "invalid_type", message: "Envie um PDF." }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "too_large", message: "Máx. 5 MB." }, { status: 413 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80) || "cv.pdf";
  const blob = await put(`cv/${safeName}`, file, {
    access: "private",
    addRandomSuffix: true,
    contentType: "application/pdf",
  });

  // Guardamos a URL do blob privado; a leitura só acontece pela rota autenticada.
  return NextResponse.json({ url: blob.url, filename: file.name });
}
