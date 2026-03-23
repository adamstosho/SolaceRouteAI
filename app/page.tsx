'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/Button';
import { PageShell } from '@/components/PageShell';
import { StatusBar } from '@/components/StatusBar';
import { WelcomeHero } from '@/components/WelcomeHero';
import {
  MapPin,
  Sparkles,
  BarChart3,
  ArrowRight,
  Leaf,
  ShieldCheck,
} from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Adaptive routing',
    copy: 'Routes that breathe with live crowd data.',
  },
  {
    icon: Sparkles,
    title: 'Curated days',
    copy: 'Itineraries tuned to your pace and taste.',
  },
  {
    icon: Sparkles,
    title: 'Live crowd sense',
    copy: 'See density before you commit your steps.',
  },
];

export default function WelcomePage() {
  const reduce = useReducedMotion();

  return (
    <PageShell className="flex min-h-[100dvh] flex-col">
      <StatusBar />

      <div className="content-shell flex flex-1 flex-col pb-10 pt-8 sm:pt-14">
        <motion.div
          className="mb-8 text-center"
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <WelcomeHero />

          <motion.div 
            className="mb-3 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              SolaceRoute
              <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            <Leaf className="h-6 w-6 text-primary sm:h-7 sm:w-7" strokeWidth={1.5} />
          </motion.div>
          <motion.p 
            className="mx-auto max-w-lg text-pretty text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            &ldquo;Avoid crowds. Discover better routes. Travel smarter.&rdquo;
          </motion.p>
          <motion.p
            className="mx-auto mt-4 max-w-md text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Discover better routes in real time with our AI-powered crowd awareness engine.
          </motion.p>
        </motion.div>

        <div className="mb-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{
                delay: 0.12 + i * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group rounded-2xl border border-border/60 bg-card/60 p-4 shadow-[0_12px_40px_-18px_oklch(0.2_0.03_158_/_0.12)] backdrop-blur-xl transition-colors hover:border-primary/25"
            >
              <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2.5 text-primary transition-transform group-hover:scale-105">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h2 className="font-display text-sm font-semibold text-foreground">
                {f.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.copy}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-auto rounded-t-3xl border border-border/60 bg-card/90 p-6 shadow-[0_-8px_40px_-12px_oklch(0.2_0.03_158_/_0.12)] backdrop-blur-xl sm:p-8"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
            Travel smarter, not harder
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            SolaceRouteAI uses live crowd data and AI to guide you to the right
            place at the right time — protecting destinations and enhancing your
            journey.
          </p>
          <div className="mt-6 flex w-full max-w-md flex-col gap-3">
            <Link href="/preferences" className="w-full">
              <Button size="lg" fullWidth className="gap-2">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/preferences" className="w-full">
              <Button variant="ghost" size="lg" fullWidth className="text-teal-700 dark:text-teal-400">
                Continue as Guest
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-start justify-center gap-2 text-center sm:justify-start">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Your data is anonymised and never sold.
            </p>
          </div>
        </motion.div>

        <Link href="/dmo-dashboard" className="mx-auto mt-6 w-full max-w-md">
          <Button variant="outline" size="lg" fullWidth className="gap-2">
            <BarChart3 className="h-4 w-4" />
            DMO dashboard (preview)
          </Button>
        </Link>

        <motion.p
          className="mt-8 text-center text-xs tracking-wide text-muted-foreground"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          v1.0 · Portfolio prototype · BU7083
        </motion.p>
      </div>
    </PageShell>
  );
}
