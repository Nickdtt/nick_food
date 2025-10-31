/* eslint-disable @typescript-eslint/no-unused-vars */
import { Home, User, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBottom() {
    return (
        <nav className="fixed bottom-0 w-full max-w-screen-md mx-auto bg-red-500 text-white h-20 rounded-t-3xl flex justify-evenly items-center p-4 shadow-lg z-50" > {/* Ajustado para responsividade e centralização */}
            <Link href="/" className="text-white hover:bg-red-600 rounded-full h-12 w-12 flex items-center justify-center transition-colors duration-200">
                <Home className="h-7 w-7" />
            </Link>
            <Link href="#" className="text-white hover:bg-red-600 rounded-full h-12 w-12 flex items-center justify-center transition-colors duration-200">
                <User className="h-7 w-7" />
            </Link>
            <Link href="/favorites" className="text-white hover:bg-red-600 rounded-full h-12 w-12 flex items-center justify-center transition-colors duration-200">
                <Heart className="h-7 w-7" />
            </Link>
            <Link href="/cart" className="text-white hover:bg-red-600 rounded-full h-12 w-12 flex items-center justify-center transition-colors duration-200">
                <ShoppingCart className="h-7 w-7" />
            </Link>
        </nav>
    );
}