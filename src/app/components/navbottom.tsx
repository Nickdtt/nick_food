'use client';

import { Home, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function NavBottom() {
    const pathname = usePathname();
    const totalItems = useCartStore((state) => state.totalItems());
    const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
    const favCount = favoriteIds.size;

    const linkClass = (href: string) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return `relative rounded-full size-12 flex items-center justify-center transition-colors duration-200 ${
            isActive
                ? "bg-white text-red-500"
                : "text-white hover:bg-red-600"
        }`;
    };

    return (
        <nav
            className="fixed bottom-0 w-full max-w-screen-md mx-auto bg-red-500 text-white rounded-t-3xl flex justify-evenly items-center px-4 pt-4 shadow-lg z-50"
            style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        >
            <Link href="/" aria-label="Início" aria-current={pathname === "/" ? "page" : undefined} className={linkClass("/")}>
                <Home className="size-7" />
            </Link>
            <Link href="/favorites" aria-label={`Favoritos${favCount > 0 ? ` (${favCount})` : ""}`} aria-current={pathname.startsWith("/favorites") ? "page" : undefined} className={linkClass("/favorites")}>
                <Heart className="size-7" />
                {favCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-red-500 text-[10px] font-bold tabular-nums rounded-full size-5 flex items-center justify-center border border-red-200">
                        {favCount > 99 ? "99+" : favCount}
                    </span>
                )}
            </Link>
            <Link href="/cart" aria-label={`Carrinho${totalItems > 0 ? ` (${totalItems})` : ""}`} aria-current={pathname.startsWith("/cart") ? "page" : undefined} className={linkClass("/cart")}>
                <ShoppingCart className="size-7" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-red-500 text-[10px] font-bold tabular-nums rounded-full size-5 flex items-center justify-center border border-red-200">
                        {totalItems > 99 ? "99+" : totalItems}
                    </span>
                )}
            </Link>
        </nav>
    );
}
