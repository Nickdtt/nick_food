'use client';

import { useEffect } from 'react';
import { useFavoritesStore } from '@/store/favoritesStore';

// Este componente roda APENAS no cliente (importado via dynamic com ssr:false no layout)
export function HydrateStores() {
  const hydrate = useFavoritesStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
