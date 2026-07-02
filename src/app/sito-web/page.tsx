"use client"

import { AudioPlayer } from '@/components/AudioPlayer';
import { InteractiveSection } from '@/components/InteractiveSection';
import { SocialGallery } from '@/components/SocialGallery';
import { Radio, Music, Calendar, Users, Globe, Headphones, Play, Pause, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import { cn } from '@/lib/utils';

export default function SitoWebLandingPage() {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* HEADER DOMINANTE - BRANDING TOTALE - SPAZIATURE RIDOTTE */}
      <div className="w-full bg-white border-b border-slate-100 pt-6 pb-4 sm:pt-8 sm:pb-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="relative w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl bg-white p-1 shrink-0">
            <Image 
              src="/logo-rcs.png" 
              alt="Logo Radio RCS" 
              fill 
              className="object-contain rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black italic tracking-tighter uppercase text-slate-950 leading-tight">
              Radio RCS <span className="text-primary">Sicilia</span>
            </h2>
            <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-primary rounded-full mt-2 sm:mt-4" />
          </div>
        </div>
      </div>

      {/* HERO SECTION - SPAZIATURA SUPERIORE RIDOTTA */}
      <section className="relative flex flex-col items-center pt-8 pb-12 sm:pt-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 animate-float"><Radio size={120} /></div>
          <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}><Music size={100} /></div>
        </div>

        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start w-full">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-widest">
                <Headphones size={18} /> La Radio del Cuore della Sicilia
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                I Grandi <br />
                <span className="text-primary italic">Successi.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
                Ascolta Radio RCS Sicilia ovunque tu sia. La musica più bella e l'interazione diretta con la tua radio preferita, ora con un'esperienza web tutta nuova.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 w-full sm:w-auto">
                {/* BOTTONE ASCOLTA LIVE */}
                <Button 
                  size="lg" 
                  onClick={togglePlay}
                  disabled={isLoading}
                  className={cn(
                    "rounded-full h-14 sm:h-16 px-6 sm:px-10 text-lg sm:text-xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto",
                    isPlaying ? "bg-white text-black hover:bg-white/90 shadow-white/20" : "bg-primary text-white hover:bg-primary/90 shadow-primary/30"
                  )}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <><Pause className="fill-current" /> Sospendi</>
                  ) : (
                    <><Play className="fill-current" /> Ascolta Live</>
                  )}
                </Button>

                {/* BOTTONE GOOGLE PLAY STYLE */}
                <Link href="/" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="h-14 sm:h-16 px-4 sm:px-8 rounded-2xl bg-black hover:bg-slate-900 border border-slate-800 text-white flex items-center justify-center gap-3 sm:gap-4 transition-all shadow-xl hover:shadow-2xl w-full"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 512 512" className="w-full h-full fill-white">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-10.1 18-26.7-1.2-36.3zM104.6 499l220.7-127.3-60.7-60.7L104.6 499z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col items-start leading-none text-left">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter opacity-70 mb-0.5">Scarica l'app per Android su</span>
                      <span className="text-base sm:text-xl font-bold">Google Play</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
              {/* SMARTPHONE MOCKUP 9/19 */}
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/19] rounded-[3rem] sm:rounded-[3.5rem] bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] p-3 sm:p-4 border-[8px] sm:border-[10px] border-slate-900 flex flex-col items-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] player-gradient pointer-events-none opacity-40" />
                <div className="z-10 w-full h-full flex flex-col">
                  <AudioPlayer />
                </div>
              </div>

              {/* BADGE STREAMING */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-slate-100 animate-bounce hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-200">
                    <Globe size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Streaming</p>
                    <p className="text-base sm:text-lg font-black text-slate-900">Live in HD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AREA INTERATTIVA */}
      <InteractiveSection />

      {/* SOCIAL GALLERY */}
      <SocialGallery />

      {/* FEATURES SECTION */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-slate-100 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16">
            <div className="space-y-6 text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] bg-primary/5 text-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                <Radio size={40} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black">Diretta 24/7</h3>
              <p className="text-slate-500 leading-relaxed font-medium text-sm sm:text-base">Streaming ad alta fedeltà costante, ovunque tu sia nel mondo.</p>
            </div>
            <div className="space-y-6 text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] bg-primary/5 text-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                <Music size={40} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black">Successi</h3>
              <p className="text-slate-500 leading-relaxed font-medium text-sm sm:text-base">Una playlist curata con il meglio del panorama italiano e mondiale.</p>
            </div>
            <div className="space-y-6 text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] bg-primary/5 text-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                <Calendar size={40} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black">Eventi</h3>
              <p className="text-slate-500 leading-relaxed font-medium text-sm sm:text-base">Siamo i media partner dei principali eventi culturali siciliani.</p>
            </div>
            <div className="space-y-6 text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] bg-primary/5 text-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                <Users size={40} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black">Ascoltatori</h3>
              <p className="text-slate-500 leading-relaxed font-medium text-sm sm:text-base">Una community affiatata che cresce ogni giorno oltre ogni confine.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SITO WEB COMPLETO CON SOCIAL E LINK LEGALI */}
      <footer className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-48 -mt-48" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 mb-16 sm:mb-20 relative z-10 text-center sm:text-left">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase text-primary">Radio RCS Sicilia</h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              La radio che accorcia le distanze. Dal cuore della Sicilia portiamo la nostra passione in tutto il mondo.
            </p>
            {/* SOCIAL ICONS NEL FOOTER SITO WEB */}
            <div className="flex justify-center sm:justify-start gap-4">
              <a href="https://www.facebook.com/RCS.radio" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl text-white/60 hover:text-primary hover:bg-white/10 transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/radio_rcs_sicilia/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl text-white/60 hover:text-primary hover:bg-white/10 transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UCTlKWIycsPc7Wh5cPW03vOA" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl text-white/60 hover:text-primary hover:bg-white/10 transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <h4 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-white/50">Link Rapidi</h4>
            <ul className="space-y-4 text-base sm:text-lg">
              <li><Link href="/about" className="hover:text-primary transition-colors">Chi Siamo</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contatti</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><a href="https://www.rcsradio.it" className="hover:text-primary transition-colors" target="_blank">Sito Ufficiale WP</a></li>
            </ul>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <h4 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-white/50">Sede Legale</h4>
            <div className="text-slate-400 space-y-2">
              <p className="text-base sm:text-lg">Via Sandro Pertini snc</p>
              <p className="text-base sm:text-lg">93010 Serradifalco (CL)</p>
            </div>
            <p className="text-primary text-lg sm:text-xl font-black">radiorcs@hotmail.it</p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] sm:text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] text-center">
          <p>&copy; {new Date().getFullYear()} Radio RCS Sicilia di Vancheri Salvatore</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <p>P.IVA 01389680859</p>
            <p>Lic. SIAE 3824</p>
            <p>Lic. SCF 1440/17</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
