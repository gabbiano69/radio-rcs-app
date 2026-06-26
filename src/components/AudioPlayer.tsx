
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
      // Prova con il plugin nativo di Capacitor
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
      // Fallback 1: navigator.share standard
      if (navigator.share) {
        navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        }).catch(() => {
          // Fallback 2: Copia negli appunti
          copyToClipboard(shareUrl);
        });
      } else {
        // Fallback 2: Copia negli appunti
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
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-2">
      {/* Sezione Logo - Margine superiore a 0 */}
      <div className="relative flex flex-col items-center mt-0">
        <div 
          className={cn(
            "relative w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.15)] transition-all duration-700 flex items-center justify-center border-[3px]",
            isPlaying ? "scale-105 border-primary/40" : "scale-100 border-white/5"
          )} 
          style={{ backgroundColor: '#000000' }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
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
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Titolo Slogan */}
      <div className="text-center space-y-2">
        <h2 className="text-[14px] sm:text-[18px] font-black tracking-[0.2em] text-white italic">
          #LaRadioOltreConfine
        </h2>

        <div className="flex items-center justify-center gap-4">
          <Badge 
            variant="outline" 
            className={cn(
              "px-6 py-1.5 uppercase tracking-widest text-[11px] sm:text-[14px] font-black transition-all duration-500",
              isPlaying 
                ? "border-primary bg-primary/20 text-primary animate-pulse" 
                : "border-white/10 text-white/20"
            )}
          >
            {isPlaying ? "ON AIR" : "OFFLINE"}
          </Badge>
          <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full w-8 h-8 text-muted-foreground/60 hover:text-primary bg-white/5 border border-white/5">
            <Share2 size={16} />
          </Button>
        </div>
      </div>

      {/* Sezione Brano in onda - Immagine più grande */}
      <div className="w-full flex flex-col items-center justify-center min-h-[180px]">
        {isPlaying ? (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="mb-3 relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-4 ring-primary/5">
              <Image 
                src={nowPlaying.coverUrl || '/logo-rcs.jpg'} 
                alt="Locandina"
                fill
                className="object-cover"
              />
            </div>
            
            <p className="text-primary font-black text-lg sm:text-2xl leading-tight uppercase italic line-clamp-1 px-4 drop-shadow-2xl tracking-tighter text-center">
              {nowPlaying.title}
            </p>
            {nowPlaying.artist && (
              <p className="text-muted-foreground/80 font-bold text-sm sm:text-base flex items-center gap-2 mt-1">
                <Music size={14} className="text-primary/40" /> {nowPlaying.artist}
              </p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground/20 font-medium text-[10px] italic tracking-[0.3em] uppercase">
            Pronto all'ascolto...
          </p>
        )}
      </div>

      {/* Pannello Controlli - Margine mt-12 per scenderlo un po' */}
      <div className="mt-12 mb-6 glass-morphism rounded-[2rem] p-4 w-full max-w-[280px] space-y-4 border-white/5 shadow-2xl">
        <div className="flex items-center justify-center gap-6">
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 rounded-full border border-white/5 text-muted-foreground/40 hover:text-destructive transition-colors"
            onClick={stop}
          >
            <Square className="w-3 h-3 fill-current" />
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

          <div className="w-8 h-8 flex items-center justify-center">
             {isPlaying && <Activity size={18} className="text-primary animate-pulse opacity-50" />}
          </div>
        </div>

        <div className="flex items-center gap-3 max-w-[130px] mx-auto opacity-70">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="text-muted-foreground hover:text-primary w-6 h-6 shrink-0"
          >
            {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
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
