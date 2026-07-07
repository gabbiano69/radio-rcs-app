'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (v: number) => void;
  metadata: { title: string; artist: string };
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const STREAM_URL = 'https://stream.rcsradio.it/rcsradio';

function cleanMetadata(text: string) {
  if (!text) return '';
  return text
    .replace(/&APOS;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim();
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [metadata, setMetadata] = useState({ title: 'Caricamento...', artist: 'RCS Radio' });
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    audioRef.current = new Audio(STREAM_URL);
    
    const fetchMetadata = async () => {
      try {
        const res = await fetch('https://stream.rcsradio.it/status-json.xsl');
        const data = await res.json();
        const source = data.icestats.source.find((s: any) => s.mount === '/rcsradio');
        if (source && source.title) {
          const parts = source.title.split(' - ');
          setMetadata({
            artist: cleanMetadata(parts[0] || 'RCS Radio'),
            title: cleanMetadata(parts[1] || 'La Radio che si sente'),
          });
        }
      } catch (e) {
        console.error('Metadata error', e);
      }
    };

    const interval = setInterval(fetchMetadata, 10000);
    fetchMetadata();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.src = ""; // Stop stream download
    } else {
      audioRef.current.src = STREAM_URL;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return <>{children}</>;

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, volume, setVolume, metadata }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
}
