"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type OrderItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  delivered: "Entregue",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
};

const NEXT_STATUS: Record<string, string | null> = {
  pending: "confirmed",
  confirmed: "delivered",
  delivered: null,
};

const fetchOrders = async (): Promise<Order[]> => {
  const res = await fetch("/api/orders");
  if (!res.ok) throw new Error("Falha ao buscar pedidos");
  const data = await res.json();
  return data.orders;
};

const updateOrderStatus = async ({ id, status }: { id: string; status: string }) => {
  const res = await fetch(`/api/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Falha ao atualizar pedido");
  return res.json();
};

export default function OrdersPage() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading, isError } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const mutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      toast.success("Status atualizado!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("Erro ao atualizar status"),
  });

  const handleAdvanceStatus = (order: Order) => {
    const next = NEXT_STATUS[order.status];
    if (next) mutation.mutate({ id: order.id, status: next });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Pedidos</h1>
        <p className="text-gray-500 text-sm mt-1">{orders?.length ?? 0} pedidos no total</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500">Erro ao carregar pedidos.</p>
      ) : orders?.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Nenhum pedido recebido ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold text-gray-900">{order.customerName}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                      {STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{order.address}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.total)}
                  </p>
                  {NEXT_STATUS[order.status] && (
                    <button
                      onClick={() => handleAdvanceStatus(order)}
                      disabled={mutation.isPending}
                      className="mt-2 text-sm bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors"
                    >
                      {order.status === "pending" ? "Confirmar" : "Marcar Entregue"}
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50">
                <p className="text-xs text-gray-400 font-medium mb-1">Itens:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span key={item.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                      {item.name} × {item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
