'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/Button';
import { TopAppBar } from '@/components/TopAppBar';
import { PageShell } from '@/components/PageShell';
import { StatusBar } from '@/components/StatusBar';
import { ProgressRail } from '@/components/ProgressRail';
import { GlassCard } from '@/components/GlassCard';
import { Reveal } from '@/components/motion/Reveal';
import { CrowdBadge } from '@/components/CrowdBadge';
import { useTrip } from '@/lib/tripContext';
import { mockAlertAlternative, getCrowdColor } from '@/lib/mockData';
import {
  ArrowRight,
  Bell,
  MapPin,
  Star,
  Zap,
  ChevronDown,
} from 'lucide-react';

export default function AlertPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { setCurrentStep } = useTrip();
  const [showAlternatives, setShowAlternatives] = useState(false);

  const alt = mockAlertAlternative;

  const handleReroute = () => {
    setCurrentStep(5);
    router.push('/feedback');
  };

  const levels = [2, 3, 4, 5, 5, 4, 3];

  return (
    <PageShell 
      backgroundVariant="alert" 
      className="pb-safe-bottom-actions"
      header={
        <>
          <StatusBar />
          <TopAppBar title="Live alert" showBack onBack={() => router.back()} />
        </>
      }
    >

      <main className="content-shell space-y-6 pb-4 pt-6 sm:pt-8">
        <Reveal>
          <ProgressRail step={3} />
        </Reveal>

        <Reveal delay={1}>
          <div className="overflow-hidden rounded-2xl border border-destructive/25 bg-[#FCEBEB] p-4 dark:bg-destructive/15">
            <div className="flex gap-3 border-l-4 border-[#E24B4A] pl-3">
              <Bell className="mt-0.5 h-6 w-6 shrink-0 text-[#E24B4A]" />
              <div>
                <h2 className="font-display text-base font-semibold text-[#791F1F] dark:text-destructive-foreground">
                  Capacity reached
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  Sagrada Família has reached maximum visitor capacity. Entry is
                  currently suspended.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Detected 3 minutes ago
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <GlassCard hover={false}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Your original plan
            </p>
            <p className="text-sm font-medium text-destructive line-through decoration-2">
              Sagrada Família — 2:00 PM
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={3}>
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-primary">
            <Zap className="h-4 w-4" />
            SolaceRouteAI suggests
          </h3>
        </Reveal>

        <Reveal delay={4}>
          <GlassCard
            hover={false}
            className="overflow-hidden border-l-4 border-primary p-0"
          >
            <div className="h-[120px] bg-gradient-to-br from-primary/20 via-muted/50 to-teal-500/10" />
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h4 className="font-display text-lg font-semibold text-foreground">
                  {alt.name}
                </h4>
                <CrowdBadge level={alt.crowdLevel} size="sm" showLabel />
              </div>
              <p className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                0.4 km from your current location (demo)
              </p>
              <p className="mb-3 text-sm italic leading-relaxed text-primary">
                {alt.aiSuggestion}
              </p>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s <= 4
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-border'
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs font-medium text-muted-foreground">
                  4.8
                </span>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={5}>
          <GlassCard hover={false}>
            <h3 className="mb-4 font-display text-sm font-semibold text-foreground">
              Expected crowd trend
            </h3>
            <div className="flex h-28 gap-1">
              {levels.map((level, idx) => (
                <div
                  key={idx}
                  className="flex h-full flex-1 items-end justify-center"
                >
                  <motion.div
                    className="w-full max-w-[90%] rounded-t-md"
                    style={{
                      height: `${Math.max(14, (level / 5) * 100)}%`,
                      backgroundColor: getCrowdColor(level),
                      transformOrigin: 'bottom',
                    }}
                    initial={reduce ? false : { scaleY: 0 }}
                    whileInView={reduce ? undefined : { scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: idx * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={6}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Other options
            </h3>
            <button
              type="button"
              onClick={() => setShowAlternatives(!showAlternatives)}
              className="flex items-center gap-1 text-xs font-semibold text-primary"
            >
              {showAlternatives ? 'Hide' : 'Show'}
              <motion.span
                animate={{ rotate: showAlternatives ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
          </div>
        </Reveal>

        <AnimatePresence initial={false}>
          {showAlternatives && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-muted-foreground"
            >
              Open the heatmap to compare all sites side by side — tap “See other
              options” below.
            </motion.p>
          )}
        </AnimatePresence>
      </main>

      <div className="fixed-bottom-action-bar">
        <div className="mx-auto w-full max-w-lg space-y-2">
          <Button
            size="lg"
            fullWidth
            onClick={handleReroute}
            className="gap-2"
          >
            Accept new route →
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => router.push('/heatmap')}
          >
            See other options
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
