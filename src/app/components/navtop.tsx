import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";
import { BrandLogo } from "./brand-logo";

export function NavTop() {
  return (
    <div className="flex justify-between w-full items-start mb-6">
      <div>
        <h1 className="text-4xl font-bold font-serif">{BRAND_NAME}</h1>
        <p className="text-md text-gray-500">{BRAND_TAGLINE}!</p>
        <Link
          href="/admin/dashboard"
          aria-label="Testar o painel do gestor — demo"
          className="cta-pulse mt-3 inline-flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-red-600 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          <ShieldCheck size={16} />
          Testar painel do gestor
        </Link>
      </div>
      <BrandLogo className="w-14 h-14 shrink-0" />
    </div>
  );
}
