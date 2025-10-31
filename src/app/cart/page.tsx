"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, increaseQuantity, decreaseQuantity } = useCartStore();

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>
        <p className="text-gray-500">Seu carrinho está vazio.</p>
        <Link href="/" className="mt-4">
          <Button size="lg" className="bg-red-500 text-white hover:bg-red-600">
            Voltar para as compras!
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
            <div className="flex items-center gap-4">
              <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-md" />
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-500">R$ {item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button onClick={() => decreaseQuantity(Number(item.id))} size="icon" variant="ghost">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold">{item.quantity}</span>
                <Button onClick={() => increaseQuantity(Number(item.id))} size="icon" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={() => removeItem(Number(item.id))} size="icon" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <div className="text-2xl font-bold">
          Total: R$ {total.toFixed(2)}
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button size="lg" className="bg-green-500 text-white hover:bg-green-600">
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}