
"use client"

import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Globe, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    { icon: Globe, label: 'Sito Web', value: 'www.rcsradio.it', href: 'https://www.rcsradio.it' },
    { icon: Mail, label: 'Email', value: 'radiorcs@hotmail.it', href: 'mailto:radiorcs@hotmail.it' },
    { icon: Phone, label: 'Telefono', value: '+39 333 862599 / 392 8627847', href: 'tel:+39333862599' },
    { icon: MapPin, label: 'Sede', value: 'via Sandro Pertini snc, 93010 Serradifalco (CL)', href: 'https://maps.google.com/?q=via+Sandro+Pertini+snc+93010+Serradifalco' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/RCS.radio' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/radio_rcs_sicilia/' },
    { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/channel/UCTlKWIycsPc7Wh5cPW03vOA' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campi mancanti",
        description: "Per favore, compila i campi obbligatori (Nome, Email, Messaggio).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const subject = formData.subject || 'Contatto da App Radio RCS';
    const body = `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMessaggio:\n${formData.message}`;
    const mailtoUrl = `mailto:radiorcs@hotmail.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      
      toast({
        title: "Invio in corso",
        description: "L'app di posta si aprirà tra un istante.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary">Contattaci</h1>
            <p className="text-xl text-muted-foreground">
              La voce dell'isola è sempre pronta ad ascoltarti. Scrivici per pubblicità, dediche o informazioni.
            </p>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info) => (
              <a key={info.label} href={info.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <info.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                  <p className="text-lg font-semibold">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 space-y-4">
            <p className="font-bold text-lg">Seguici sui Social</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-white/10 hover:bg-primary/20 hover:text-primary transition-all">
                    <social.icon size={20} />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>

        <Card className="glass-morphism border-none shadow-2xl">
          <CardHeader>
            <CardTitle>Inviaci un messaggio</CardTitle>
            <CardDescription>Ti risponderemo al più presto via email.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nome *</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Il tuo nome" 
                    className="bg-white/5 border-white/10" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email *</label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="latua@email.com" 
                    className="bg-white/5 border-white/10" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Oggetto</label>
                <Input 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Richiesta brano, pubblicità..." 
                  className="bg-white/5 border-white/10" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Messaggio *</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Scrivi qui il tuo messaggio..." 
                  className="min-h-[150px] bg-white/5 border-white/10" 
                  required
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} /> Prepara Email
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
