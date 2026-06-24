"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, Info, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Ascolta', icon: Radio },
  { href: '/about', label: 'Chi Siamo', icon: Info },
  { href: '/contact', label: 'Contatti', icon: Mail },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full glass-morphism border-b px-4 py-3">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
            <Radio size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Radio RCS <span className="text-primary">Sicilia</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
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
      </div>
    </nav>
  );
}
