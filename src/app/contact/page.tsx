"use client"

import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ContactPage() {
  const contactInfo = [
    { icon: Globe, label: 'Sito Web', value: 'www.rcsradio.it', href: 'https://www.rcsradio.it' },
    { icon: Mail, label: 'Email', value: 'radiorcs@hotmail.it', href: 'mailto:radiorcs@hotmail.it' },
    { icon: Phone, label: 'Telefono', value: '+39 333 862599 / 392 8627847', href: 'tel:+39333862599' },
    { icon: MapPin, label: 'Sede', value: 'via Sandro Pertini snc, 93010 Serradifalco (CL)', href: 'https://maps.google.com/?q=via+Sandro+Pertini+snc+93010+Serradifalco' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/RCS.radio' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/' },
    { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/channel/UCTlKWIycsPc7Wh5cPW03vOA' },
  ];

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 animate-in slide-in-from-left-4 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary">Contatta Radio RCS Sicilia</h1>
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

        <Card className="glass-morphism border-none shadow-2xl animate-in slide-in-from-right-4 duration-700">
          <CardHeader>
            <CardTitle>Inviaci un messaggio</CardTitle>
            <CardDescription>Ti risponderemo al più presto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nome</label>
                <Input placeholder="Il tuo nome" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                <Input placeholder="latua@email.com" className="bg-white/5 border-white/10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Oggetto</label>
              <Input placeholder="Richiesta brano, pubblicità..." className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Messaggio</label>
              <Textarea placeholder="Scrivi qui il tuo messaggio..." className="min-h-[150px] bg-white/5 border-white/10" />
            </div>
            <Button className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90">
              Invia Messaggio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
