import { AudioPlayer } from '@/components/AudioPlayer';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black min-h-[calc(100vh-64px)]">
      {/* Sfondo con gradiente radiale nero/rosso */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] player-gradient pointer-events-none opacity-40" />
      
      <div className="z-10 w-full max-w-4xl animate-in fade-in zoom-in duration-1000 flex flex-col items-center justify-center">
        <AudioPlayer />
      </div>
    </div>
  );
}
