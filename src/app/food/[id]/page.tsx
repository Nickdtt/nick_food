import { foodList } from "@/app/bd";
import Image from "next/image";




const foodDetail = ({params}: {params: {id:string}}) => {

    const food = foodList.find((food) => food.id.toString() === params.id)

    return (
        <div className="w-md flex flex-col justify-center items-center" >
            <div className="mt-20" >
                <Image src={food!.imageUrl} alt={food!.name} width={350} height={350} />
            </div>
            <div>
                <h1 className="text-3xl font-bold font-serif" >{food!.name}</h1>
                <p className="text-sm text-muted-foreground" >{food!.bigDescription}</p>
            </div>
        </div>
    );
}

export default foodDetail;