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
          className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
        >
          <ShieldCheck size={13} />
          Painel do gestor
        </Link>
      </div>
      <BrandLogo className="w-14 h-14 shrink-0" />
    </div>
  );
}
