import { AudioPlayer } from '@/components/AudioPlayer';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black">
      {/* Sfondo con gradiente radiale nero/rosso */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] player-gradient pointer-events-none opacity-40" />
      
      <div className="z-10 w-full max-w-4xl animate-in fade-in zoom-in duration-1000 flex flex-col items-center">
        <AudioPlayer />
        
        {/* Footer ravvicinato al player per un layout compatto */}
        <div className="mt-6 text-center space-y-1 opacity-30 group hover:opacity-100 transition-opacity duration-500">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Serradifalco • Sicilia • World</p>
          <p className="text-[11px] text-muted-foreground font-medium">
            La storica voce della Sicilia, ovunque tu sia.
          </p>
        </div>
      </div>
    </div>
  );
}
