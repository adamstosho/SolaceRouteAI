'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/Button';
import { TopAppBar } from '@/components/TopAppBar';
import { PageShell } from '@/components/PageShell';
import { StatusBar } from '@/components/StatusBar';
import { GlassCard } from '@/components/GlassCard';
import { Reveal } from '@/components/motion/Reveal';
import { useTrip } from '@/lib/tripContext';
import {
  impactStats,
  mockAttractions,
  createDefaultPreferences,
} from '@/lib/mockData';
import {
  CheckCircle,
  Users,
  Leaf,
  Clock,
  MapPin,
  Star,
} from 'lucide-react';

export default function ThankYouPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { feedback, preferences, resetTrip } = useTrip();
  const prefs = preferences ?? createDefaultPreferences();
  const name = prefs.displayName?.trim() || 'traveller';

  const handleNewTrip = () => {
    resetTrip();
    router.push('/preferences');
  };

  const tomorrowPreview = mockAttractions.slice(0, 2);

  return (
    <PageShell 
      backgroundVariant="warm" 
      className="pb-safe-bottom-actions"
      header={
        <>
          <StatusBar />
          <TopAppBar title="Thank you" showBack={false} />
        </>
      }
    >

      <main className="content-shell space-y-6 pb-4 pt-6 sm:pt-8">
        <Reveal>
          <div className="flex flex-col items-center pt-2 text-center">
            <motion.div
              className="mb-6 flex h-[200px] w-[200px] max-w-[min(100%,200px)] items-center justify-center rounded-full bg-gradient-to-br from-primary/25 to-teal-500/10 shadow-lg ring-1 ring-primary/20"
              initial={reduce ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <CheckCircle
                className="h-[60px] w-[60px] text-primary"
                strokeWidth={1.5}
              />
            </motion.div>
            <h1 className="font-display text-2xl font-semibold capitalize tracking-tight text-foreground sm:text-3xl">
              Thank you, {name}!
            </h1>
            <p className="mx-auto mt-4 max-w-[300px] text-pretty text-base leading-relaxed text-muted-foreground">
              Your feedback helps SolaceRouteAI improve routes for thousands of
              travellers. Together we make tourism more sustainable.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <GlassCard
            hover={false}
            className="border-primary/25 bg-primary/[0.08]"
          >
            <h2 className="mb-4 font-display text-sm font-semibold text-primary">
              Your impact today
            </h2>
            <ul className="space-y-4 text-sm leading-relaxed text-foreground">
              <li className="flex gap-3">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  ~{impactStats.peopleAvoided} tourists redirected from{' '}
                  {impactStats.redirectedFrom} today
                </span>
              </li>
              <li className="flex gap-3">
                <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  You visited {impactStats.communitySitesVisited}{' '}
                  community-recommended sites
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  Estimated{' '}
                  {Math.floor(impactStats.timeOptimized / 60)}h{' '}
                  {impactStats.timeOptimized % 60}min of queuing avoided
                </span>
              </li>
            </ul>
          </GlassCard>
        </Reveal>

        {feedback && !feedback.skipped && (
          <Reveal delay={2}>
            <GlassCard hover={false}>
              <h3 className="mb-2 font-display text-sm font-semibold text-foreground">
                We heard you
              </h3>
              <p className="text-sm text-muted-foreground">
                Crowd prediction:{' '}
                <span className="font-medium text-foreground">
                  {feedback.crowdAccuracy?.replace('_', ' ') ?? '—'}
                </span>
                {feedback.enjoymentTags.length > 0 && (
                  <>
                    {' '}
                    · {feedback.enjoymentTags.join(', ')}
                  </>
                )}
              </p>
            </GlassCard>
          </Reveal>
        )}

        <Reveal delay={3}>
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
              Up next on your trip
            </h3>
            <div className="-mx-1 flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
              {tomorrowPreview.map((attr) => (
                <div
                  key={attr.id}
                  className="w-[min(85vw,260px)] shrink-0 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-md backdrop-blur-md"
                >
                  <div className="mb-3 h-[100px] rounded-xl bg-gradient-to-br from-primary/15 to-teal-500/10" />
                  <p className="font-display text-sm font-semibold text-foreground">
                    {attr.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="flex items-center gap-1 text-[0.65rem] text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {attr.category}
                    </p>
                    <span className="text-[0.65rem] font-medium text-primary/80">
                      Tomorrow
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Ideas for your next day in {prefs.destination.split(',')[0]?.trim() ?? 'the city'}.
            </p>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <GlassCard hover={false} className="text-center">
            <p className="text-sm text-muted-foreground">
              CO₂ saved ~{impactStats.emissionReduced} kg · Community score +50
            </p>
          </GlassCard>
        </Reveal>
      </main>

      <div className="fixed-bottom-action-bar">
        <div className="mx-auto w-full max-w-lg space-y-3">
          <GlassCard hover={false} className="border-amber-500/30 bg-amber-500/5 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-amber-500 p-1">
                  <Star className="h-3 w-3 text-white" />
                </div>
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Upgrade to Solace Prime
                </p>
              </div>
              <p className="text-[0.65rem] font-medium text-muted-foreground">$4.99 Trip Pass</p>
            </div>
            <p className="mt-1 text-[0.6rem] text-muted-foreground">Unlock offline maps, carbon offset certificates, and priority Solace rewards.</p>
          </GlassCard>
          
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="ghost" size="lg" className="w-full sm:flex-1" onClick={() => router.push('/heatmap')}>
              Back to map
            </Button>
            <Button size="lg" className="w-full sm:flex-[1.5]" onClick={handleNewTrip}>
              Plan tomorrow →
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
