"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Food } from "@/app/types";
import { Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { notFound } from "next/navigation";

const fetchProduct = async (id: string): Promise<Food> => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Produto não encontrado");
  return res.json();
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
        />
      ))}
      <span className="text-gray-500 ml-1 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-pulse">
        <div className="w-full aspect-square rounded-xl bg-gray-200" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
          <div className="h-12 bg-gray-200 rounded w-full mt-6" />
        </div>
      </div>
    </div>
  );
}

export function FoodDetailClient({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const { data: food, isLoading, isError } = useQuery<Food>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <DetailSkeleton />;
  if (isError || !food) return notFound();

  const handleAddToCart = () => {
    addItem(food, quantity);
    toast.success(`${food.name} foi adicionado ao carrinho!`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-gray-50">
          <Image
            src={food.imageUrl}
            alt={food.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{food.name}</h1>
            <RatingStars rating={food.rating} />
            <p className="text-gray-600 mt-4 leading-relaxed">{food.bigDescription}</p>
            <p className="text-3xl font-bold text-red-600 mt-4">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(food.price)}
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-4">
              <Button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))} size="icon" variant="outline">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-bold w-6 text-center">{quantity}</span>
              <Button onClick={() => setQuantity((q) => q + 1)} size="icon" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="bg-[#ED3237] hover:bg-red-700 text-white font-semibold"
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
