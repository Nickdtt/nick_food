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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-40">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white shadow-md rounded-2xl motion-safe:animate-in motion-safe:fade-in"
          >
            {/* Linha 1: imagem + nome + preço */}
            <div className="flex items-center gap-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={72}
                height={72}
                className="rounded-xl shrink-0 size-[72px] object-cover bg-gray-50"
              />
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-base leading-tight text-balance">{item.name}</h2>
                <p className="text-gray-500 tabular-nums text-sm mt-0.5">R$ {item.price.toFixed(2)}</p>
              </div>
            </div>
            {/* Linha 2: controles de quantidade + remover (não competem com o nome) */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
                <Button
                  onClick={() => decreaseQuantity(item.id)}
                  size="icon"
                  variant="ghost"
                  className="rounded-full active:scale-90 transition-transform"
                  aria-label={`Diminuir quantidade de ${item.name}`}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="font-bold tabular-nums w-8 text-center" aria-label={`Quantidade: ${item.quantity}`}>
                  {item.quantity}
                </span>
                <Button
                  onClick={() => increaseQuantity(item.id)}
                  size="icon"
                  variant="ghost"
                  className="rounded-full active:scale-90 transition-transform"
                  aria-label={`Aumentar quantidade de ${item.name}`}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button
                onClick={() => removeItem(item.id)}
                size="icon"
                variant="ghost"
                className="text-gray-400 hover:text-red-600 active:scale-90 transition-transform"
                aria-label={`Remover ${item.name} do carrinho`}
              >
                <Trash2 className="size-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Barra fixa de checkout na thumb zone — CTA largo e alcançável */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 mx-auto w-full max-w-screen-md border-t border-gray-100 bg-white/95 px-4 pt-4 backdrop-blur"
        style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-500">Total</span>
          <span className="text-2xl font-bold tabular-nums">R$ {total.toFixed(2)}</span>
        </div>
        <Link href="/checkout" className="block">
          <Button
            size="lg"
            className="w-full bg-[#ED3237] hover:bg-red-700 active:scale-[0.99] transition-transform text-white text-base font-semibold"
          >
            Finalizar Compra
          </Button>
        </Link>
      </div>
    </div>
  );
}