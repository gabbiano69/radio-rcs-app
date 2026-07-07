"use client"

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NowPlaying {
  artist: string;
  title: string;
  coverUrl?: string | null;
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

const STREAM_URL = "https://sr10.inmystream.it/proxy/radiorcs?mp=/stream";

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ artist: '', title: 'Pronto all\'ascolto...', coverUrl: null });
  const [mounted, setMounted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTitleRef = useRef<string>("");
  const { toast } = useToast();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const DEFAULT_LOGO = `${basePath}/logo-rcs.png`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const cleanMetadata = (text: string) => {
    if (!text) return "";
    let cleaned = text;

    cleaned = cleaned
      .replace(/&N&APOS;/gi, "'")
      .replace(/&APOS;/gi, "'")
      .replace(/&AMP;/gi, "&")
      .replace(/&QUOT;/gi, '"')
      .replace(/&LT;/gi, '<')
      .replace(/&GT;/gi, '>')
      .replace(/&NBSP;/gi, ' ')
      .replace(/&RSQUO;/gi, "'")
      .replace(/&LSQUO;/gi, "'")
      .replace(/&#039;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&Agrave;/g, "À")
      .replace(/&Egrave;/g, "È")
      .replace(/&Igrave;/g, "Ì")
      .replace(/&Ograve;/g, "Ò")
      .replace(/&Ugrave;/g, "Ù")
      .replace(/&agrave;/g, "à")
      .replace(/&egrave;/g, "è")
      .replace(/&igrave;/g, "ì")
      .replace(/&ograve;/g, "ò")
      .replace(/&ugrave;/g, "ù");

    cleaned = cleaned
      .replace(/<\/?[^>]+(>|$)/g, "") 
      .replace(/\s+/g, " ")
      .trim();
    
    const filters = ["radio rcs", "sicilia", "grandi successi", "la radio del cuore", "in ascolto", "pubblicità"];
    const lowercaseCleaned = cleaned.toLowerCase();
    
    const isSlogan = (filters.some(f => lowercaseCleaned.includes(f)) && cleaned.length < 45) || cleaned.length < 3;
    if (isSlogan) return "Radio RCS Sicilia - I Grandi Successi";
    
    return cleaned;
  };

  const fetchMetadata = async () => {
    try {
      const timestamp = new Date().getTime();
      const metadataUrl = `https://sr10.inmystream.it/proxy/radiorcs?mp=/7.html&_=${timestamp}`;
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(metadataUrl)}`);
      const data = await response.json();
      const rawContent = data.contents;
      
      if (rawContent) {
        const parts = rawContent.split(',');
        if (parts.length >= 7) {
          const rawTitle = parts.slice(6).join(',');
          const fullTitle = cleanMetadata(rawTitle);
          
          if (fullTitle && fullTitle !== lastTitleRef.current) {
            lastTitleRef.current = fullTitle;
            const songInfo = fullTitle.split(' - ');
            const isGeneric = fullTitle.includes("Radio RCS Sicilia");
            
            const artist = songInfo.length >= 2 ? songInfo[0].trim() : (isGeneric ? "" : "Radio RCS Sicilia");
            const title = songInfo.length >= 2 ? songInfo[1].trim() : (isGeneric ? "I Grandi Successi" : songInfo[0].trim());
            
            setNowPlaying({ artist, title, coverUrl: null });

            if (!isGeneric && title !== "I Grandi Successi") {
              const searchTerm = encodeURIComponent(`${artist} ${title}`);
              fetch(`https://itunes.apple.com/search?term=${searchTerm}&limit=1&media=music`)
                .then(res => res.json())
                .then(itunesData => {
                  if (itunesData.results && itunesData.results.length > 0) {
                    const betterCover = itunesData.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
                    setNowPlaying(prev => ({ ...prev, coverUrl: betterCover }));
                  }
                })
                .catch(() => {});
            }
          }
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (mounted && 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: nowPlaying.title,
        artist: nowPlaying.artist || 'Radio RCS Sicilia',
        artwork: [{ src: nowPlaying.coverUrl || DEFAULT_LOGO, sizes: '512x512', type: 'image/png' }]
      });
    }
  }, [nowPlaying, mounted, DEFAULT_LOGO]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && mounted) {
      fetchMetadata();
      interval = setInterval(fetchMetadata, 15000); 
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPlaying, mounted]);

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
    } else {
      setIsLoading(true);
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.src = STREAM_URL;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => { setIsPlaying(true); setIsLoading(false); })
        .catch(() => {
          setIsLoading(false);
          toast({ title: "Errore", description: "Impossibile avviare lo streaming.", variant: "destructive" });
        });
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ 
      isPlaying, isLoading, volume, isMuted, nowPlaying, togglePlay, stop, setVolume, setIsMuted, fetchMetadata
    }}>
      {children}
      {mounted && (
        <audio 
          ref={audioRef} 
          preload="none" 
          crossOrigin="anonymous" 
          style={{ display: 'none' }}
        />
      )}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) throw new Error('useAudio must be used within an AudioProvider');
  return context;
}
