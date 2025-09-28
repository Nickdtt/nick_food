import { foodList } from "@/app/bd";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FoodDetailClient } from "./food-detail-client";

type Params = Promise<{ id: string }>;

const FoodDetail = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const food = foodList.find((food) => food.id.toString() === id);

  if (!food) {
    notFound();
  }

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
            <p className="text-lg text-gray-600">{food.bigDescription}</p>
          </div>
          <FoodDetailClient food={food} />
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;