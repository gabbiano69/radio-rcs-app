"use client"

import { AudioPlayer } from '@/components/AudioPlayer';
import { useState, useEffect } from 'react';
import SitoWebLandingPage from './sito-web/page';

/**
 * @fileOverview Home Page Dinamica.
 * Se l'app viene compilata come APP (Android), mostra il Player minimalista.
 * Se l'app viene compilata come WEB (Aruba), mostra la Landing Page completa.
 */
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  
  // Questa variabile viene iniettata durante il build da GitHub Actions
  const isApp = process.env.NEXT_PUBLIC_IS_APP === 'true';

  useEffect(() => {
    setMounted(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col bg-background items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Se siamo sul Web (Aruba), mostriamo la Landing Page completa come Home
  if (!isApp) {
    return <SitoWebLandingPage />;
  }

  // Se siamo nell'App Android, mostriamo il Player minimalista
  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden h-full">
      <section className="relative flex-1 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] player-gradient pointer-events-none opacity-60" />
        
        <div className="z-10 w-full max-w-4xl flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000">
          <AudioPlayer />
        </div>
      </section>

      <footer className="py-6 px-6 border-t border-white/5 text-center w-full bg-black/60 backdrop-blur-xl shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-1">
            <h2 className="text-[10px] font-black text-primary italic uppercase tracking-tighter">Radio RCS Sicilia</h2>
            <div className="flex flex-col items-center gap-1 text-[8px] text-muted-foreground/40 font-bold uppercase tracking-widest">
              <p>&copy; {currentYear} Radio RCS Sicilia - P.IVA 01389680859</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
