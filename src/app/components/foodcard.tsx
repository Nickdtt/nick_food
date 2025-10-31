"use client"; // Adicionar, pois usaremos hooks

import Image from "next/image";
import { Heart } from "lucide-react";
import { Food } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFavoritesStore } from "@/store/favoritesStore"; // 1. Importar o store

export function FoodCard({ food }: { food: Food }) {
  // 2. Pegar o estado e a função do store
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  // 3. Verificar se o food atual é um favorito
  const isFavorite = favoriteIds.has(food.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne a navegação ao clicar no coração
    e.stopPropagation();
    toggleFavorite(food.id);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 transition-transform duration-300 ease-in-out hover:scale-105">
      <Link href={`/food/${food.id}`}>
        <div className="flex justify-center items-center mb-4">
          <Image
            src={food.imageUrl}
            alt={food.name}
            width={150}
            height={150}
            className="w-full h-32 object-contain"
          />
        </div>
        <h3 className="font-bold text-lg mb-1">{food.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {food.description}
        </p>
      </Link>
      <div className="flex items-center justify-between mb-2"> {/* Adicionado mb-2 para espaçamento */}
        <span className="text-yellow-500 font-bold text-lg">★ {food.rating}</span>
        {/* Preço adicionado aqui */}
        <span className="text-xl font-bold text-gray-800">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(food.price)}
        </span>
      </div>
      <div className="flex justify-end"> {/* Novo div para o botão */}
        <Button
          onClick={handleFavoriteClick} // 4. Chamar a nova função
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-red-100"
        >
          <Heart
            className={`h-6 w-6 ${
              isFavorite ? "fill-[#ED3237] text-[#ED3237]" : "text-gray-400"
            } `}
          />
        </Button>
      </div>
    </div>
  );
}