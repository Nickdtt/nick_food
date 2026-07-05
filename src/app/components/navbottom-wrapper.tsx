"use client";

import { usePathname } from "next/navigation";
import NavBottom from "./navbottom";

export default function NavBottomWrapper() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";
  // Cart e checkout têm sua própria barra de ação fixa (foco na conversão)
  const hasOwnActionBar = pathname === "/cart" || pathname === "/checkout";

  if (isAdminRoute || isLoginPage || hasOwnActionBar) {
    return null; // Não renderiza a NavBottom onde há barra de ação própria
  }

  return <NavBottom />;
}
