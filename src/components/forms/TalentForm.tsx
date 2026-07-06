"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { submitTalent } from "@/app/actions/submit";
import Field from "./Field";
import FormShell, { SuccessPanel } from "./FormShell";

export default function TalentForm() {
  const { t, lang } = useI18n();
  const c = t.talent;

  const [values, setValues] = useState<Record<string, string>>({});
  const [consentData, setConsentData] = useState(false);
  const [consentComms, setConsentComms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (name: string) => (v: string) => setValues((prev) => ({ ...prev, [name]: v }));

  async function handleSubmit() {
    setError(null);
    const missing = c.fields.some((f) => f.required && !values[f.name]?.trim());
    if (missing || !consentData) {
      setError(t.common.formError);
      return;
    }
    setSubmitting(true);
    const res = await submitTalent({
      fullName: values.fullName,
      email: values.email,
      area: values.area,
      seniority: values.seniority,
      languages: values.languages,
      internationalExperience: values.internationalExperience ?? "",
      consentData: true,
      consentComms,
      lang,
    });
    setSubmitting(false);
    if (res.ok) setSubmitted(true);
    else setError(t.common.formError);
  }

  return (
    <FormShell
      eyebrow={c.eyebrow}
      title={c.title}
      sub={c.sub}
      benefits={c.benefits}
      trust={c.trust}
      trustIcon="🤖"
      benefitIconClass="bg-brand-green-soft text-[#1F8F6B]"
    >
      {submitted ? (
        <SuccessPanel title={c.doneTitle} message={c.done} />
      ) : (
        <div className="flex flex-col gap-5">
          {c.fields.map((f) => (
            <Field key={f.name} field={f} value={values[f.name] ?? ""} onChange={set(f.name)} />
          ))}

          <div className="flex flex-col gap-3">
            <label className="flex gap-[11px] items-start p-4 bg-brand-green-soft border border-[#C7E9DB] rounded-[10px] cursor-pointer">
              <input
                type="checkbox"
                className="mt-[3px] w-[17px] h-[17px] flex-shrink-0 accent-[#1F8F6B]"
                checked={consentData}
                onChange={(e) => setConsentData(e.target.checked)}
              />
              <span className="text-[13.5px] text-[#2C5B4A] leading-[1.5]">
                <strong>{c.consentDataLabel}</strong> — {c.consentData}
              </span>
            </label>
            <label className="flex gap-[11px] items-start p-4 bg-[#F4F7FB] border border-[#E4EAF2] rounded-[10px] cursor-pointer">
              <input
                type="checkbox"
                className="mt-[3px] w-[17px] h-[17px] flex-shrink-0 accent-[#003366]"
                checked={consentComms}
                onChange={(e) => setConsentComms(e.target.checked)}
              />
              <span className="text-[13.5px] text-[#4C5763] leading-[1.5]">{c.consentComms}</span>
            </label>
          </div>

          {error && <p className="text-[13.5px] text-ahk-red -mt-1">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="h-[52px] bg-ahk-blue text-white rounded-lg font-sans font-bold text-[16px] cursor-pointer disabled:opacity-60"
          >
            {submitting ? t.common.submitting : c.submit}
          </button>
        </div>
      )}
    </FormShell>
  );
}
