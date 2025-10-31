"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { Food } from "@/app/types";
import { useState } from "react";
import ProductFormModal from "./components/ProductFormModal";
import ActionMenu from "./components/ActionMenu"; // 1. Importar o ActionMenu
import { toast } from "sonner";
import Image from "next/image"; // 1. Importar o componente Image

type ProductFormData = Omit<Food, "id" | "rating" | "favorite" | "createdAt" | "updatedAt">;

const fetchProducts = async (): Promise<Food[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Falha ao buscar produtos");
  }
  const data = await response.json();
  return data.products;
};

const createProduct = async (newProduct: ProductFormData): Promise<Food> => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });
  if (!response.ok) throw new Error('Falha ao criar produto');
  return response.json();
};

// 2. Adicionar a função para DELETAR
const deleteProduct = async (productId: string): Promise<void> => {
  const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Falha ao excluir produto');
};

export default function ProductsPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Food | null>(null);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery<Food[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Produto adicionado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Falha ao adicionar produto: ${error.message}`);
    }
  });

  // 3. Adicionar a DELETE MUTATION
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Produto excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      toast.error(`Falha ao excluir produto: ${error.message}`);
    }
  });

  const handleDelete = (productId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.")) {
      deleteProductMutation.mutate(productId);
    }
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleFormSubmit = (data: ProductFormData) => {
    createProductMutation.mutate(data);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
        <button
          onClick={handleAddClick}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Adicionar Produto</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr><td colSpan={4} className="text-center py-4">Carregando...</td></tr>
            ) : (
              products?.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <ActionMenu
                      onDelete={() => handleDelete(product.id)}
                      onEdit={() => { /* Lógica de editar virá aqui */ }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
        isSaving={createProductMutation.isPending}
      />
    </div>
  );
}
