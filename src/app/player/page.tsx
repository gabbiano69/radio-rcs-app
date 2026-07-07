'use client';

import { useState, useEffect } from 'react';
import { AudioPlayer } from '@/components/AudioPlayer';

/**
 * @fileOverview Pagina Player minimalista per l'App Android o sezione OnAir Web.
 */
export default function PlayerPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background pb-24 sm:pb-0 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <AudioPlayer />
      </div>
    </main>
  );
}
