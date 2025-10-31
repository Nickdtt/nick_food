import { FoodDetailClient } from "./food-detail-client";

// A página do servidor agora só passa o ID para o componente do cliente
export default function FoodDetailPage({ params }: { params: { id: string } }) {
  return <FoodDetailClient id={params.id} />;
}
