
import { AudioPlayer } from '@/components/AudioPlayer';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-black">
      {/* SEZIONE HERO / PLAYER */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Sfondo con gradiente radiale nero/rosso */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] player-gradient pointer-events-none opacity-40" />
        
        <div className="z-10 w-full max-w-4xl animate-in fade-in zoom-in duration-1000 flex flex-col items-center justify-center">
          <AudioPlayer />
        </div>
        
        {/* Indicatore scorrimento rimosso per mantenere il focus sul player */}
      </section>

      {/* FOOTER SEMPLICE */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-muted-foreground text-xs">
        <p>&copy; {new Date().getFullYear()} Radio RCS Sicilia - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
