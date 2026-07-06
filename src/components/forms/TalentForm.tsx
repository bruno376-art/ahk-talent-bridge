"use client";

import { useState, useRef } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { submitTalent } from "@/app/actions/submit";
import Field from "./Field";
import Honeypot from "./Honeypot";
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

  // Estado do upload de CV
  const [cvUrl, setCvUrl] = useState("");
  const [cvFilename, setCvFilename] = useState("");
  const [uploading, setUploading] = useState(false);
  const [cvError, setCvError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (name: string) => (v: string) => setValues((prev) => ({ ...prev, [name]: v }));

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCvError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload-cv", { method: "POST", body: fd });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setCvUrl(data.url);
      setCvFilename(data.filename);
    } catch {
      setCvError(c.cv.error);
      if (fileRef.current) fileRef.current.value = "";
    } finally {
      setUploading(false);
    }
  }

  function removeCv() {
    setCvUrl("");
    setCvFilename("");
    setCvError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit() {
    setError(null);
    const missing = c.fields.some((f) => f.required && !values[f.name]?.trim());
    if (missing || !consentData) {
      setError(t.common.formError);
      return;
    }
    setSubmitting(true);
    const res = await submitTalent({
      ...values,
      consentData: true,
      consentComms,
      cvUrl,
      cvFilename,
      website: values.website ?? "",
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
        <div className="flex flex-col gap-6">
          <Honeypot value={values.website ?? ""} onChange={set("website")} />

          {c.fields.map((f, i) => {
            const showSection = f.section && f.section !== c.fields[i - 1]?.section;
            const isCvSection = f.name === "summary"; // último campo da seção Currículo
            return (
              <div key={f.name} className="flex flex-col gap-4">
                {showSection && (
                  <h3 className="text-[13px] font-bold tracking-[1px] uppercase text-ahk-cyan border-b border-brand-border pb-2 mt-1">
                    {f.section}
                  </h3>
                )}
                <Field field={f} value={values[f.name] ?? ""} onChange={set(f.name)} />
                {isCvSection && (
                  <CvUpload
                    c={c.cv}
                    fileRef={fileRef}
                    onFile={handleFile}
                    uploading={uploading}
                    cvFilename={cvFilename}
                    cvError={cvError}
                    onRemove={removeCv}
                  />
                )}
              </div>
            );
          })}

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
            disabled={submitting || uploading}
            className="h-[52px] bg-ahk-blue text-white rounded-lg font-sans font-bold text-[16px] cursor-pointer disabled:opacity-60"
          >
            {submitting ? t.common.submitting : c.submit}
          </button>
        </div>
      )}
    </FormShell>
  );
}

function CvUpload({
  c,
  fileRef,
  onFile,
  uploading,
  cvFilename,
  cvError,
  onRemove,
}: {
  c: { label: string; hint: string; button: string; uploading: string; attached: string; remove: string; error: string };
  fileRef: React.RefObject<HTMLInputElement | null>;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  cvFilename: string;
  cvError: string | null;
  onRemove: () => void;
}) {
  return (
    <div className="border border-dashed border-[#C3CEDC] rounded-[10px] p-4 bg-[#FAFBFD]">
      <div className="text-[13.5px] font-bold text-ahk-blue mb-1">📄 {c.label}</div>
      <p className="text-[12.5px] text-brand-muted leading-[1.5] mb-3">{c.hint}</p>

      {cvFilename ? (
        <div className="flex items-center justify-between gap-3 bg-brand-green-soft border border-[#C7E9DB] rounded-lg px-3 py-2">
          <span className="text-[13px] text-[#1F8F6B] font-semibold truncate">
            ✓ {c.attached}: {cvFilename}
          </span>
          <button type="button" onClick={onRemove} className="text-[12.5px] text-ahk-red font-bold underline flex-shrink-0">
            {c.remove}
          </button>
        </div>
      ) : (
        <label className="inline-flex items-center h-10 px-4 bg-white border-[1.5px] border-[#C3CEDC] text-ahk-blue rounded-md font-bold text-[14px] cursor-pointer">
          {uploading ? c.uploading : c.button}
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={onFile}
            disabled={uploading}
          />
        </label>
      )}
      {cvError && <p className="text-[12.5px] text-ahk-red mt-2">{cvError}</p>}
    </div>
  );
}
