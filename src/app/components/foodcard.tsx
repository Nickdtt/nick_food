"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Food } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useState } from "react";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
        />
      ))}
      <span className="text-xs text-gray-400 ml-1 tabular-nums">{rating.toFixed(1)}</span>
    </div>
  );
}

export function FoodCard({ food }: { food: Food }) {
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const isFavorite = favoriteIds.has(food.id);
  const [imgError, setImgError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(food.id);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 transition-transform duration-200 ease-out hover:scale-[1.03]">
      <Link href={`/food/${food.id}`}>
        <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-gray-50">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
              Sem imagem
            </div>
          ) : (
            <Image
              src={food.imageUrl}
              alt={food.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <h3 className="font-bold text-lg mb-1 leading-tight text-balance">{food.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2 text-pretty">{food.description}</p>
        <RatingStars rating={food.rating} />
      </Link>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xl font-bold text-gray-800 tabular-nums">
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(food.price)}
        </span>
        <Button
          onClick={handleFavoriteClick}
          variant="ghost"
          size="icon"
          aria-label={isFavorite ? `Remover ${food.name} dos favoritos` : `Adicionar ${food.name} aos favoritos`}
          aria-pressed={isFavorite}
          className="size-10 rounded-full hover:bg-red-100"
        >
          <Heart
            className={`size-6 transition-colors ${isFavorite ? "fill-[#ED3237] text-[#ED3237]" : "text-gray-400"}`}
          />
        </Button>
      </div>
    </div>
  );
}
