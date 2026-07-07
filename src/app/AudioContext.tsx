'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (v: number) => void;
  metadata: { title: string; artist: string };
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const cleanMetadata = (text: string) => {
  if (!text) return '';
  return text
    .replace(/&APOS;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&QUOT;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&AMP;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&LT;/g, '<')
    .replace(/&lt;/g, '<')
    .replace(/&GT;/g, '>')
    .replace(/&gt;/g, '>')
    .trim();
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [metadata, setMetadata] = useState({ title: 'Caricamento...', artist: 'RCS Radio' });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://stream.rcsradio.it/stream');
    audioRef.current.preload = 'none';
    
    const fetchMetadata = async () => {
      try {
        const res = await fetch('https://stream.rcsradio.it/status-json.xsl');
        const data = await res.json();
        const source = data.icestats.source[0] || data.icestats.source;
        if (source && source.title) {
          const [artist, ...titleParts] = source.title.split(' - ');
          setMetadata({
            artist: cleanMetadata(artist || 'RCS Radio'),
            title: cleanMetadata(titleParts.join(' - ') || 'Diretta Streaming')
          });
        }
      } catch (e) {
        console.error("Metadata fetch error", e);
      }
    };

    fetchMetadata();
    const interval = setInterval(fetchMetadata, 10000);
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
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, volume, setVolume, metadata }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
