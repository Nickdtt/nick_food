import Image from "next/image";
import { Heart } from "lucide-react";
import { Food } from "../types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FoodCard({ food }: { food: Food }) {
  const [isFavorite, setIsFavorite] = useState(food.favorite);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 transition-transform duration-300 ease-in-out hover:scale-105">
      <Link href={`/food/${food.id.toString()}`}>
        <div className="flex justify-center items-center mb-4">
          <Image
            src={food.imageUrl}
            alt={food.name}
            width={150}
            height={150}
            className="w-full h-32 object-contain"
          />
        </div>
        <h3 className="font-bold text-lg mb-1">{food.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {food.description}
        </p>
      </Link>
      <div className="flex items-center justify-between">
        <span className="text-yellow-500 font-bold text-lg">★ {food.rating}</span>
        <Button
          onClick={() => setIsFavorite(!isFavorite)}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-red-100"
        >
          <Heart
            className={`h-6 w-6 ${
              isFavorite ? "fill-[#ED3237] text-[#ED3237]" : "text-gray-400"
            } `}
          />
        </Button>
      </div>
    </div>
  );
}