import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ["application/pdf"];

/**
 * Recebe o PDF do CV e armazena no Vercel Blob, retornando a URL.
 * Sem BLOB_READ_WRITE_TOKEN (ex.: dev local), responde 503 e o formulário
 * segue funcionando sem o anexo (o CV é opcional).
 *
 * Nota LGPD: a URL do Blob é pública porém não-adivinhável (sufixo aleatório)
 * e só é exposta no backoffice. Para sigilo estrito, evoluir para storage
 * privado com download autenticado.
 */
export async function POST(req: Request) {
  // Consome o corpo antes de qualquer retorno (evita reset de conexão).
  const form = await req.formData();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
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
    access: "public",
    addRandomSuffix: true,
    contentType: "application/pdf",
  });

  return NextResponse.json({ url: blob.url, filename: file.name });
}
