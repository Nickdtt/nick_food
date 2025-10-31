export interface Food {
   
    id: string; // Alterado de number para string
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    rating: number;
    favorite: boolean;
    bigDescription?: string;

};

// interface foodWithBigDescription  extends Food {
//    bigDescription: string;
// };

export interface FoodCardProps {
   food: Food;
};



// export interface FoodProps {
//    food: foodWithBigDescription;
// }
