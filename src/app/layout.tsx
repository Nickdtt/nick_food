import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Providers from "./providers";
import { ClientShell } from "./components/client-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NickFood",
  description: "Seu delivery favorito",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center md:w-full pb-20`}
      >
        <Providers>
          <SessionProvider session={session}>
            <ClientShell>
              {children}
            </ClientShell>
            <Toaster richColors position="top-center" />
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
