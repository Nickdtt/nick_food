"use client";

import { Food } from "@/app/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

// Definir os dados que o formulário vai submeter
type ProductFormData = Omit<Food, "id" | "rating" | "favorite" | "createdAt" | "updatedAt">;

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Food | null;
  // Função para submeter os dados, vinda da mutation
  onSubmit: (data: ProductFormData) => void;
  isSaving: boolean; // Para mostrar o estado de "salvando"
}

export default function ProductFormModal({ isOpen, onClose, product, onSubmit, isSaving }: ProductFormModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    bigDescription: "",
  });

  // Se um produto for passado (modo de edição), preenche o formulário
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        bigDescription: product.bigDescription,
      });
    } else {
      // Limpa o formulário se for para adicionar um novo
      setFormData({ name: "", description: "", price: 0, imageUrl: "", bigDescription: "" });
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Se o campo for 'price', converte para float. Se o resultado for NaN (ex: string vazia), usa 0.
    const newValue = name === 'price' ? (parseFloat(value) || 0) : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-6">
          {product ? "Editar Produto" : "Adicionar Novo Produto"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos do formulário */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição Curta</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição Longa</label>
            <textarea name="bigDescription" value={formData.bigDescription} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço (ex: 25.50)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" required />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">
              Cancelar
            </button>
            <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400">
              {isSaving ? "Salvando..." : "Salvar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}