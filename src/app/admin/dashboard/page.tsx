"use client";

import { useQuery } from "@tanstack/react-query";
import { Food } from "../../types";
import { Package, ShoppingBag, Clock, DollarSign } from "lucide-react";

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
};

const fetchProducts = async (): Promise<Food[]> => {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Falha ao carregar produtos");
  const data = await res.json();
  return data.products;
};

const fetchOrders = async (): Promise<Order[]> => {
  const res = await fetch("/api/orders");
  if (!res.ok) throw new Error("Falha ao carregar pedidos");
  const data = await res.json();
  return data.orders;
};

export default function DashboardPage() {
  const { data: products, isLoading: loadingProducts } = useQuery<Food[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: orders, isLoading: loadingOrders } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const isLoading = loadingProducts || loadingOrders;

  const totalRevenue = orders?.reduce((acc, o) => acc + o.total, 0) ?? 0;
  const pendingOrders = orders?.filter((o) => o.status === "pending").length ?? 0;

  const metrics = [
    {
      label: "Produtos",
      value: products?.length ?? 0,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pedidos",
      value: orders?.length ?? 0,
      icon: ShoppingBag,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Pendentes",
      value: pendingOrders,
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Receita Total",
      value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalRevenue),
      icon: DollarSign,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Visão geral do seu negócio</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-100 rounded" />
                </div>
              ) : (
                <>
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-3 ${m.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{m.value}</p>
                  <p className="text-sm text-gray-500">{m.label}</p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Pedidos recentes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-800 mb-4">Pedidos Recentes</h2>
        {loadingOrders ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : orders?.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum pedido ainda.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {orders?.slice(0, 5).map((order) => (
              <div key={order.id} className="flex justify-between items-center py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Pedido #{order.id.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString("pt-BR")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {order.status === "pending" ? "Pendente" : order.status === "confirmed" ? "Confirmado" : "Entregue"}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
