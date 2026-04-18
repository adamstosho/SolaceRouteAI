'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/Button';
import { TopAppBar } from '@/components/TopAppBar';
import { PageShell } from '@/components/PageShell';
import { StatusBar } from '@/components/StatusBar';
import { ProgressRail } from '@/components/ProgressRail';
import { GlassCard } from '@/components/GlassCard';
import { Reveal } from '@/components/motion/Reveal';
import { useTrip } from '@/lib/tripContext';
import {
  INTEREST_OPTIONS_PRD,
  createDefaultPreferences,
  type TripPreferences,
} from '@/lib/mockData';
import {
  AlertCircle,
  Calendar,
  Check,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PreferencesPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { preferences, setPreferences, setCurrentStep } = useTrip();
  const base = useMemo(() => createDefaultPreferences(), []);

  const [destination, setDestination] = useState(base.destination);
  const [arrivalDate, setArrivalDate] = useState(base.arrivalDate);
  const [departureDate, setDepartureDate] = useState(base.departureDate);
  const [startTime, setStartTime] = useState(base.startTime);
  const [duration, setDuration] = useState(base.duration);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    base.interests
  );
  const [wheelchairAccessible, setWheelchairAccessible] = useState(
    base.wheelchairAccessible
  );
  const [crowdAvoidance, setCrowdAvoidance] = useState(base.crowdAvoidance);
  const [displayName, setDisplayName] = useState(base.displayName ?? 'Maria');

  useEffect(() => {
    if (preferences) {
      setDestination(preferences.destination ?? base.destination);
      setArrivalDate(preferences.arrivalDate ?? base.arrivalDate);
      setDepartureDate(preferences.departureDate ?? base.departureDate);
      setStartTime(preferences.startTime);
      setDuration(preferences.duration);
      setSelectedInterests(
        preferences.interests?.length ? preferences.interests : base.interests
      );
      setWheelchairAccessible(
        preferences.wheelchairAccessible ?? base.wheelchairAccessible
      );
      setCrowdAvoidance(preferences.crowdAvoidance);
      setDisplayName(preferences.displayName ?? 'Maria');
    }
  }, [preferences, base]);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    const next: TripPreferences = {
      destination,
      arrivalDate,
      departureDate,
      startTime,
      duration,
      interests: selectedInterests,
      crowdAvoidance,
      wheelchairAccessible,
      displayName: displayName.trim() || 'Traveller',
    };
    setPreferences(next);
    setCurrentStep(2);
    router.push('/processing');
  };

  return (
    <PageShell 
      className="pb-safe-bottom-actions"
      header={
        <>
          <StatusBar />
          <TopAppBar
            title="Set up your trip"
            showBack
            onBack={() => router.back()}
          />
        </>
      }
    >

      <main className="content-shell space-y-6 pb-4 pt-6 sm:pt-8">
        <Reveal>
          <ProgressRail step={1} className="mb-2" />
          <p className="text-xs font-medium text-muted-foreground">
            Step 1 of 3
          </p>
        </Reveal>

        <Reveal delay={1}>
          <GlassCard hover={false} className="p-0 overflow-hidden">
            <div className="border-b border-border/50 px-4 py-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <UserRound className="h-4 w-4 text-primary" />
                What should we call you?
              </label>
            </div>
            <div className="p-4">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Maria"
                className="w-full rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={2}>
          <GlassCard hover={false} className="p-0 overflow-hidden">
            <div className="border-b border-border/50 px-4 py-3">
              <label className="text-sm font-semibold text-foreground">
                Where are you going?
              </label>
            </div>
            <div className="relative p-4">
              <MapPin className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Search destination…"
                className="w-full rounded-xl border border-primary/40 bg-primary/[0.04] py-3 pl-11 pr-10 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Check className="pointer-events-none absolute right-7 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={3}>
          <GlassCard hover={false} className="p-0 overflow-hidden">
            <div className="border-b border-border/50 px-4 py-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                When are you travelling?
              </label>
            </div>
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
              <div>
                <span className="mb-1 block text-xs text-muted-foreground">
                  Arrival
                </span>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <span className="mb-1 block text-xs text-muted-foreground">
                  Departure
                </span>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={4}>
          <GlassCard hover={false} className="p-0 overflow-hidden">
            <div className="border-b border-border/50 px-4 py-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                Day start & duration
              </label>
            </div>
            <div className="space-y-4 p-4">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="60"
                  max="480"
                  step="15"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                />
                <span className="min-w-[4.5rem] text-right font-display text-lg font-semibold tabular-nums text-primary">
                  {Math.floor(duration / 60)}h {duration % 60}m
                </span>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={5}>
          <div>
            <h2 className="mb-1 font-display text-sm font-semibold text-foreground">
              What do you enjoy?
            </h2>
            <p className="mb-3 text-xs text-muted-foreground">
              Select all that apply
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {INTEREST_OPTIONS_PRD.map((interest) => (
                <motion.button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className={cn(
                    'rounded-full border px-3 py-2.5 text-center text-xs font-semibold transition-colors sm:text-sm',
                    selectedInterests.includes(interest)
                      ? 'border-primary bg-primary/12 text-primary'
                      : 'border-border/70 bg-card/50 text-foreground'
                  )}
                >
                  {interest}
                </motion.button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={6}>
          <GlassCard hover={false}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Wheelchair accessible routes only
                </p>
                <p className="text-xs text-muted-foreground">
                  Prioritises step-free paths in routing (demo).
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={wheelchairAccessible}
                onClick={() => setWheelchairAccessible(!wheelchairAccessible)}
                className={cn(
                  'relative h-8 w-14 shrink-0 rounded-full transition-colors',
                  wheelchairAccessible ? 'bg-primary' : 'bg-muted'
                )}
              >
                <span
                  className={cn(
                    'absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform',
                    wheelchairAccessible ? 'left-7' : 'left-1'
                  )}
                />
              </button>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={7}>
          <div>
            <h2 className="mb-3 font-display text-sm font-semibold text-foreground">
              Prefer quieter spaces?
            </h2>
            <div className="flex gap-3">
              {[
                { v: true, label: 'Yes' },
                { v: false, label: 'No' },
              ].map(({ v, label }) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => setCrowdAvoidance(v)}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  className={cn(
                    'flex-1 rounded-xl border-2 px-4 py-3.5 font-semibold transition-all',
                    crowdAvoidance === v
                      ? 'border-primary bg-primary/12 text-primary'
                      : 'border-border/70 bg-card/50 text-foreground'
                  )}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={8}>
          <div className="space-y-4">
            <h2 className="font-display text-sm font-semibold text-foreground">
              Privacy & Data Ethics
            </h2>
            <div className="rounded-xl border border-border/70 bg-card/50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Anonymized Crowd Contribution
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Allow SolaceRouteAI to send your anonymized location signals to 
                    the city DMO to help other travelers avoid crowds. 
                    <span className="block mt-1 font-medium text-primary underline">Learn about our Ethics Policy</span>
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={true}
                  className="relative h-6 w-11 shrink-0 rounded-full bg-primary transition-colors"
                >
                  <span className="absolute top-1 left-6 h-4 w-4 rounded-full bg-white shadow transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-bold text-primary">Privacy by Design:</span> Your preferences and itineraries are stored locally on this device. 
                They are never uploaded to a central cloud, keeping your personal search history 100% private.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={9}>
          <GlassCard hover={false} className="flex gap-3 border-primary/15 bg-primary/[0.04]">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-foreground">
              These inputs power crowd-aware sequencing and alternatives shown on
              your heatmap and itinerary.
            </p>
          </GlassCard>
        </Reveal>
      </main>

      <div className="fixed-bottom-action-bar">
        <div className="mx-auto w-full max-w-lg space-y-2">
          <Button size="lg" fullWidth onClick={handleNext}>
            Find my routes →
          </Button>
          <Button
            variant="ghost"
            size="lg"
            fullWidth
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
