"use client"

import { useState } from 'react';
import { generateRadioSlogan } from '@/ai/flows/generate-radio-slogan';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SloganGeneratorPage() {
  const [genre, setGenre] = useState('');
  const [slogans, setSlogans] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genre.trim()) return;

    setIsLoading(true);
    try {
      const result = await generateRadioSlogan({ genre });
      setSlogans(result.slogans);
    } catch (error) {
      console.error("Slogan generation error:", error);
      toast({
        title: "Errore",
        description: "Non è stato possibile generare gli slogan. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
          <Sparkles size={14} /> POTENZIATO DA AI
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Slogan Generator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Crea lo slogan perfetto per i tuoi spot o social con l'intelligenza artificiale.
        </p>
      </div>

      <Card className="glass-morphism border-none overflow-hidden shadow-2xl">
        <CardHeader className="bg-primary/5 border-b border-white/5">
          <CardTitle>Cosa vuoi promuovere?</CardTitle>
          <CardDescription>Inserisci un tema (es. Successi Estivi, Tradizione Siciliana, Rock 80s).</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
            <Input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Esempio: Grandi successi italiani..."
              className="h-12 bg-white/5 border-white/10 text-lg"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="h-12 px-8 font-bold text-lg bg-primary hover:bg-primary/90"
              disabled={isLoading || !genre.trim()}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Genera Slogan'}
            </Button>
          </form>

          {slogans.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <h3 className="font-bold text-lg text-muted-foreground uppercase tracking-wider">Idee per Radio RCS:</h3>
              <div className="grid gap-3">
                {slogans.map((slogan, index) => (
                  <div 
                    key={index}
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <p className="text-lg font-medium">{slogan}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(slogan, index)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {copiedIndex === index ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
