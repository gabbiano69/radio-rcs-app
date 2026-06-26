
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, Info, Mail, Globe, Facebook, Youtube, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home', icon: Radio },
  { href: '/about', label: 'Chi Siamo', icon: Info },
  { href: '/contact', label: 'Contatti', icon: Mail },
  { href: 'https://www.rcsradio.it', label: 'Sito Web', icon: Globe, isExternal: true },
];

const socialLinks = [
  { href: 'https://www.facebook.com/RCS.radio', icon: Facebook },
  { href: 'https://www.youtube.com/channel/UCTlKWIycsPc7Wh5cPW03vOA', icon: Youtube },
  { href: 'https://www.instagram.com/radio_rcs_sicilia/', icon: Instagram },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full glass-morphism border-b px-4 py-2">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            if (link.isExternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all text-muted-foreground hover:text-foreground hover:bg-white/5 whitespace-nowrap"
                >
                  <Icon size={18} />
                  <span className="hidden md:inline-block">{link.label}</span>
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <Icon size={18} />
                <span className="hidden md:inline-block">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
