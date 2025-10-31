"use client";

import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/store/favoritesStore";
import { FoodCard } from "../components/foodcard";
import { Food } from "../types";

export default function FavoritesPage() {
  const { favoriteIds } = useFavoritesStore();
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("/api/products");
        console.log("API Response object for favorites page:", response); // Debug log: raw response
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response data for favorites page:", data); // Debug log: parsed data
        setAllFoods(data.products);
      } catch (err) {
        setError("Falha ao carregar os produtos.");
        console.error("Failed to fetch products for favorites page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  console.log("allFoods state before filter:", allFoods);
  const favoritedFoods = Array.isArray(allFoods)
    ? allFoods.filter((food) => favoriteIds.has(food.id))
    : [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-gray-500">Carregando favoritos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-6 py-8 max-w-3xl w-full">
      <h1 className="text-4xl font-bold mb-8 text-center text-foreground">Meus Favoritos</h1>
      {favoritedFoods.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 text-lg">Você não tem favoritos ainda.</p>
          <p className="text-gray-400 text-sm mt-2">Explore o menu e adicione seus pratos preferidos!</p>
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