'use client';

import { FoodCard } from "./foodcard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NavTop } from "./navtop";
import { useQuery } from "@tanstack/react-query"; // 1. Importar useQuery
import { Food } from "../types";

// 2. Criar uma função para buscar os dados
const fetchFoods = async (): Promise<Food[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.products; // Assumindo que a API retorna { products: [...] }
};

export function FoodCardHero() {
  // 3. Usar o hook useQuery
  const { data: foods, isLoading, isError, error } = useQuery<Food[], Error>({
    queryKey: ["products"], // Chave de cache para esta query
    queryFn: fetchFoods,   // Função que busca os dados
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NavTop />
      <div className="mb-8">
        {/* ... (código da barra de pesquisa inalterado) ... */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Pesquise sua comida favorita"
            className="w-full pl-12 pr-4 py-3 text-base bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[#ED3237] focus:border-transparent"
          />
        </div>
      </div>

      {/* 4. Usar os estados do useQuery para renderizar a UI */}
      {isLoading ? (
        <p>Carregando...</p>
      ) : isError ? (
        <p>Erro ao carregar produtos: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {foods?.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
