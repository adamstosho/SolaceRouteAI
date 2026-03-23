'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/Button';
import { PageShell } from '@/components/PageShell';
import { StatusBar } from '@/components/StatusBar';
import { TopAppBar } from '@/components/TopAppBar';
import { GlassCard } from '@/components/GlassCard';
import { Reveal } from '@/components/motion/Reveal';
import { useTrip } from '@/lib/tripContext';
import { createDefaultPreferences } from '@/lib/mockData';
import { ShieldCheck, ArrowRight } from 'lucide-react';

/** Distinct from “Get started” — returning users skip full onboarding copy. */
export default function SignInPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { preferences, setPreferences } = useTrip();
  const [name, setName] = useState('');

  useEffect(() => {
    const d = preferences?.displayName?.trim();
    if (d) setName(d);
  }, [preferences?.displayName]);

  const continueToApp = () => {
    const base = preferences ?? createDefaultPreferences();
    setPreferences({
      ...base,
      displayName: name.trim() || base.displayName,
    });
    router.push('/heatmap');
  };

  const continueAsGuest = () => {
    router.push('/preferences');
  };

  return (
    <PageShell className="pb-10">
      <StatusBar />
      <TopAppBar title="Sign in" showBack onBack={() => router.push('/')} />

      <main className="content-shell space-y-6 pb-8 pt-6 sm:pt-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-primary/80">
            Returning traveller
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Pick up your smart routes
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Portfolio prototype: no real accounts. Your trip stays on this device
            only — we just personalise the greeting and flow.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <GlassCard hover={false} className="space-y-5">
            <div>
              <label
                htmlFor="signin-name"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                What should we call you?
              </label>
              <input
                id="signin-name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Maria"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-foreground outline-none ring-primary/30 placeholder:text-muted-foreground focus:border-primary focus:ring-2"
              />
            </div>
            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
              Your data is anonymised and never sold — same promise as on the home
              screen.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={2}>
          <motion.div
            className="flex flex-col gap-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Button size="lg" fullWidth className="gap-2" onClick={continueToApp}>
              Continue to live map
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" fullWidth onClick={continueAsGuest}>
              New trip setup instead
            </Button>
            <Link href="/" className="text-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Back to welcome
              </Button>
            </Link>
          </motion.div>
        </Reveal>
      </main>
    </PageShell>
  );
}
