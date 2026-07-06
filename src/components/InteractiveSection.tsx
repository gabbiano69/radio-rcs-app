
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Music, Clock, MessageSquare, User, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function InteractiveSection() {
  const { toast } = useToast();
  const [minDateTime, setMinDateTime] = useState('');
  
  // State per il modulo Messaggio
  const [contactData, setContactData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  // State per il modulo Dedica
  const [dedicationData, setDedicationData] = useState({
    name: '',
    song: '',
    message: '',
    dateTime: ''
  });

  useEffect(() => {
    const calculateMinDate = () => {
      const now = new Date();
      now.setHours(now.getHours() + 24);
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    setMinDateTime(calculateMinDate());
  }, []);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.message) {
      toast({
        title: "Campi mancanti",
        description: "Per favore, inserisci almeno il nome e il messaggio.",
        variant: "destructive",
      });
      return;
    }

    const subject = contactData.subject || "Messaggio Rapido da Sito Web";
    const body = `Nome: ${contactData.name}\n\nMessaggio:\n${contactData.message}`;
    
    window.location.href = `mailto:radiorcs@hotmail.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toast({
      title: "Messaggio in preparazione!",
      description: "Si aprirà il tuo client email per l'invio.",
    });
    setContactData({ name: '', subject: '', message: '' });
  };

  const handleSubmitDedication = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dedicationData.dateTime) {
      toast({
        title: "Campo mancante",
        description: "Per favore, seleziona quando vorresti ascoltare il brano.",
        variant: "destructive",
      });
      return;
    }

    const selectedDate = new Date(dedicationData.dateTime);
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
    const body = `Nome: ${dedicationData.name}\nBrano: ${dedicationData.song}\nData/Ora desiderata: ${formattedDate}\n\nMessaggio:\n${dedicationData.message}`;
    
    window.location.href = `mailto:radiorcs@hotmail.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toast({
      title: "Dedica in preparazione!",
      description: "Si aprirà il tuo client email per l'invio.",
    });
    setDedicationData({ name: '', song: '', message: '', dateTime: '' });
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">Area Interattiva</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Entra in contatto con noi: richiedi un brano o inviaci un messaggio diretto in redazione.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* MODULO MESSAGGIO RAPIDO (Ex Slogan Generator) */}
          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-slate-950 text-white relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32" />
            <CardHeader className="p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black tracking-widest uppercase mb-4">
                <MessageSquare size={14} /> Redazione
              </div>
              <CardTitle className="text-3xl font-black">Scrivici Ora</CardTitle>
              <CardDescription className="text-slate-400">
                Invia un messaggio veloce per domande, pubblicità o suggerimenti.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <form onSubmit={handleSubmitContact} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-white ml-1 flex items-center gap-2">
                    <User size={14} className="text-primary" /> Il tuo Nome
                  </label>
                  <Input 
                    placeholder="Mario Rossi" 
                    className="h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-primary"
                    value={contactData.name}
                    onChange={(e) => setContactData({...contactData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-white ml-1 flex items-center gap-2">
                    <Tag size={14} className="text-primary" /> Oggetto
                  </label>
                  <Input 
                    placeholder="Esempio: Info Pubblicità" 
                    className="h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-primary"
                    value={contactData.subject}
                    onChange={(e) => setContactData({...contactData, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-white ml-1">Il tuo Messaggio</label>
                  <Textarea 
                    placeholder="Scrivi qui cosa vuoi dirci..." 
                    className="min-h-[100px] bg-white/5 border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-primary"
                    value={contactData.message}
                    onChange={(e) => setContactData({...contactData, message: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold transition-all shadow-xl shadow-primary/20">
                  Invia Messaggio <Send size={20} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* MODULO DEDICA */}
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
                      value={dedicationData.name}
                      onChange={(e) => setDedicationData({...dedicationData, name: e.target.value})}
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
                      value={dedicationData.dateTime}
                      onChange={(e) => setDedicationData({...dedicationData, dateTime: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-900 ml-1">Titolo Canzone e Artista</label>
                  <Input 
                    placeholder="Esempio: Nel blu dipinto di blu - Modugno" 
                    className="h-12 bg-white border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400"
                    value={dedicationData.song}
                    onChange={(e) => setDedicationData({...dedicationData, song: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-900 ml-1">Il tuo Messaggio</label>
                  <Textarea 
                    placeholder="Scrivi qui la tua dedica..." 
                    className="min-h-[100px] bg-white border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400"
                    value={dedicationData.message}
                    onChange={(e) => setDedicationData({...dedicationData, message: e.target.value})}
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
