import Image from "next/image";
import { Heart } from "lucide-react";
import { FoodCardProps } from "../types";
import { useState } from "react";
import { Button } from "@/components/ui/button";





export function FoodCard({food}: FoodCardProps) {

    const [isFavorite, setIsFavorite] = useState(food.favorite);


    return (
    
            <div className="bg-white shadow-md rounded-2xl p-3" >
                <div className="flex justify-center items-center" >
                    <Image src={food.imageUrl} alt="hamburger" width={100} height={100} className="w-full h-28 object-contain mb-2" />
                </div>

                <h3 className="font-semibold text-sm" >{food.name}</h3>
                <p className="text-xs text-muted-foreground" >{food.description}</p>
                <div className="flex items-center justify-between mt-2" >
                    <span className="text-yellow-500 text-sm" >★ {food.rating}</span>
                    <Button onClick={() => setIsFavorite(!isFavorite)} variant="ghost" size="icon" className="h-8 w-8 rounded-full" >
                        <Heart className={`h-5 w-5 text-muted-foreground ${isFavorite ? "fill-[#ED3237] text-[#ED3237]" : "text-gray-400"} `} />
                    </Button>
                </div>
            </div>
       

    );
}