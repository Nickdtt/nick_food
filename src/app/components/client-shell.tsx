'use client';

import dynamic from 'next/dynamic';

const HydrateStores = dynamic(
  () => import('./hydrate-stores').then((m) => m.HydrateStores),
  { ssr: false }
);

const NavBottomWrapper = dynamic(
  () => import('./navbottom-wrapper'),
  { ssr: false }
);

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HydrateStores />
      {children}
      <NavBottomWrapper />
    </>
  );
}
