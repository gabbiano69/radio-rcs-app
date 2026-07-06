
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SloganGeneratorPage() {
  const router = useRouter();

  useEffect(() => {
    // Reindirizzamento alla home dato che la funzionalità è stata integrata nel sito principale
    router.replace('/');
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">Caricamento...</p>
      </div>
    </div>
  );
}
