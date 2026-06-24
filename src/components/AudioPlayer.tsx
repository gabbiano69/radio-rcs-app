
"use client"

import React from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Share2, Activity, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';

export function AudioPlayer() {
  const { 
    isPlaying, 
    isLoading, 
    volume, 
    isMuted, 
    nowPlaying, 
    togglePlay, 
    stop, 
    setVolume, 
    setIsMuted 
  } = useAudio();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Radio RCS Sicilia',
        text: isPlaying ? `Sto ascoltando ${nowPlaying.title} su Radio RCS Sicilia!` : 'Ascolta Radio RCS Sicilia!',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-2 p-2">
      <div className="relative flex flex-col items-center">
        {isPlaying && (
          <div className="absolute -top-10 flex items-end gap-1 h-8">
            <div className="visualizer-bar w-1" />
            <div className="visualizer-bar w-1" style={{ animationDelay: '0.2s' }} />
            <div className="visualizer-bar w-1" style={{ animationDelay: '0.4s' }} />
            <div className="visualizer-bar w-1" style={{ animationDelay: '0.1s' }} />
            <div className="visualizer-bar w-1" style={{ animationDelay: '0.3s' }} />
          </div>
        )}

        <div 
          className={cn(
            "relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-[0_0_60px_rgba(225,29,72,0.15)] transition-all duration-700 flex items-center justify-center border-[4px]",
            isPlaying ? "scale-105 border-primary/30" : "scale-100 border-white/5"
          )} 
          style={{ backgroundColor: '#000000' }}
        >
          <div className="relative w-full h-full flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
            <Image
              src="/logo-rcs.jpg"
              alt="Radio RCS Logo"
              width={400}
              height={400}
              className={cn(
                "object-contain transition-transform ease-in-out",
                isPlaying ? "scale-110 duration-700" : "scale-100 duration-500"
              )}
              priority
            />
          </div>
          {isLoading && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm rounded-full">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-2 pt-4">
        <h2 className="text-[14px] font-black tracking-[0.4em] text-white/70 uppercase italic">
          Radio RCS Sicilia
        </h2>

        <div className="flex items-center justify-center gap-6 pt-1">
          <Badge variant="outline" className="border-primary/50 text-primary px-8 py-3 uppercase tracking-widest text-[16px] font-black bg-primary/10">
            {isPlaying ? "ON AIR" : "OFFLINE"}
          </Badge>
          <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full w-14 h-14 text-muted-foreground/60 hover:text-primary bg-white/5 border border-white/5 shadow-lg">
            <Share2 size={28} />
          </Button>
        </div>

        <div className="space-y-0.5 pt-4">
          <div className="min-h-[70px] flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-2 duration-700">
            {isPlaying ? (
              <>
                <p className="text-primary font-black text-2xl sm:text-4xl leading-tight uppercase italic line-clamp-2 px-4 drop-shadow-2xl tracking-tighter">
                  {nowPlaying.title}
                </p>
                {nowPlaying.artist && (
                  <p className="text-muted-foreground/80 font-bold text-lg sm:text-xl flex items-center gap-2 mt-1">
                    <Music size={18} className="text-primary/40" /> {nowPlaying.artist}
                  </p>
                )}
              </>
            ) : (
              <p className="text-muted-foreground/20 font-medium text-[13px] italic tracking-[0.3em] uppercase">
                Pronto all'ascolto...
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="glass-morphism rounded-[2.5rem] p-3 space-y-3 border-white/5 shadow-2xl max-w-sm mx-auto mt-2">
        <div className="flex items-center justify-center gap-6">
          <Button
            size="icon"
            variant="ghost"
            className="w-10 h-10 rounded-full border border-white/5 text-muted-foreground/40 hover:text-destructive transition-colors"
            onClick={stop}
          >
            <Square className="w-4 h-4 fill-current" />
          </Button>

          <Button
            size="icon"
            className={cn(
              "w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all active:scale-90 border-[4px] border-white/10",
              isPlaying ? "bg-white text-black" : "bg-primary text-white"
                )}
            onClick={togglePlay}
            disabled={isLoading}
          >
            {isPlaying ? <Pause size={28} className="fill-current" /> : <Play size={28} className="ml-1 fill-current" />}
          </Button>

          <div className="w-10 h-10 flex items-center justify-center">
             {isPlaying && <Activity size={22} className="text-primary animate-pulse opacity-50" />}
          </div>
        </div>

        <div className="flex items-center gap-4 max-w-[160px] mx-auto opacity-70">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="text-muted-foreground hover:text-primary w-8 h-8 shrink-0"
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
          <div className="flex-1">
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={(vals) => {
                setVolume(vals[0]);
                setIsMuted(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
