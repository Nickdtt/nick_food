"use client"; // 1. Transformar em Client Component

import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "./components/sidebar";
import { Menu, Store } from "lucide-react"; // 2. Importar ícone de Menu

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 3. Adicionar estado para controlar a visibilidade da sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 w-6xl">
      {/* A sidebar agora recebe props para controlar seu estado */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-grow flex flex-col">
        {/* 4. Header que só aparece em telas pequenas e contém o botão de menu */}
        <header className="sm:hidden bg-white shadow-md p-4 flex items-center">
          <button onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <div className="text-lg font-bold text-red-600 ml-4">Admin Panel</div>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-red-600"
          >
            <Store size={16} />
            Ver loja
          </Link>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-grow p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}