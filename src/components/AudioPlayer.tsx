"use client"

import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Share2, Activity, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
  const [mounted, setMounted] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    const shareTitle = 'Radio RCS Sicilia - I Grandi Successi';
    const songText = nowPlaying.artist 
      ? `"${nowPlaying.title}" di ${nowPlaying.artist}`
      : `"${nowPlaying.title}"`;
      
    const shareText = isPlaying 
      ? `📻 Sto ascoltando ${songText} su Radio RCS Sicilia! ✨\nAscoltala anche tu in streaming HD qui:` 
      : '📻 Ascolta Radio RCS Sicilia - I Grandi Successi in streaming ovunque tu sia:';
    
    const shareUrl = 'https://www.rcsradio.it';
    
    const fullMessage = nowPlaying.coverUrl 
      ? `${shareText}\n${shareUrl}\n\n🖼️ Artwork: ${nowPlaying.coverUrl}`
      : `${shareText}\n${shareUrl}`;

    try {
      const canShareResult = await Share.canShare();
      if (canShareResult.value) {
        await Share.share({
          title: shareTitle,
          text: isPlaying ? shareText : 'Ascolta Radio RCS Sicilia',
          url: shareUrl,
          dialogTitle: 'Condividi Radio RCS',
        });
        return;
      }
      
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: isPlaying ? shareText : 'Ascolta Radio RCS Sicilia',
          url: shareUrl,
        });
        return;
      }

      await copyToClipboard(fullMessage);
    } catch (err) {
      await copyToClipboard(fullMessage);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      toast({
        title: "Dettagli copiati!",
        description: "Informazioni brano e link copiati negli appunti.",
      });
    } catch (err) {
      toast({
        title: "Errore",
        description: "Impossibile copiare il link automaticamente.",
        variant: "destructive"
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-between py-2 gap-2 sm:gap-4 overflow-hidden">
      <div className="relative flex flex-col items-center w-full shrink-0">
        <div 
          className={cn(
            "relative w-[28vw] h-[28vw] max-w-[120px] max-h-[120px] transition-all duration-700 flex items-center justify-center bg-white rounded-full overflow-hidden border-2 border-white/10 shadow-xl",
            isPlaying ? "scale-105 shadow-[0_0_30px_rgba(239,68,68,0.3)]" : "scale-100"
          )} 
        >
          <Image
            src={`${basePath}/logo-rcs.png`}
            alt="Radio RCS Logo"
            fill
            className="object-contain p-1 rounded-full"
            priority
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] rounded-full">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-1 w-full shrink-0 mt-1">
        <h2 className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] text-white/40 italic uppercase">
          #LaRadioOltreConfine
        </h2>

        <div className="flex items-center justify-center gap-3">
          <Badge 
            variant="outline" 
            className={cn(
              "px-3 py-0.5 text-[8px] sm:text-[9px] font-black transition-all duration-500",
              isPlaying 
                ? "border-primary bg-primary/20 text-primary animate-pulse" 
                : "border-white/5 text-white/20"
            )}
          >
            {isPlaying ? "ON AIR" : "OFFLINE"}
          </Badge>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full w-6 h-6 text-white/40 hover:text-primary hover:bg-white/5 transition-all">
                  <Share2 size={12} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-primary text-white border-none text-[10px] font-bold">
                Condividi cosa stai ascoltando su Radio RCS!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[120px] py-1">
        {isPlaying ? (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 w-full px-4">
            <div className="mb-2 relative w-[32vw] h-[32vw] max-w-[130px] max-h-[130px] sm:max-w-[180px] sm:max-h-[180px] aspect-square shrink-0 overflow-hidden rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/5">
              {nowPlaying.coverUrl ? (
                <Image 
                  src={nowPlaying.coverUrl} 
                  alt="Cover"
                  fill
                  className="object-cover transition-all duration-500"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-black flex flex-col items-center justify-center gap-2">
                  <Music className={cn("text-primary/40", isPlaying && "animate-pulse")} size={40} />
                  <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">Live Stream</p>
                </div>
              )}
            </div>
            
            <div className="space-y-0.5 text-center max-w-2xl mx-auto">
              <p className="text-white font-black text-sm sm:text-xl leading-tight uppercase italic drop-shadow-md tracking-tighter line-clamp-2 px-2">
                {nowPlaying.title}
              </p>
              {nowPlaying.artist && (
                <p className="text-primary font-bold text-[9px] sm:text-sm flex items-center justify-center gap-1.5 uppercase tracking-wide">
                  <Music size={10} className="sm:size-3" /> {nowPlaying.artist}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-20">
             <Activity size={24} className="mb-1" />
             <p className="font-bold text-[8px] sm:text-[10px] italic tracking-[0.3em] uppercase">
              Pronto all'ascolto
            </p>
          </div>
        )}
      </div>

      <div className="w-full max-w-[280px] sm:max-w-[320px] glass-morphism rounded-[1.8rem] p-3 sm:p-4 mb-2 shrink-0">
        <div className="flex items-center justify-between gap-3 mb-3">
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 rounded-full text-white/20 hover:text-destructive hover:bg-white/5 transition-colors"
            onClick={stop}
          >
            <Square className="w-3 h-3 fill-current" />
          </Button>

          <Button
            size="icon"
            className={cn(
              "w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all active:scale-95 border-3 border-white/10",
              isPlaying ? "bg-white text-black hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90"
            )}
            onClick={togglePlay}
            disabled={isLoading}
          >
            {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="ml-1 fill-current" />}
          </Button>

          <div className="w-8 h-8 flex items-center justify-center">
             {isPlaying && <Activity size={16} className="text-primary animate-pulse opacity-40" />}
          </div>
        </div>

        <div className="flex items-center gap-3 px-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="text-white/60 hover:text-primary w-6 h-6 shrink-0"
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
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
