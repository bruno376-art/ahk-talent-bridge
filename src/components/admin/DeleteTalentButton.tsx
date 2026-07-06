"use client";

import { deleteTalent } from "@/app/admin/actions";

export default function DeleteTalentButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteTalent}
      onSubmit={(e) => {
        if (
          !confirm(
            `Excluir permanentemente "${name}" e todos os dados relacionados (consentimentos, matches)? Esta ação atende ao direito de exclusão (LGPD/GDPR) e não pode ser desfeita.`,
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="talentId" value={id} />
      <button className="text-ahk-red font-bold text-[13px] cursor-pointer underline">
        Excluir
      </button>
    </form>
  );
}
