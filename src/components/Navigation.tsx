
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, Info, Mail, Globe, Facebook, Youtube, Instagram, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Radio', icon: Radio },
  { href: '/sito-web', label: 'Sito Web', icon: Globe },
  { href: '/about', label: 'Chi Siamo', icon: Info },
  { href: '/contact', label: 'Contatti', icon: Mail },
  { href: '/privacy', label: 'Privacy', icon: Shield },
];

const socialLinks = [
  { href: 'https://www.facebook.com/RCS.radio', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.youtube.com/channel/UCTlKWIycsPc7Wh5cPW03vOA', icon: Youtube, label: 'YouTube' },
  { href: 'https://www.instagram.com/radio_rcs_sicilia/', icon: Instagram, label: 'Instagram' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-xl border-b border-white/5 px-3 py-2">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={0}
                aria-label={link.label}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-white/40 hover:text-primary hover:bg-white/5"
                )}
              >
                <Icon size={18} />
                <span className="hidden lg:inline-block">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
              aria-label={social.label}
              className="p-2 text-white/40 hover:text-primary hover:bg-white/5 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
