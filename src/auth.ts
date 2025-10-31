import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { authConfig } from "./auth.config"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("--- Authorize function called ---");
        console.log("Attempting login for email:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password.");
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        })

        if (!user) {
          console.log("User not found for email:", credentials.email);
          return null
        }
        console.log("User found:", user.email);

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
        console.log("Password comparison result:", passwordMatch);

        if (passwordMatch) {
          console.log("Login successful for user:", user.email);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        } else {
          console.log("Password mismatch for user:", user.email);
          return null
        }
      },
    }),
  ],
})
