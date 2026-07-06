"use client";

/**
 * Campo honeypot anti-spam. Fica fora da tela e escondido de leitores de tela;
 * usuários reais nunca o preenchem, bots costumam preencher. Se vier preenchido,
 * a server action descarta a submissão silenciosamente.
 */
export default function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
      <label>
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
