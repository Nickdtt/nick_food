import NextAuth from "next-auth"
import { authConfig } from "./auth.config" // Importa a configuração Edge-compatible

export default NextAuth(authConfig).auth

export const config = {
  matcher: ["/admin/:path*"], // Protege todas as rotas que começam com /admin
}
