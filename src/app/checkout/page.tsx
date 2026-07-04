"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type CheckoutForm = {
  customerName: string;
  address: string;
  phone: string;
};

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [form, setForm] = useState<CheckoutForm>({ customerName: "", address: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/nickfood/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          address: form.address,
          phone: form.phone,
          total,
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Falha ao criar pedido");

      clearCart();
      setIsSuccess(true);
    } catch {
      toast.error("Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <p className="text-gray-500 mb-4">Seu carrinho está vazio.</p>
        <Link href="/">
          <Button className="bg-red-500 text-white hover:bg-red-600">Ver cardápio</Button>
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
        <CheckCircle className="h-20 w-20 text-green-500 mb-6 motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-500" />
        <h1 className="text-3xl font-bold mb-2">Pedido realizado!</h1>
        <p className="text-gray-500 mb-8">Obrigado! Seu pedido foi recebido e está sendo preparado.</p>
        <Button onClick={() => router.push("/")} className="bg-red-500 text-white hover:bg-red-600">
          Voltar para o cardápio
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <Link href="/cart" className="flex items-center gap-1 text-gray-500 hover:text-gray-800 mb-6 w-fit">
        <ArrowLeft className="h-4 w-4" />
        Voltar ao carrinho
      </Link>

      <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>

      {/* Resumo */}
      <div className="bg-gray-50 rounded-xl p-4 mb-8">
        <h2 className="font-semibold text-gray-700 mb-3">Resumo do pedido</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-600">
              <span className="text-pretty">{item.name} <span className="tabular-nums">× {item.quantity}</span></span>
              <span className="tabular-nums">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t mt-3 pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span className="tabular-nums">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}</span>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
          <input
            type="text"
            name="customerName"
            autoComplete="name"
            value={form.customerName}
            onChange={handleChange}
            required
            placeholder="João Silva"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de entrega</label>
          <input
            type="text"
            name="address"
            autoComplete="street-address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Rua das Flores, 123 - Bairro, Cidade"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="(11) 99999-9999"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-base font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Enviando pedido..." : "Confirmar Pedido"}
        </Button>
      </form>
    </div>
  );
}
