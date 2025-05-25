/* eslint-disable @typescript-eslint/no-unused-vars */
import { Home, User, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function NavBottom() {
    return (
        <nav className="fixed bottom-0  bg-red-500 text-white h-20 rounded-t-3xl flex justify-around items-center w-105 " >
            <Link href="/" className="text-white hover:bg-red-600 rounded-full h-10 w-10 flex items-center justify-center">
                <Home className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-white hover:bg-red-600 rounded-full h-10 w-10 flex items-center justify-center">
                <User className="h-6 w-6" />
            </Link>
            <Link href="/favorites" className="text-white hover:bg-red-600 rounded-full h-10 w-10 flex items-center justify-center">
                <Heart className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="text-white hover:bg-red-600 rounded-full h-10 w-10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6" />
            </Link>
        </nav>
    );
}