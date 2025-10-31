"use client";

import { useQuery } from "@tanstack/react-query";
import { Food } from "../../types"; // Ajustar o caminho conforme necessário

// Função para buscar os produtos
const fetchProducts = async (): Promise<Food[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Falha ao carregar os produtos");
  }
  const data = await response.json();
  // Assumindo que a API retorna { products: Food[] }
  return data.products;
};

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useQuery<Food[], Error>({
    queryKey: ["adminProducts"], // Chave única para esta query
    queryFn: fetchProducts, // Função que realiza a busca
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
        <p className="text-gray-500">Carregando produtos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
        <p className="text-red-500">Erro ao carregar produtos: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-foreground">Painel Administrativo</h1>
      <h2 className="text-2xl font-semibold mb-4 text-foreground">Produtos Cadastrados</h2>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((product) => (
            <div key={product.id} className="bg-card p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {product.id}</p>
              <p className="text-sm text-muted-foreground">Preço: R$ {product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Rating: {product.rating}</p>
              {/* Adicionar botões de editar/excluir aqui */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
