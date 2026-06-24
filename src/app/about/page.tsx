import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { History, Target, Users } from 'lucide-react';

export default function AboutPage() {
  const hero = PlaceHolderImages.find(img => img.id === 'about-hero');

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-6 py-12 space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Chi Siamo</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Radio RCS Sicilia è una storica emittente radiofonica locale siciliana che, oggi grazie allo streaming presente nel proprio sito ufficiale, è diventata un'emittente radiofonica molto ascoltata sia a livello Nazionale che Internazionale.
        </p>
      </div>

      <div className="relative w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-card">
        {hero && (
          <Image
            src={hero.imageUrl}
            alt={hero.description}
            fill
            className="object-cover"
            data-ai-hint={hero.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
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
    </div>
  );
}
