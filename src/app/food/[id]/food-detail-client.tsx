"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Food } from "@/app/types";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

export function FoodDetailClient({ food }: { food: Food }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ ...food, quantity });
    toast.success(`${food.name} foi adicionado ao carrinho!`);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex flex-col gap-4">
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
  );
}
