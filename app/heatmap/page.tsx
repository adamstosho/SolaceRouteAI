'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/Button';
import { TopAppBar } from '@/components/TopAppBar';
import { PageShell } from '@/components/PageShell';
import { StatusBar } from '@/components/StatusBar';
import { ProgressRail } from '@/components/ProgressRail';
import { GlassCard } from '@/components/GlassCard';
import { Reveal } from '@/components/motion/Reveal';
import { AttractionCard } from '@/components/AttractionCard';
import { useTrip } from '@/lib/tripContext';
import {
  mockAttractions,
  getCrowdColor,
  createDefaultPreferences,
  generateSmartItinerary,
  mockCityStatus,
} from '@/lib/mockData';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, SlidersHorizontal, Menu, CloudSun, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeatmapPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { preferences, setItinerary, setCurrentStep } = useTrip();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showLow, setShowLow] = useState(true);
  const [showModerate, setShowModerate] = useState(true);
  const [showHeavy, setShowHeavy] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);

  const prefs = preferences ?? createDefaultPreferences();
  const cityLabel = prefs.destination.split(',')[0]?.trim() || 'Destination';

  const sortedAttractions = useMemo(
    () => [...mockAttractions].sort((a, b) => a.crowdLevel - b.crowdLevel),
    []
  );

  const visibleAttractions = useMemo(
    () =>
      sortedAttractions.filter((a) => {
        if (a.crowdLevel <= 2 && !showLow) return false;
        if (a.crowdLevel === 3 && !showModerate) return false;
        if (a.crowdLevel >= 4 && !showHeavy) return false;
        return true;
      }),
    [sortedAttractions, showLow, showModerate, showHeavy]
  );

  const handleSelectAttractions = () => {
    const newItinerary = generateSmartItinerary(prefs);
    setItinerary(newItinerary);
    setCurrentStep(3);
    router.push('/itinerary');
  };

  return (
    <PageShell 
      className="pb-safe-bottom-actions"
      header={
        <>
          <StatusBar />
          <TopAppBar
            title={`${cityLabel} — Live crowds`}
            leftAction={
              <button
                type="button"
                className="rounded-xl p-2 text-foreground transition-colors hover:bg-muted/80"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="h-5 w-5" strokeWidth={2} />
              </button>
            }
            rightAction={
              <button
                type="button"
                className="rounded-xl p-2 text-foreground transition-colors hover:bg-muted/80"
                aria-label="Crowd filters"
                onClick={() => setFilterOpen(true)}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            }
          />
        </>
      }
    >

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[min(100%,320px)]">
          <SheetHeader>
            <SheetTitle className="font-display">SolaceRouteAI</SheetTitle>
            <SheetDescription>
              Jump anywhere in the prototype.
            </SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4 pb-6">
            {[
              { href: '/', label: 'Home' },
              { href: '/preferences', label: 'Trip setup' },
              { href: '/itinerary', label: 'My route' },
              { href: '/dmo-dashboard', label: 'DMO dashboard' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="right" className="w-[min(100%,320px)]">
          <SheetHeader>
            <SheetTitle className="font-display">Map filters</SheetTitle>
            <SheetDescription>
              Show or hide crowd levels on the map and list (prototype).
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4 pb-6">
            {[
              {
                id: 'low',
                label: 'Low crowds',
                sub: 'Levels 1–2',
                checked: showLow,
                set: setShowLow,
                dot: '#1D9E75',
              },
              {
                id: 'mod',
                label: 'Moderate',
                sub: 'Level 3',
                checked: showModerate,
                set: setShowModerate,
                dot: '#EF9F27',
              },
              {
                id: 'heavy',
                label: 'High & at capacity',
                sub: 'Levels 4–5',
                checked: showHeavy,
                set: setShowHeavy,
                dot: '#E24B4A',
              },
            ].map((row) => (
              <label
                key={row.id}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-3"
              >
                <Checkbox
                  checked={row.checked}
                  onCheckedChange={(v) => row.set(v === true)}
                  className="mt-0.5"
                  id={row.id}
                />
                <div className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: row.dot }}
                    />
                    {row.label}
                  </span>
                  <p className="mt-0.5 text-xs text-muted-foreground">{row.sub}</p>
                </div>
              </label>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <main className="content-shell space-y-5 pb-4 pt-6 sm:pt-8">
        <Reveal>
          <ProgressRail step={2} />
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-primary/80">
            Step 2 of 3 · Live layer
          </p>
        </Reveal>

        {/* Live Weather & Events Status Bar */}
        <Reveal delay={0.5}>
          <div className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-primary/[0.03] p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/50 shadow-sm backdrop-blur-sm">
                <CloudSun className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Local Weather</p>
                <p className="text-sm font-semibold text-foreground">{mockCityStatus.weather} · {mockCityStatus.temp}°C</p>
              </div>
            </div>
            
            {mockCityStatus.activeEvent && (
              <div className="flex items-center gap-3 border-t border-primary/5 pt-2 sm:border-t-0 sm:pt-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Active Event</p>
                  <p className="text-sm font-semibold text-foreground">{mockCityStatus.activeEvent}</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-md">
              <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-[0.65rem] font-bold shadow-sm backdrop-blur-md transition-all",
                    showHeatmap ? "bg-primary text-primary-foreground border-primary/20" : "bg-card/95 text-foreground"
                  )}
                >
                  Heatmap {showHeatmap ? "ON" : "OFF"}
                </button>
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/95 px-3 py-1.5 text-[0.65rem] font-semibold shadow-sm backdrop-blur-md">
                  <motion.span
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={reduce ? undefined : { opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  Live · Updated 2 min ago
                </div>
              </div>
              <div className="relative aspect-[4/3] max-h-[380px] p-4 sm:p-6">
                {showHeatmap && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {visibleAttractions.map((attr) => {
                      const posX = (attr.gridX / 7) * 100;
                      const posY = (attr.gridY / 7) * 100;
                      const color = getCrowdColor(attr.crowdLevel);
                      return (
                        <motion.div
                          key={`hm-${attr.id}`}
                          className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-[0.25]"
                          style={{ left: `${posX}%`, top: `${posY}%`, backgroundColor: color }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1.5 }}
                          transition={{ duration: 0.8 }}
                        />
                      );
                    })}
                  </div>
                )}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full text-foreground opacity-[0.1]"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <pattern
                      id="hm-grid"
                      width="12"
                      height="12"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 12 0 L 0 0 0 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.35"
                      />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#hm-grid)" />
                </svg>
                <div className="relative h-full w-full">
                  {visibleAttractions.map((attr, i) => {
                    const posX = (attr.gridX / 7) * 100;
                    const posY = (attr.gridY / 7) * 100;
                    const color = getCrowdColor(attr.crowdLevel);
                    return (
                      <motion.div
                        key={attr.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                        style={{ left: `${posX}%`, top: `${posY}%` }}
                        initial={reduce ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.12 + i * 0.05,
                          type: 'spring',
                          stiffness: 320,
                          damping: 18,
                        }}
                      >
                        <motion.div
                          className="mx-auto h-5 w-5 rounded-full border-2 border-white/90 shadow-md ring-1 ring-black/10"
                          style={{ backgroundColor: color }}
                          title={attr.name}
                          animate={
                            reduce
                              ? undefined
                              : { scale: [1, 1.1, 1] }
                          }
                          transition={{
                            duration: 2.5 + (i % 3) * 0.3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        <p className="mt-1 max-w-[5.5rem] truncate text-[0.6rem] font-medium leading-tight text-foreground drop-shadow-sm">
                          {attr.name}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <p className="border-t border-border/40 bg-card/60 px-3 py-2 text-center text-[0.65rem] text-muted-foreground backdrop-blur-sm">
                Crowd data: SolaceRouteAI · IoT sensors + booking signals
                (prototype)
              </p>
            </div>

            <div className="mt-3 flex h-11 items-center justify-around rounded-xl border border-border/60 bg-card/80 px-2 text-xs font-medium backdrop-blur-sm">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: '#1D9E75' }}
                />
                Low
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: '#EF9F27' }}
                />
                Moderate
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: '#E24B4A' }}
                />
                At capacity
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Suggested stops
            </h3>
            <div className="space-y-3">
              {visibleAttractions.length === 0 ? (
                <GlassCard hover={false} className="py-6 text-center text-sm text-muted-foreground">
                  No stops match these filters. Turn a crowd level back on to see
                  suggestions.
                </GlassCard>
              ) : (
                visibleAttractions.slice(0, 5).map((attr) => (
                  <AttractionCard key={attr.id} attraction={attr} />
                ))
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <GlassCard hover={false} className="py-3">
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Order reflects calmer options first. Build your day, then we keep
              adapting as live conditions shift.
            </p>
          </GlassCard>
        </Reveal>
      </main>

      <div className="fixed-bottom-action-bar">
        <div className="mx-auto w-full max-w-lg space-y-2">
          <Button size="lg" fullWidth onClick={handleSelectAttractions}>
            Build my itinerary →
          </Button>
          <Button variant="ghost" size="lg" fullWidth onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
