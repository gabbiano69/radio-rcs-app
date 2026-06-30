
"use client"

import React from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Share2, Activity, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import { useToast } from '@/hooks/use-toast';
import { Share } from '@capacitor/share';

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
  const { toast } = useToast();

  const handleShare = async () => {
    const shareTitle = 'Radio RCS Sicilia - I Grandi Successi';
    const shareText = isPlaying 
      ? `📻 Sto ascoltando "${nowPlaying.title} ${nowPlaying.artist ? 'di ' + nowPlaying.artist : ''}" su Radio RCS Sicilia! Ascoltala anche tu:` 
      : '📻 Ascolta Radio RCS Sicilia - I Grandi Successi in streaming ovunque tu sia:';
    const shareUrl = 'https://www.rcsradio.it';

    try {
      const canShare = await Share.canShare();
      if (canShare.value) {
        await Share.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
          dialogTitle: 'Condividi Radio RCS',
        });
      } else {
        throw new Error('Native share not available');
      }
    } catch (err) {
      if (navigator.share) {
        navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        }).catch(() => {
          copyToClipboard(shareUrl);
        });
      } else {
        copyToClipboard(shareUrl);
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link copiato!",
        description: "Il link al sito è stato copiato negli appunti.",
      });
    } catch (err) {
      toast({
        title: "Errore",
        description: "Non è stato possibile copiare il link.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-between py-2 gap-4">
      {/* LOGO STAZIONE - Ancorato in alto */}
      <div className="relative flex flex-col items-center w-full shrink-0">
        <div 
          className={cn(
            "relative w-[40vw] h-[40vw] max-w-[180px] max-h-[180px] sm:max-w-[200px] sm:max-h-[200px] md:max-w-[220px] md:max-h-[220px] transition-all duration-700 flex items-center justify-center bg-transparent",
            isPlaying ? "scale-105" : "scale-100"
          )} 
        >
          <Image
            src="/logo-rcs.jpg"
            alt="Radio RCS Logo"
            width={400}
            height={400}
            className={cn(
              "object-contain w-full h-full transition-transform ease-in-out",
              isPlaying ? "scale-110 duration-700" : "scale-100 duration-500"
            )}
            priority
          />
          {isLoading && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm rounded-full">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* SLOGAN E BADGE - Compatti */}
      <div className="text-center space-y-2 w-full shrink-0 mt-[-10px]">
        <h2 className="text-[10px] sm:text-sm font-black tracking-[0.2em] text-white italic uppercase drop-shadow-lg opacity-80">
          #LaRadioOltreConfine
        </h2>

        <div className="flex items-center justify-center gap-3">
          <Badge 
            variant="outline" 
            className={cn(
              "px-3 py-0.5 text-[9px] sm:text-[10px] font-black transition-all duration-500",
              isPlaying 
                ? "border-primary bg-primary/20 text-primary animate-pulse" 
                : "border-white/10 text-white/20"
            )}
          >
            {isPlaying ? "ON AIR" : "OFFLINE"}
          </Badge>
          <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full w-8 h-8 text-muted-foreground/60 hover:text-primary bg-white/5 border border-white/10">
            <Share2 size={14} />
          </Button>
        </div>
      </div>

      {/* SEZIONE BRANO IN ONDA - Estremamente flessibile e responsiva */}
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[180px] max-h-[45vh] py-4">
        {isPlaying ? (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 w-full px-4">
            <div className="mb-4 relative w-[45vw] h-[45vw] max-w-[160px] max-h-[160px] sm:max-w-[220px] sm:max-h-[220px] md:max-w-[280px] md:max-h-[280px] aspect-square overflow-hidden bg-transparent shrink-0">
              <Image 
                src={nowPlaying.coverUrl || '/logo-rcs.jpg'} 
                alt="Cover"
                fill
                className={cn(
                  "transition-all duration-500",
                  nowPlaying.coverUrl ? "object-cover rounded-2xl shadow-2xl" : "object-contain p-2"
                )}
              />
            </div>
            
            <div className="space-y-1 text-center max-w-2xl mx-auto">
              <p className="text-primary font-black text-base sm:text-xl md:text-2xl leading-tight uppercase italic drop-shadow-2xl tracking-tighter line-clamp-2">
                {nowPlaying.title}
              </p>
              {nowPlaying.artist && (
                <p className="text-muted-foreground font-bold text-[10px] sm:text-sm flex items-center justify-center gap-2">
                  <Music size={12} className="text-primary/60" /> {nowPlaying.artist}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-20">
             <Activity size={24} className="mb-1" />
             <p className="font-medium text-[9px] sm:text-xs italic tracking-[0.3em] uppercase text-center">
              Pronto all'ascolto...
            </p>
          </div>
        )}
      </div>

      {/* CONTROLLI - Ancorati in basso */}
      <div className="w-full max-w-[320px] sm:max-w-md lg:max-w-lg glass-morphism rounded-[2.5rem] p-4 sm:p-5 mb-1 border-white/10 shadow-2xl shrink-0">
        <div className="flex items-center justify-between gap-4 mb-4">
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
              "w-16 h-16 sm:w-18 sm:h-18 rounded-full shadow-2xl transition-all active:scale-95 border-[4px] border-white/10",
              isPlaying ? "bg-white text-black hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90"
            )}
            onClick={togglePlay}
            disabled={isLoading}
          >
            {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="ml-1.5 fill-current" />}
          </Button>

          <div className="w-10 h-10 flex items-center justify-center">
             {isPlaying && <Activity size={20} className="text-primary animate-pulse opacity-60" />}
          </div>
        </div>

        {/* VOLUME */}
        <div className="flex items-center gap-4 px-2">
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
