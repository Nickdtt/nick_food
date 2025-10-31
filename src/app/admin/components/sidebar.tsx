"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  X, // 1. Importar ícone de fechar
} from "lucide-react";
import { signOut } from "next-auth/react";

// 2. Definir as props que o componente receberá
interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Produtos" },
    { href: "/admin/orders", icon: ShoppingBag, label: "Pedidos" },
  ];

  const handleLinkClick = () => {
    if (isOpen) {
      onClose(); // Fecha a sidebar ao clicar em um link no modo móvel
    }
  };

  return (
    <>
      {/* 3. Overlay que aparece atrás da sidebar em telas pequenas */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* 4. Classes de CSS dinâmicas para controlar a visibilidade e posição */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white text-gray-800 p-4 flex flex-col shadow-lg z-20
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          sm:relative sm:translate-x-0 sm:shadow-md
        `}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-red-600">Admin Panel</div>
          {/* 5. Botão de fechar que só aparece em telas pequenas */}
          <button onClick={onClose} className="sm:hidden">
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick} // Fecha ao navegar
                  className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-red-600 text-white"
                      : "hover:bg-red-50 text-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-red-50 text-gray-700 w-full text-left"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}