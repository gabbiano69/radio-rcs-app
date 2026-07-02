
"use client"

import { AudioPlayer } from '@/components/AudioPlayer';
import { InteractiveSection } from '@/components/InteractiveSection';
import { SocialGallery } from '@/components/SocialGallery';
import { Radio, Music, Calendar, Users, Globe, Headphones, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import { cn } from '@/lib/utils';

export default function SitoWebLandingPage() {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* HEADER COMPATTO - BRANDING ALTO E PULITO */}
      <div className="w-full bg-white border-b border-slate-100 pt-1 pb-1 sm:pt-2 sm:pb-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <div className="relative w-12 h-12 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-primary/20 bg-white p-1 shrink-0">
            <Image 
              src="/logo-rcs.png" 
              alt="Logo Radio RCS" 
              fill 
              className="object-contain rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-black italic tracking-tighter uppercase text-slate-950 leading-none">
              Radio RCS <span className="text-primary">Sicilia</span>
            </h2>
          </div>
        </div>
      </div>

      {/* HERO SECTION - MOCKUP A SINISTRA, TESTO A DESTRA */}
      <section className="relative flex flex-col items-center pt-2 pb-8 sm:pt-4 sm:pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 animate-float"><Radio size={120} /></div>
          <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}><Music size={100} /></div>
        </div>

        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center w-full">
            {/* MOCKUP A SINISTRA (PRIMO SU MOBILE E DESKTOP) */}
            <div className="relative flex justify-center lg:justify-start order-1">
              <div className="relative w-full max-w-[310px] sm:max-w-[360px] aspect-[9/18] rounded-[2.8rem] bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] p-3 sm:p-4 border-[8px] sm:border-[10px] border-slate-900 flex flex-col items-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] player-gradient pointer-events-none opacity-40" />
                <div className="z-10 w-full h-full flex flex-col">
                  <AudioPlayer />
                </div>
              </div>
            </div>

            {/* TESTO A DESTRA */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                <Headphones size={16} /> La Radio del Cuore della Sicilia
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85]">
                I Grandi <br />
                <span className="text-primary italic">Successi.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
                Ascolta Radio RCS Sicilia ovunque tu sia. La musica più bella e l'interazione diretta con la tua radio preferita.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  onClick={togglePlay}
                  disabled={isLoading}
                  className={cn(
                    "rounded-full h-12 sm:h-14 px-6 sm:px-10 text-base sm:text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto",
                    isPlaying ? "bg-white text-black hover:bg-white/90 shadow-white/20" : "bg-primary text-white hover:bg-primary/90 shadow-primary/30"
                  )}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-3 border-current border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <><Pause className="fill-current" /> Sospendi</>
                  ) : (
                    <><Play className="fill-current" /> Ascolta Live</>
                  )}
                </Button>

                <Link href="/" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="h-12 sm:h-14 px-4 sm:px-8 rounded-2xl bg-black hover:bg-slate-900 border border-slate-800 text-white flex items-center justify-center gap-3 transition-all shadow-xl w-full"
                  >
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 512 512" className="w-full h-full fill-white">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-10.1 18-26.7-1.2-36.3zM104.6 499l220.7-127.3-60.7-60.7L104.6 499z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col items-start leading-none text-left">
                      <span className="text-[8px] font-bold uppercase tracking-tighter mb-0.5 opacity-70">App Android</span>
                      <span className="text-sm font-bold">Google Play</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InteractiveSection />
      <SocialGallery />

      <section className="py-12 px-4 bg-slate-100 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4 text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-primary/5">
                <Radio size={32} />
              </div>
              <h3 className="text-lg font-black">Diretta 24/7</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Streaming HD costante nel mondo.</p>
            </div>
            <div className="space-y-4 text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-primary/5">
                <Music size={32} />
              </div>
              <h3 className="text-lg font-black">Successi</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Il meglio della musica mondiale.</p>
            </div>
            <div className="space-y-4 text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-primary/5">
                <Calendar size={32} />
              </div>
              <h3 className="text-lg font-black">Eventi</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Media partner dei grandi eventi.</p>
            </div>
            <div className="space-y-4 text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-primary/5">
                <Users size={32} />
              </div>
              <h3 className="text-lg font-black">Community</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Una voce che unisce tutti.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-slate-950 text-white relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 text-center sm:text-left">
          <div className="space-y-4">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-primary">Radio RCS Sicilia</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              La radio che accorcia le distanze. Dal cuore della Sicilia portiamo la nostra passione in tutto il mondo.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50">Info Legali</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary">Chi Siamo</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contatti</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50">Sede</h4>
            <div className="text-slate-400 text-sm space-y-1">
              <p>Via Sandro Pertini snc</p>
              <p>93010 Serradifalco (CL)</p>
              <p className="text-primary font-bold mt-2">radiorcs@hotmail.it</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">
          <p>&copy; {new Date().getFullYear()} Radio RCS Sicilia</p>
          <div className="flex flex-wrap justify-center gap-4">
            <p>P.IVA 01389680859</p>
            <p>Lic. SIAE 3824</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
