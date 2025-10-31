"use client";

import { usePathname } from "next/navigation";
import NavBottom from "./navbottom";

export default function NavBottomWrapper() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login"; // Adicionar esta linha

  if (isAdminRoute || isLoginPage) { // Modificar esta linha
    return null; // Não renderiza a NavBottom em rotas admin ou na página de login
  }

  return <NavBottom />;
}
