
"use client"

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NowPlaying {
  artist: string;
  title: string;
  coverUrl?: string;
}

interface AudioContextType {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  nowPlaying: NowPlaying;
  togglePlay: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
  setIsMuted: (m: boolean) => void;
  fetchMetadata: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// URL HTTPS ufficiale fornito dall'amministratore
const STREAM_URL = "https://sr10.inmystream.it/proxy/radiorcs?mp=/stream";

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ artist: '', title: 'Pronto all\'ascolto...' });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const cleanMetadata = (text: string) => {
    if (!text) return "";
    let cleaned = text
      .replace(/<\/?[^>]+(>|$)/g, "") 
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    
    cleaned = cleaned.replace(/body,html\{.*?\}/gi, "").replace(/\{.*?\}/g, "");
    if (cleaned.toLowerCase().includes("radio rcs sicilia")) return "";
    return cleaned;
  };

  const fetchMetadata = async () => {
    try {
      const timestamp = new Date().getTime();
      // Cerchiamo i metadati usando lo stesso server proxy HTTPS per massima compatibilità
      const metadataUrl = "https://sr10.inmystream.it/proxy/radiorcs?mp=/7.html";
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(metadataUrl)}&_=${timestamp}`);
      const data = await response.json();
      
      if (data.contents) {
        const rawContent = data.contents;
        const parts = rawContent.split(',');
        
        if (parts.length >= 7) {
          const rawTitle = parts[6];
          const fullTitle = cleanMetadata(rawTitle);
          
          if (fullTitle) {
            const songInfo = fullTitle.split(' - ');
            const artist = songInfo.length >= 2 ? songInfo[0].trim() : 'Radio RCS Sicilia';
            const title = songInfo.length >= 2 ? songInfo[1].trim() : fullTitle;
            
            const coverUrl = `https://picsum.photos/seed/${encodeURIComponent(fullTitle)}/400/400`;
            
            setNowPlaying({
              artist,
              title,
              coverUrl
            });
          }
        }
      }
    } catch (error) {
      // Errore silenzioso: l'utente non viene disturbato se il server metadati è lento
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      fetchMetadata();
      interval = setInterval(fetchMetadata, 10000); 
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.src = ""; 
      audioRef.current.load();
      setIsPlaying(false);
      setNowPlaying({ artist: '', title: 'Pronto all\'ascolto...' });
    } else {
      setIsLoading(true);
      fetchMetadata();
      
      audioRef.current.src = STREAM_URL;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Playback error:", error);
            setIsLoading(false);
            setIsPlaying(false);
            
            toast({
              title: "Errore di connessione",
              description: "Impossibile avviare lo streaming. Assicurati di essere connesso a Internet.",
              variant: "destructive",
            });
          });
      }
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      setIsPlaying(false);
      setNowPlaying({ artist: '', title: 'In pausa...' });
    }
  };

  return (
    <AudioContext.Provider value={{ 
      isPlaying, 
      isLoading, 
      volume, 
      isMuted, 
      nowPlaying, 
      togglePlay, 
      stop, 
      setVolume, 
      setIsMuted,
      fetchMetadata
    }}>
      {children}
      <audio ref={audioRef} preload="none" crossOrigin="anonymous" />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
