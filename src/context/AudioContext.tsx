
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

  const getAbsoluteUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${path}`;
    }
    return path;
  };

  const cleanMetadata = (text: string) => {
    if (!text) return "";
    
    let cleaned = text;

    // Fix encoding: tenta di correggere gli errori di codifica comuni (ISO-8859-1 interpretato come UTF-8)
    try {
      // Il metodo escape + decodeURIComponent è una tecnica collaudata per risolvere il mojibake dei flussi Shoutcast
      cleaned = decodeURIComponent(escape(text));
    } catch (e) {
      // Se fallisce, usiamo il testo originale
      cleaned = text;
    }

    cleaned = cleaned
      .replace(/<\/?[^>]+(>|$)/g, "") 
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    
    // Rimuove numeri di traccia iniziali e residui di stili CSS/HTML
    cleaned = cleaned.replace(/^\d+\.\s*/, "");
    cleaned = cleaned.replace(/body,html\{.*?\}/gi, "").replace(/\{.*?\}/g, "");
    
    // Evita di mostrare il nome della radio se non c'è un brano reale
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
            
            setNowPlaying(prev => ({
              ...prev,
              artist: artist,
              title: title,
              coverUrl: prev.coverUrl 
            }));

            // Fetch cover da iTunes
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
      const artworkUrl = getAbsoluteUrl(nowPlaying.coverUrl || DEFAULT_LOGO);
      
      navigator.mediaSession.metadata = new MediaMetadata({
        title: nowPlaying.title || 'In ascolto...',
        artist: nowPlaying.artist || 'Radio RCS Sicilia',
        album: 'Radio RCS Sicilia - I Grandi Successi',
        artwork: [
          { src: artworkUrl, sizes: '96x96', type: 'image/png' },
          { src: artworkUrl, sizes: '128x128', type: 'image/png' },
          { src: artworkUrl, sizes: '192x192', type: 'image/png' },
          { src: artworkUrl, sizes: '256x256', type: 'image/png' },
          { src: artworkUrl, sizes: '384x384', type: 'image/png' },
          { src: artworkUrl, sizes: '512x512', type: 'image/png' },
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

      // Stato di riproduzione per Android
      if (isPlaying) {
        navigator.mediaSession.playbackState = 'playing';
      } else if (isLoading) {
        navigator.mediaSession.playbackState = 'none';
      } else {
        navigator.mediaSession.playbackState = 'paused';
      }
    }
  }, [nowPlaying, isPlaying, isLoading]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      fetchMetadata();
      interval = setInterval(fetchMetadata, 15000); 
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
    } else {
      setIsLoading(true);
      // Forza l'origine cross-origin per i metadati e la notifica
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.src = STREAM_URL;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
            fetchMetadata();
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
      audioRef.current.load();
      setIsPlaying(false);
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
      <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" />
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
