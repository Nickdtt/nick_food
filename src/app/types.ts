export interface Food {
   
    id: number;
    name: string;
    description: string;
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
