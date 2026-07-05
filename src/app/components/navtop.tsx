import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";
import { BrandLogo } from "./brand-logo";

export function NavTop() {
  return (
    <div className="mb-6">
      <div className="flex justify-between w-full items-start">
        <div>
          <h1 className="text-4xl font-bold font-serif">{BRAND_NAME}</h1>
          <p className="text-md text-gray-500">{BRAND_TAGLINE}!</p>
        </div>
        <BrandLogo className="w-14 h-14 shrink-0" />
      </div>

      {/* Badge de demonstração — chama atenção de quem vai testar o projeto */}
      <Link
        href="/admin/dashboard"
        className="group mt-4 flex items-center justify-between gap-3 rounded-2xl bg-[#ED3237] px-4 py-3 text-white shadow-md shadow-red-500/20 transition-transform active:scale-[0.99] hover:bg-red-600"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20">
            <Zap className="size-4 motion-safe:animate-pulse" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold">Testar Painel do Gestor</span>
            <span className="text-xs text-white/80">Veja o lado do administrador — acesso demo</span>
          </span>
        </span>
        <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
