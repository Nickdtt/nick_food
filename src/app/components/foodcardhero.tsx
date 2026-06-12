'use client';

import { FoodCard } from "./foodcard";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { NavTop } from "./navtop";
import { useQuery } from "@tanstack/react-query";
import { Food } from "../types";
import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const fetchFoods = async (): Promise<Food[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.products;
};

export function FoodCardHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: foods, isLoading, isError, error } = useQuery<Food[], Error>({
    queryKey: ["products"],
    queryFn: fetchFoods,
  });

  const filteredFoods = useMemo(() => {
    if (!foods) return [];
    if (!debouncedQuery.trim()) return foods;
    const q = debouncedQuery.toLowerCase();
    return foods.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
    );
  }, [foods, debouncedQuery]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NavTop />
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise sua comida favorita"
            className="w-full pl-12 pr-10 py-3 text-base bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[#ED3237] focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-56" />
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500">Erro ao carregar produtos: {error.message}</p>
      ) : filteredFoods.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium">Nenhum resultado para &quot;{debouncedQuery}&quot;</p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-3 text-[#ED3237] font-semibold hover:underline"
          >
            Limpar busca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
