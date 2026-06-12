import { create } from 'zustand';

type FavoritesState = {
  favoriteIds: Set<string>;
  toggleFavorite: (productId: string) => void;
  hydrate: () => void;
};

const STORAGE_KEY = 'favorites-storage';

function readStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const ids: unknown = JSON.parse(raw);
    return new Set(Array.isArray(ids) ? (ids as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeStorage(ids: Set<string>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // silently fail
  }
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: new Set<string>(),

  hydrate: () => {
    set({ favoriteIds: readStorage() });
  },

  toggleFavorite: (productId: string) => {
    const next = new Set(get().favoriteIds);
    if (next.has(productId)) {
      next.delete(productId);
    } else {
      next.add(productId);
    }
    set({ favoriteIds: next });
    writeStorage(next);
  },
}));
