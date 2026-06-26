
"use client"

import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { History, Target, Users, Landmark } from 'lucide-react';

export default function AboutPage() {
  const hero = PlaceHolderImages.find(img => img.id === 'about-hero');
  const banner = PlaceHolderImages.find(img => img.id === 'about-banner');

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-6 py-12 space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Chi Siamo</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Radio RCS Sicilia è una storica emittente radiofonica locale siciliana che, oggi grazie allo streaming presente nel proprio sito ufficiale, è diventata un'emittente radiofonica molto ascoltata sia a livello Nazionale che Internazionale.
        </p>
      </div>

      {/* Banner Promozionale - IN ALTO */}
      <div className="space-y-6">
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-white/5">
          {banner && (
            <Image
              src={banner.imageUrl}
              alt={banner.description}
              fill
              className="object-cover"
              data-ai-hint="radio banner"
              priority
              onError={(e) => {
                (e.target as any).src = "https://picsum.photos/seed/rcs-banner/1200/400";
              }}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-morphism border-none">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto">
              <History size={24} />
            </div>
            <h3 className="font-bold text-xl">Territorio</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siamo radicati a Serradifalco, nel cuore della Sicilia, raccontando ogni giorno le eccellenze della nostra terra.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-none">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent flex items-center justify-center mx-auto">
              <Target size={24} />
            </div>
            <h3 className="font-bold text-xl">Globale</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Oltre i confini dell'isola: portiamo la musica e la cultura siciliana in tutto il mondo grazie al web.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-none">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto">
              <Users size={24} />
            </div>
            <h3 className="font-bold text-xl">Musica</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Solo i grandi successi, selezionati con cura per accompagnare ogni momento della tua giornata.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Panorama Sicilia - IN BASSO */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">La nostra Terra</h3>
        <div className="relative w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-card">
          {hero && (
            <Image
              src={hero.imageUrl}
              alt={hero.description}
              fill
              className="object-cover"
              data-ai-hint="sicily landscape"
              onError={(e) => {
                (e.target as any).src = "https://picsum.photos/seed/sicilia-panorama/1200/600";
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 text-white/70 text-sm font-medium italic">
            Meravigliosi panorami della nostra Sicilia.
          </div>
        </div>
      </div>

      {/* Note Legali e Licenze */}
      <div className="pt-12 mt-12 border-t border-white/10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground/60">
            <Landmark size={20} />
          </div>
          <div className="space-y-4 max-w-lg">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-primary italic">Radio RCS Sicilia</h2>
              <p className="text-lg font-medium">di Vancheri Salvatore</p>
            </div>
            
            <div className="space-y-4 text-sm text-muted-foreground font-medium tracking-wide">
              <p className="bg-white/5 py-1.5 px-4 rounded-lg inline-block text-foreground/80">
                P. IVA 01389680859
              </p>
              <div className="flex flex-col gap-2 justify-center pt-2">
                <span className="px-4 py-2 bg-primary/10 rounded-md border border-primary/20 text-primary-foreground/90">
                  Lic. SIAE 3824 del 15.01.2021
                </span>
                <span className="px-4 py-2 bg-primary/10 rounded-md border border-primary/20 text-primary-foreground/90">
                  Lic. SCF n° 1440/17
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
