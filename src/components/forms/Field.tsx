"use client";

import type { FormField } from "@/i18n/dictionary";

const base =
  "field w-full border-[1.5px] border-[#D7DEE7] rounded-lg font-sans text-[15px] text-[#3C4652] bg-white outline-none";

export default function Field({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[13.5px] font-bold text-ahk-blue mb-[7px]">
        {field.label}
        {field.required ? <span className="text-ahk-red"> *</span> : null}
      </label>

      {field.kind === "select" && (
        <select
          className={`${base} h-[46px] px-3`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            —
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {field.kind === "text" && (
        <input
          type="text"
          placeholder={field.placeholder}
          className={`${base} h-[46px] px-[14px]`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.kind === "area" && (
        <textarea
          placeholder={field.placeholder}
          className={`${base} min-h-[96px] py-3 px-[14px] resize-y`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
