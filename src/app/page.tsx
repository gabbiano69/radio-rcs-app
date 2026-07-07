'use client';

import { useState, useEffect } from 'react';
import PlayerPage from './player/page';
import SitoWebPage from './sito-web/page';

/**
 * @fileOverview Home Page Dinamica.
 * Rileva se l'ambiente è App Android o Web (Aruba) tramite variabile d'ambiente.
 */
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const isApp = process.env.NEXT_PUBLIC_IS_APP === 'true';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  // Se è l'App Android, la Home è il Player.
  // Se è il Web (Aruba), la Home è il Sito Web completo.
  return isApp ? <PlayerPage /> : <SitoWebPage />;
}
