
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
const DEFAULT_LOGO = "/logo-rcs.png";

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ artist: '', title: 'Pronto all\'ascolto...', coverUrl: null });
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
    
    // Rimuove il prefisso numerico tipo "7. " che a volte invia lo streaming
    cleaned = cleaned.replace(/^\d+\.\s*/, "");
    
    // Rimuove stili CSS residui se presenti
    cleaned = cleaned.replace(/body,html\{.*?\}/gi, "").replace(/\{.*?\}/g, "");
    
    if (cleaned.toLowerCase().includes("radio rcs sicilia") && cleaned.length < 25) return "";
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
          
          if (fullTitle && fullTitle !== (nowPlaying.artist + " - " + nowPlaying.title)) {
            const songInfo = fullTitle.split(' - ');
            const artist = songInfo.length >= 2 ? songInfo[0].trim() : 'Radio RCS Sicilia';
            const title = songInfo.length >= 2 ? songInfo[1].trim() : songInfo[0].trim();
            
            // Inizialmente mettiamo coverUrl a null per non mostrare il logo duplicato
            setNowPlaying({
              artist: artist,
              title: title,
              coverUrl: null
            });

            const searchTerm = encodeURIComponent(`${artist} ${title}`);
            fetch(`https://itunes.apple.com/search?term=${searchTerm}&limit=1&media=music`)
              .then(res => res.json())
              .then(itunesData => {
                if (itunesData.results && itunesData.results.length > 0) {
                  const betterCover = itunesData.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
                  setNowPlaying(prev => ({ ...prev, coverUrl: betterCover }));
                }
              })
              .catch(() => { });
          }
        }
      }
    } catch (error) {
      console.warn("Metadata fetch failed");
    }
  };

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: nowPlaying.title || 'In ascolto...',
        artist: nowPlaying.artist || 'Radio RCS Sicilia',
        album: 'I Grandi Successi',
        artwork: [
          { src: nowPlaying.coverUrl || DEFAULT_LOGO, sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        if (!isPlaying) togglePlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (isPlaying) togglePlay();
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        stop();
      });
    }
  }, [nowPlaying, isPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      fetchMetadata();
      interval = setInterval(fetchMetadata, 10000); 
    } else {
      setNowPlaying({ artist: '', title: 'Pronto all\'ascolto...', coverUrl: null });
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
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    } else {
      setIsLoading(true);
      audioRef.current.src = STREAM_URL;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
            fetchMetadata();
            if ('mediaSession' in navigator) {
              navigator.mediaSession.playbackState = 'playing';
            }
          })
          .catch((error) => {
            console.error("Play error:", error);
            setIsLoading(false);
            setIsPlaying(false);
            toast({
              title: "Errore di connessione",
              description: "Impossibile avviare lo streaming.",
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
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
      }
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
