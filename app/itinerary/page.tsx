'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { TopAppBar } from '@/components/TopAppBar';
import { PageShell } from '@/components/PageShell';
import { StatusBar } from '@/components/StatusBar';
import { ProgressRail } from '@/components/ProgressRail';
import { GlassCard } from '@/components/GlassCard';
import { Reveal } from '@/components/motion/Reveal';
import { TimelineItem } from '@/components/TimelineItem';
import { useTrip } from '@/lib/tripContext';
import {
  mockAttractions,
  mockItinerary,
  formatTripDate,
  createDefaultPreferences,
  impactStats,
  generateSmartItinerary,
} from '@/lib/mockData';
import { AlertCircle, MapPin, Zap, Share2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const REGEN_SORTS = [
  (a: (typeof mockAttractions)[0], b: (typeof mockAttractions)[0]) =>
    a.crowdLevel - b.crowdLevel,
  (a: (typeof mockAttractions)[0], b: (typeof mockAttractions)[0]) =>
    a.estTime - b.estTime,
  (a: (typeof mockAttractions)[0], b: (typeof mockAttractions)[0]) =>
    a.name.localeCompare(b.name),
];

export default function ItineraryPage() {
  const router = useRouter();
  const { itinerary, preferences, setItinerary, setCurrentStep } = useTrip();
  const [regenKey, setRegenKey] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const prefs = preferences ?? createDefaultPreferences();
  const cityLabel = prefs.destination.split(',')[0]?.trim() || 'Your trip';

  const itineraryWithDetails = useMemo(() => {
    return [...itinerary]
      .sort((a, b) => a.order - b.order)
      .map((item) => {
        const attraction = mockAttractions.find(
          (a) => a.id === item.attractionId
        );
        return { ...item, attraction };
      })
      .filter((item) => !!item.attraction);
  }, [itinerary]);

  const handleReorder = (idx: number, dir: 'up' | 'down') => {
    const next = [...itineraryWithDetails];
    const newIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= next.length) return;
    
    // Swap items
    const temp = next[idx];
    next[idx] = next[newIdx];
    next[newIdx] = temp;
    
    // Update orders
    const updated = next.map((item, i) => ({
      ...item,
      order: i + 1,
    }));
    
    setItinerary(updated.map(({ attraction, ...rest }) => rest));
    toast.info('Route updated', { description: 'Recalculating wait times...' });
  };

  const totalTime = useMemo(() => {
    return itineraryWithDetails.reduce((acc, item) => {
      const [sh, sm] = item.startTime.split(':').map(Number);
      const [eh, em] = item.endTime.split(':').map(Number);
      return acc + (eh * 60 + em - (sh * 60 + sm));
    }, 0);
  }, [itineraryWithDetails]);

  const waitSavedLabel = useMemo(() => {
    // Generate a semi-random but consistent "saved time" based on itinerary length
    const saved = itineraryWithDetails.length * 35 + (regenKey % 15);
    return `${Math.floor(saved / 60)}h ${saved % 60}min`;
  }, [itineraryWithDetails, regenKey]);

  const handleRegenerate = useCallback(() => {
    // Simple shuffle for "re-generate" experience in prototype
    const shuffledPrefs = { 
      ...prefs, 
      interests: [...prefs.interests].sort(() => Math.random() - 0.5) 
    };
    const mapped = generateSmartItinerary(shuffledPrefs);
    
    setItinerary(mapped);
    setRegenKey((k) => k + 1);
    toast.success('Itinerary refreshed', {
      description: 'Stops re-ordered using a different optimisation mix.',
    });
  }, [prefs, setItinerary]);

  const handleShare = useCallback(async () => {
    const head = `SolaceRouteAI · ${prefs.destination}\n${formatTripDate(prefs.arrivalDate)}\n\n`;
    const body = itineraryWithDetails
      .map(
        (row) =>
          `· ${row.startTime} ${row.attraction!.name} (${row.attraction!.category})`
      )
      .join('\n');
    const text = head + body;
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: 'SolaceRouteAI itinerary', text });
        toast.success('Shared', {
          description: 'Your day plan was sent from this device.',
        });
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard', {
          description: 'Paste into messages, notes, or email.',
        });
        return;
      }
      toast.message('Sharing unavailable', {
        description: 'Try again on a phone or desktop browser.',
      });
    } catch (err) {
      const name = err instanceof Error ? err.name : '';
      if (name === 'AbortError') return;
      toast.error('Could not share', {
        description: 'Check permissions or try copy again.',
      });
    }
  }, [itineraryWithDetails, prefs]);

  const handleStartTrip = () => {
    setCurrentStep(4);
    router.push('/alert');
  };

  return (
    <PageShell 
      className="pb-safe-bottom-actions"
      header={
        <>
          <StatusBar />
          <TopAppBar
            title={isEditing ? "Edit your route" : "Your itinerary — Day 1"}
            showBack
            onBack={() => router.back()}
            rightAction={
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className={cn(
                    "rounded-xl px-3 py-1.5 text-xs font-bold transition-all",
                    isEditing 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "bg-muted/50 text-foreground hover:bg-muted"
                  )}
                >
                  {isEditing ? "Done" : "Modify"}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="rounded-xl p-2 text-foreground hover:bg-muted/80"
                  aria-label="Share itinerary"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            }
          />
        </>
      }
    >

      <main className="content-shell space-y-6 pb-4 pt-6 sm:pt-8">
        <Reveal>
          <ProgressRail step={3} />
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-primary/80">
            Step 3 of 3 · Your day
          </p>
        </Reveal>

        <Reveal delay={1}>
          <p className="text-center text-sm text-muted-foreground">
            {formatTripDate(prefs.arrivalDate)} · {cityLabel}
          </p>
        </Reveal>

        <Reveal delay={2}>
          <div className="space-y-3">
            <GlassCard
              hover={false}
              className="border-primary/25 bg-primary/[0.08]"
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  <span className="font-semibold text-primary">AI optimised</span>{' '}
                  your route from live crowd signals. Estimated wait time saved:{' '}
                  <span className="font-semibold">{waitSavedLabel}</span>.
                </p>
              </div>
            </GlassCard>
            
            {/* AI Reasoning Logic Block */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                Decision Logic Insight
              </p>
              <p className="mt-1 text-sm text-foreground/90 leading-relaxed">
                <span className="font-bold underline decoration-primary/30">IF</span> crowd level at 2:00 PM is <span className="text-destructive font-bold">HIGH</span> <span className="font-bold underline decoration-primary/30">THEN</span> we shifted your museum visit to 10:00 AM to ensure Solace.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold text-foreground">
              Timeline
            </h3>
            <div>
              {itineraryWithDetails.map((item, idx) => (
                <TimelineItem
                  key={item.id}
                  attraction={item.attraction!}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  isLast={idx === itineraryWithDetails.length - 1}
                  order={item.order}
                  isEditing={isEditing}
                  onReorder={(dir) => handleReorder(idx, dir)}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <GlassCard hover={false} className="flex gap-3 border-accent/25">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-foreground">
              {prefs.wheelchairAccessible
                ? 'Step-free routing preference is on—we bias toward accessible paths in production.'
                : 'During your trip, alerts can swap a stop if capacity spikes—one tap to accept a calmer alternative.'}
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={5}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <GlassCard hover className="text-center sm:text-left">
              <p className="mb-1 flex items-center justify-center gap-1 text-xs text-muted-foreground sm:justify-start">
                <MapPin className="h-3.5 w-3.5" />
                Total distance (est.)
              </p>
              <p className="font-display text-xl font-bold text-foreground">
                ~4.2 km
              </p>
            </GlassCard>
            <GlassCard hover className="text-center sm:text-left">
              <p className="mb-1 text-xs text-muted-foreground">Active time</p>
              <p className="font-display text-xl font-bold text-primary">
                {Math.floor(totalTime / 60)}h {totalTime % 60}m
              </p>
            </GlassCard>
          </div>
        </Reveal>
        <Reveal delay={6}>
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03] p-6 shadow-sm">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                Conscious Traveler Premium
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground">
                Go beyond the crowds
              </h4>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                Unlock exclusive routing features as described in our business model:
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 w-full">
                <div className="rounded-xl border border-border/50 bg-white/40 p-3 backdrop-blur-sm">
                  <p className="font-semibold text-primary text-xs">Offline Sync</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Full map access without data</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-white/40 p-3 backdrop-blur-sm">
                  <p className="font-semibold text-primary text-xs">Curated Trails</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Ethical "Solace" routes</p>
                </div>
              </div>
              <Button variant="outline" className="mt-6 border-primary/20 bg-background/50 hover:bg-primary/5" size="sm" fullWidth>
                Upgrade to Solace Prime · $4.99
              </Button>
            </div>
          </div>
        </Reveal>
      </main>

      <div className="fixed-bottom-action-bar">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-2 sm:flex-row sm:items-stretch">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:flex-1"
            onClick={handleRegenerate}
          >
            <RefreshCw className="h-4 w-4" />
            Re-generate
          </Button>
          <Button
            size="lg"
            className="w-full sm:flex-[1.4]"
            onClick={handleStartTrip}
          >
            Start my day →
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
