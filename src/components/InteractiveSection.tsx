
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, Music, Wand2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SLOGANS = [
  "Radio RCS Sicilia: La musica che accorcia le distanze.",
  "Oltre ogni confine, nel cuore della tua terra.",
  "I Grandi Successi passano tutti da qui.",
  "Sintonizzati sul ritmo della Sicilia.",
  "Radio RCS: La tua voce, la nostra passione.",
  "Il meglio della musica italiana e mondiale, 24 ore su 24.",
  "Radio RCS Sicilia: La Radio del Cuore.",
  "La colonna sonora ufficiale della tua giornata."
];

export function InteractiveSection() {
  const { toast } = useToast();
  const [currentSlogan, setCurrentSlogan] = useState(SLOGANS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [minDateTime, setMinDateTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    song: '',
    message: '',
    dateTime: ''
  });

  // Gestione data minima (ora attuale + 24 ore) per evitare errori di idratazione
  useEffect(() => {
    const calculateMinDate = () => {
      const now = new Date();
      now.setHours(now.getHours() + 24);
      // Format YYYY-MM-DDTHH:mm richiesto da input datetime-local
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    setMinDateTime(calculateMinDate());
  }, []);

  const generateSlogan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * SLOGANS.length);
      setCurrentSlogan(SLOGANS[randomIndex]);
      setIsGenerating(false);
    }, 600);
  };

  const handleSubmitDedication = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.dateTime) {
      toast({
        title: "Campo mancante",
        description: "Per favore, seleziona quando vorresti ascoltare il brano.",
        variant: "destructive",
      });
      return;
    }

    const selectedDate = new Date(formData.dateTime);
    const now = new Date();
    const limitDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    if (selectedDate < limitDate) {
      toast({
        title: "Orario non valido",
        description: "Le dediche devono essere programmate con almeno 24 ore di anticipo.",
        variant: "destructive",
      });
      return;
    }

    const formattedDate = selectedDate.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const subject = "Nuova Dedica da Sito Web";
    const body = `Nome: ${formData.name}\nBrano: ${formData.song}\nData/Ora desiderata: ${formattedDate}\n\nMessaggio:\n${formData.message}`;
    
    window.location.href = `mailto:radiorcs@hotmail.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toast({
      title: "Dedica in preparazione!",
      description: "Si aprirà il tuo client email per l'invio.",
    });
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">Area Interattiva</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Richiedi la tua musica preferita o scopri nuovi modi per descrivere la tua radio con il nostro assistente creativo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* GENERATORE SLOGAN AI */}
          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-slate-950 text-white relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32" />
            <CardHeader className="p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black tracking-widest uppercase mb-4">
                <Sparkles size={14} /> AI Creative Assistant
              </div>
              <CardTitle className="text-3xl font-black">Slogan Generator</CardTitle>
              <CardDescription className="text-slate-400">
                Lasciati ispirare dalla nostra intelligenza artificiale per creare il claim perfetto.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="min-h-[120px] flex items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 italic text-xl text-center font-medium leading-relaxed">
                "{currentSlogan}"
              </div>
              <Button 
                onClick={generateSlogan} 
                disabled={isGenerating}
                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold transition-all"
              >
                {isGenerating ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Genera Nuovo Slogan <Wand2 size={20} className="ml-2" /></>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* MODULO DEDICHE */}
          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-slate-50 border border-slate-100">
            <CardHeader className="p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/5 text-slate-950 text-[10px] font-black tracking-widest uppercase mb-4">
                <Music size={14} /> On Air Requests
              </div>
              <CardTitle className="text-3xl font-black text-slate-950">Invia una Dedica</CardTitle>
              <CardDescription className="text-slate-600 font-medium">
                Vuoi ascoltare un brano particolare? Scrivici e lo passeremo in onda per te!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <form onSubmit={handleSubmitDedication} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-900 ml-1">Il tuo Nome</label>
                    <Input 
                      placeholder="Esempio: Mario Rossi" 
                      className="h-12 bg-white border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-900 ml-1 flex items-center gap-1">
                      <Clock size={14} className="text-primary" /> Quando? (min +24h)
                    </label>
                    <Input 
                      type="datetime-local"
                      min={minDateTime}
                      className="h-12 bg-white border-slate-300 rounded-xl text-slate-900"
                      value={formData.dateTime}
                      onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-900 ml-1">Titolo Canzone e Artista</label>
                  <Input 
                    placeholder="Esempio: Nel blu dipinto di blu - Modugno" 
                    className="h-12 bg-white border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400"
                    value={formData.song}
                    onChange={(e) => setFormData({...formData, song: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-900 ml-1">Il tuo Messaggio</label>
                  <Textarea 
                    placeholder="Scrivi qui la tua dedica..." 
                    className="min-h-[100px] bg-white border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-14 rounded-2xl bg-slate-950 hover:bg-slate-900 text-lg font-bold shadow-xl">
                  Invia Richiesta <Send size={20} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
