import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // Configuração de tempo de vida da sessão
    maxAge: 12 * 60 * 60, // 12 horas em segundos
    updateAge: 6 * 60 * 60, // 6 horas em segundos (sessão será atualizada se o usuário estiver ativo)
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login", // Página de login personalizada
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user; // Verifica se há um usuário logado
      const isOnLoginPage = request.nextUrl.pathname === "/login"; // Verifica se está na página de login
      const isTryingToAccessAdmin = request.nextUrl.pathname.startsWith("/admin");

      // Se está na página de login, permite sempre o acesso
      if (isOnLoginPage) {
        return true;
      }

      // Se está tentando acessar uma rota admin (e não é a página de login)
      if (isTryingToAccessAdmin) {
        if (isLoggedIn) return true; // Se logado, permite o acesso
        return false; // Se não logado, nega o acesso (redireciona para signIn)
      }

      return true; // Permite acesso a todas as outras rotas (não admin)
    },
  },
} satisfies NextAuthConfig
