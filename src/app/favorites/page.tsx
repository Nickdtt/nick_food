"use client";

import { useQuery } from "@tanstack/react-query";
import { useFavoritesStore } from "@/store/favoritesStore";
import { FoodCard } from "../components/foodcard";
import { Food } from "../types";
import Link from "next/link";

const fetchFoods = async (): Promise<Food[]> => {
  const res = await fetch("/nickfood/api/products");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.products;
};

export default function FavoritesPage() {
  const { favoriteIds } = useFavoritesStore();

  const { data: allFoods, isLoading, isError } = useQuery<Food[]>({
    queryKey: ["products"],
    queryFn: fetchFoods,
  });

  const favoritedFoods = (allFoods ?? []).filter((food) => favoriteIds.has(food.id));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Meus Favoritos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">Falha ao carregar produtos.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-1">Meus Favoritos</h1>
      {favoritedFoods.length > 0 && (
        <p className="text-gray-400 text-sm mb-6 tabular-nums">{favoritedFoods.length} {favoritedFoods.length === 1 ? "item" : "itens"}</p>
      )}

      {favoritedFoods.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-gray-500 text-lg mb-2">Você não tem favoritos ainda.</p>
          <p className="text-gray-400 text-sm mb-6">Explore o menu e adicione seus pratos preferidos!</p>
          <Link href="/" className="text-[#ED3237] font-semibold hover:underline">
            Ver cardápio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {favoritedFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
