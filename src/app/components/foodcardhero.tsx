import { FoodCard } from "./foodcard"
import { foodList } from "../bd"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"


export function FoodCardHero() {
    return (

        <div className="w-md pb-24 px-8 flex flex-col justify-center" >

            <div className="p-5 mb-5 flex gap-3" >
                <div className="relative flex-1" >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input type="text" placeholder="Pesquise sua comida favorita" className="pl-10 bg-gray-50 border-gray-100 rounded-[20px] h-12 focus-visible:border-[#ED3237] focus-visible:ring-[#ED3237] focus-visible:ring-[1px] " />
                </div>
            </div>

            <div className="grid grid-cols-2 max-w-md gap-4" >
                {foodList.map((food) => (

                    <FoodCard key={food.id} food={food} />

                ))}
            </div>
        </div>
    )
}