"use client"; // 1. Transformar em Client Component

import { useState } from "react";
import AdminSidebar from "./components/sidebar";
import { Menu } from "lucide-react"; // 2. Importar ícone de Menu

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
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <div className="text-lg font-bold text-red-600 ml-4">Admin Panel</div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-grow p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}