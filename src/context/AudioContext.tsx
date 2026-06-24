
"use client"

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NowPlaying {
  artist: string;
  title: string;
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

const STREAM_URL = "http://sr10.inmystream.info:8049/stream";

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
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://sr10.inmystream.info:8049/7.html')}&_=${timestamp}`);
      const data = await response.json();
      
      if (data.contents) {
        const rawContent = data.contents;
        const parts = rawContent.split(',');
        
        if (parts.length >= 7) {
          const rawTitle = parts[6];
          const fullTitle = cleanMetadata(rawTitle);
          
          if (fullTitle) {
            const songInfo = fullTitle.split(' - ');
            if (songInfo.length >= 2) {
              setNowPlaying({
                artist: songInfo[0].trim(),
                title: songInfo[1].trim()
              });
            } else {
              setNowPlaying({
                artist: 'Radio RCS Sicilia',
                title: fullTitle
              });
            }
          }
        }
      }
    } catch (error) {
      // Silenzioso
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
            
            if (window.location.protocol === 'https:' && STREAM_URL.startsWith('http:')) {
              toast({
                title: "Contenuto bloccato",
                description: "Per ascoltare la radio in HTTPS, devi consentire i 'contenuti non sicuri' nelle impostazioni del browser.",
                variant: "destructive",
                duration: 8000,
              });
            }
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
