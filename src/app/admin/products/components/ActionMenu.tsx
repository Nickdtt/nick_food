"use client";

import { MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ActionMenuProps {
  onDelete: () => void;
  onEdit: () => void;
}

export default function ActionMenu({ onDelete, onEdit }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-800">
        <MoreHorizontal size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border">
          <ul className="py-1">
            <li>
              <button onClick={() => { onEdit(); setIsOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Pencil size={16} /> Editar
              </button>
            </li>
            <li>
              <button onClick={() => { onDelete(); setIsOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <Trash2 size={16} /> Excluir
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
