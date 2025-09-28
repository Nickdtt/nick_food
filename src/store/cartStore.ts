

import { create } from 'zustand';
import { Food } from '@/app/types';

export type CartItem = Food & {
    quantity: number;
};

type CartState = {
    items: CartItem[];
    addItem: (food: Food, quantity: number) => void;
    removeItem: (foodId: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    increaseQuantity: (foodId: number) => void;
    decreaseQuantity: (foodId: number) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (food, quantity) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === food.id);

        if (existingItem) {
            set({
                items: items.map((item) =>
                    item.id === food.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                ),
            });
        } else {
            set({
                items: [...items, { ...food, quantity: quantity }],
            });
        }
    },
    removeItem: (foodId) => {
        set({
            items: get().items.filter((item) => item.id !== foodId)
        });
    },
    clearCart: () => {
        set({ items: [] });
    },
    totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },
    increaseQuantity: (foodId) => {
        set({
            items: get().items.map((item) =>
                item.id === foodId ? { ...item, quantity: item.quantity + 1 } : item
            )
        });
    },
    decreaseQuantity: (foodId) => {
        set({
            items: get().items
                .map((item) =>
                    item.id === foodId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        });
    }
}));