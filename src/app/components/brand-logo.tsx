import { cn } from "@/lib/utils";

/**
 * Logo/ícone da marca DevFood — SVG inline (nítido em qualquer DPI, imune a basePath).
 * Uma tigela de delivery com vapor, dentro de um badge arredondado.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="DevFood"
      className={cn("text-red-500", className)}
    >
      <rect width="48" height="48" rx="14" fill="currentColor" />
      {/* Vapor */}
      <path
        d="M19 12c-1.2 1.2-1.2 2.8 0 4s1.2 2.8 0 4M29 12c-1.2 1.2-1.2 2.8 0 4s1.2 2.8 0 4"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* Tigela */}
      <path
        d="M12 25h24a12 12 0 0 1-12 11 12 12 0 0 1-12-11Z"
        fill="#fff"
      />
      <rect x="10" y="23" width="28" height="3" rx="1.5" fill="#fff" />
    </svg>
  );
}
