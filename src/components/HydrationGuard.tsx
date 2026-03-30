'use client';
import { useEffect, useState } from 'react';

export function HydrationGuard({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-rose border-t-transparent rounded-full animate-spin" />
          <span className="font-nohemi text-small text-neutral-soft-gray">Cargando...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
