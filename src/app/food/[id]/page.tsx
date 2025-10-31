import { FoodDetailClient } from "./food-detail-client";

// Definir o tipo de Params como uma Promise, como o Next.js espera neste projeto
type FoodDetailPageParams = {
  params: Promise<{ id: string }>;
};

// A página do servidor agora só passa o ID para o componente do cliente
export default async function FoodDetailPage({ params }: FoodDetailPageParams) {
  const { id } = await params; // Aguardar a resolução da Promise
  return <FoodDetailClient id={id} />;
}