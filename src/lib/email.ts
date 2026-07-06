/**
 * Envio de e-mail institucional. Usa Resend se RESEND_API_KEY estiver definido;
 * caso contrário apenas registra no console (útil em dev / MVP).
 */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; skipped?: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "AHK Talent Bridge <no-reply@localhost>";

  if (!apiKey) {
    console.log(`[email:skipped] para=${opts.to} assunto="${opts.subject}"`);
    return { ok: true, skipped: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: opts.to, subject: opts.subject, html: opts.html }),
    });
    if (!res.ok) {
      console.error("[email] Resend respondeu", res.status, await res.text());
      return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    console.error("[email] falha", e);
    return { ok: false };
  }
}
