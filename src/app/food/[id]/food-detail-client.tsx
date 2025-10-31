"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Food } from "@/app/types";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { notFound } from "next/navigation";

// 1. Definir a função fetchProducts (ou importá-la de um local compartilhado)
const fetchProducts = async (): Promise<Food[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Falha ao buscar produtos");
  }
  const data = await response.json();
  return data.products;
};

export function FoodDetailClient({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const { data: food, isLoading, isError } = useQuery<Food[], Error, Food | undefined>({
    queryKey: ['products'],
    queryFn: fetchProducts, // 2. Adicionar a queryFn
    select: (allProducts) => allProducts.find((p: Food) => p.id === id),
  });

  // Se a query está carregando (pouco provável, pois deve usar o cache)
  if (isLoading) {
    return <div className="container mx-auto text-center py-12">Carregando...</div>;
  }

  // Se deu erro ou se o select não encontrou o produto
  if (isError || !food) {
    // notFound() só funciona em componentes de servidor, então mostramos uma mensagem
    // ou redirecionamos. Por agora, uma mensagem.
    return notFound();
  }

  const handleAddToCart = () => {
    addItem(food, quantity);
    toast.success(`${food.name} foi adicionado ao carrinho!`);
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <Image
            src={food.imageUrl}
            alt={food.name}
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{food.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{food.bigDescription}</p> {/* Adicionado mb-4 */}
            {/* Preço adicionado aqui */}
            <p className="text-3xl font-bold text-red-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(food.price)}
            </p>
          </div>
          
          {/* Lógica de adicionar ao carrinho */}
          <div className="flex flex-col gap-4 mt-6"> {/* Adicionado mt-6 */}
            <div className="flex items-center gap-4">
              <Button onClick={handleDecrease} size="icon">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-bold">{quantity}</span>
              <Button onClick={handleIncrease} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} size="lg">
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
