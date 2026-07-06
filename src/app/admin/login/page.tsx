import { login } from "../actions";
import { Logo } from "@/components/Header";

export const dynamic = "force-dynamic";

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F7FB] px-4">
      <div className="w-full max-w-[400px] bg-white border border-brand-border rounded-2xl p-9 shadow-form">
        <div className="mb-7">
          <Logo />
        </div>
        <h1 className="font-serif font-bold text-[24px] text-ahk-blue mb-1">Backoffice</h1>
        <p className="text-[14px] text-brand-muted mb-6">Acesso restrito à curadoria AHK.</p>
        <form action={login} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13.5px] font-bold text-ahk-blue mb-[7px]">Senha</label>
            <input
              type="password"
              name="password"
              autoFocus
              className="field w-full h-[46px] px-[14px] border-[1.5px] border-[#D7DEE7] rounded-lg text-[15px] outline-none"
            />
          </div>
          {error && <p className="text-[13.5px] text-ahk-red">Senha incorreta.</p>}
          <button
            type="submit"
            className="h-[50px] bg-ahk-blue text-white rounded-lg font-bold text-[16px] cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
