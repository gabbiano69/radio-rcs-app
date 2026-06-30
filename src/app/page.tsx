import { AudioPlayer } from '@/components/AudioPlayer';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-background min-h-[calc(100vh-64px)]">
      {/* SEZIONE HERO / PLAYER */}
      <section className="relative flex-1 flex flex-col items-center p-4 sm:p-6">
        {/* Sfondo con gradiente radiale */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] player-gradient pointer-events-none opacity-40" />
        
        <div className="z-10 w-full max-w-4xl flex-1 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
          <AudioPlayer />
        </div>
      </section>

      {/* FOOTER - Ora sempre visibile e compatto */}
      <footer className="py-4 px-6 border-t border-white/5 text-center text-muted-foreground text-[10px] w-full shrink-0">
        <p>&copy; {new Date().getFullYear()} Radio RCS Sicilia - I Grandi Successi.</p>
      </footer>
    </div>
  );
}
