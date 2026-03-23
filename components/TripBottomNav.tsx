'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Compass, Navigation, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_PATHS = new Set([
  '/preferences',
  '/heatmap',
  '/itinerary',
  '/alert',
  '/feedback',
  '/thankyou',
]);

const IN_DAY_FLOW = new Set(['/alert', '/feedback']);

const tabs = [
  {
    href: '/',
    label: 'Home',
    icon: MapPin,
    match: (p: string) => p === '/' || p === '/thankyou',
  },
  {
    href: '/heatmap',
    label: 'Explore',
    icon: Compass,
    match: (p: string) => p === '/heatmap',
  },
  {
    href: '/itinerary',
    label: 'My Route',
    icon: Navigation,
    match: (p: string) => p === '/itinerary' || IN_DAY_FLOW.has(p),
  },
  {
    href: '/preferences',
    label: 'Profile',
    icon: UserCircle,
    match: (p: string) => p === '/preferences',
  },
];

export function TripBottomNav() {
  const pathname = usePathname() ?? '';
  const show = NAV_PATHS.has(pathname);

  useEffect(() => {
    const root = document.documentElement;
    if (show) {
      root.setAttribute('data-trip-nav', '1');
    } else {
      root.removeAttribute('data-trip-nav');
    }
    return () => root.removeAttribute('data-trip-nav');
  }, [show]);

  if (!show) return null;

  return (
    <nav
      className="trip-bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t border-primary/5 bg-background/60 backdrop-blur-2xl backdrop-saturate-150"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-14 max-w-lg items-stretch justify-around px-1">
        {tabs.map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition-colors',
                active
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-x-2 inset-y-1.5 z-0 rounded-xl bg-primary/10"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
                <Icon
                  className={cn('h-6 w-6', active && 'stroke-[2.25]')}
                  strokeWidth={active ? 2.25 : 1.75}
                />
                <span className="text-[0.65rem] font-semibold leading-none">
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
