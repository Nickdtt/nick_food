import { ArrowLeft } from "lucide-react";

/**
 * Link discreto para retornar à home do portfólio (raiz do domínio).
 *
 * O app roda sob basePath `/nickfood`, então usamos <a> nativo com href
 * absoluto "/" — o <Link> do Next prefixaria com /nickfood e voltaria
 * para a home do próprio DevFood, não do portfólio.
 */
export function BackToPortfolio() {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages -- <a> proposital: escapa do basePath /nickfood para a home do portfólio
    <a
      href="/"
      aria-label="Voltar para a home do portfólio"
      className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm backdrop-blur transition-colors duration-200 ease-out hover:border-gray-300 hover:text-gray-900"
      style={{ paddingTop: "max(0.375rem, env(safe-area-inset-top))" }}
    >
      <ArrowLeft className="size-3.5" aria-hidden="true" />
      Portfólio
    </a>
  );
}
