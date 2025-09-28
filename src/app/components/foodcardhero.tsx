import { FoodCard } from "./foodcard";
import { foodList } from "../bd";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NavTop } from "./navtop";

export function FoodCardHero() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NavTop />
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Pesquise sua comida favorita"
            className="w-full pl-12 pr-4 py-3 text-base bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[#ED3237] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foodList.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}