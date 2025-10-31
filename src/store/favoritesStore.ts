import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type FavoritesState = {
  favoriteIds: Set<string>;
  toggleFavorite: (productId: string) => void;
};

// A configuração de persistência, agora mais explícita
const persistOptions: PersistOptions<FavoritesState> = {
  name: 'favorites-storage',
  storage: {
    getItem: (name) => {
      const str = localStorage.getItem(name);
      if (!str) return null;
      const { state } = JSON.parse(str);
      return {
        state: {
          ...state,
          favoriteIds: new Set(state.favoriteIds),
        },
        version: 0, // Adicionando a versão para conformidade
      };
    },
    setItem: (name, newValue) => {
      // Convertendo o Set para um Array para salvar
      const str = JSON.stringify({
        state: {
          ...newValue.state,
          favoriteIds: Array.from(newValue.state.favoriteIds),
        },
      });
      localStorage.setItem(name, str);
    },
    removeItem: (name) => localStorage.removeItem(name),
  },
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteIds: new Set(),
      toggleFavorite: (productId) =>
        set((state) => {
          const newFavoriteIds = new Set(state.favoriteIds);
          if (newFavoriteIds.has(productId)) {
            newFavoriteIds.delete(productId);
          } else {
            newFavoriteIds.add(productId);
          }
          return { favoriteIds: newFavoriteIds };
        }),
    }),
    persistOptions
  )
);