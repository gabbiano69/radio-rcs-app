"use client"

import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Construction } from 'lucide-react';

export default function SloganGeneratorPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
          <Sparkles size={14} /> PROSSIMAMENTE
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Slogan Generator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          L'intelligenza artificiale per i tuoi slogan radiofonici.
        </p>
      </div>

      <Card className="glass-morphism border-none overflow-hidden shadow-2xl">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
            <Construction size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Funzionalità Cloud</h3>
            <p className="text-muted-foreground">
              Questa funzione richiede un collegamento server attivo. Sarà disponibile nella versione Web ufficiale per garantire la massima velocità, mantenendo l'app leggera e veloce sul tuo dispositivo Android.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
