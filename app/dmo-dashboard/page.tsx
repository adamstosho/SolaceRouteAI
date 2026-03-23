'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/Button';
import { TopAppBar } from '@/components/TopAppBar';
import { PageShell } from '@/components/PageShell';
import { StatusBar } from '@/components/StatusBar';
import { GlassCard } from '@/components/GlassCard';
import { Reveal } from '@/components/motion/Reveal';
import { stableInt } from '@/lib/stable-hash';
import { mockAttractions, getCrowdColor, getCrowdLabel } from '@/lib/mockData';
import {
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Zap,
  Award,
  Bell,
  MapPin,
  AlertTriangle,
} from 'lucide-react';

/** idea.md Screen 8 — DMO Dashboard Preview */
export default function DMODashboard() {
  const router = useRouter();
  const reduce = useReducedMotion();

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  const prdKpis = useMemo(
    () => [
      {
        icon: Users,
        label: 'Active visitors today',
        value: '48,200',
        hint: 'Live estimate',
      },
      {
        icon: AlertTriangle,
        label: 'Sites at capacity',
        value: '3',
        hint: 'Needs attention',
      },
      {
        icon: Zap,
        label: 'Routes re-optimised',
        value: '1,240',
        hint: 'Last 24h',
      },
      {
        icon: Award,
        label: 'Avg. crowd satisfaction',
        value: '4.2/5',
        hint: 'Survey blend',
      },
    ],
    []
  );

  const dashboardStats = useMemo(() => {
    return {
      totalVisitors: 48200,
      averageSatisfaction: 4.2,
      routesOptimized: 1240,
      peopleDiverted: 2847,
      emissionsSaved: 125,
      topAttraction: 'Riverside Park',
      leastCrowded: 'Garden District',
      peakHour: '14:00 - 15:00',
    };
  }, []);

  const attractionStats = useMemo(() => {
    return mockAttractions.map((attr) => ({
      ...attr,
      dailyVisitors: stableInt(attr.id, 100, 599),
      satisfaction: (stableInt(`${attr.id}-sat`, 0, 200) / 100 + 3.5).toFixed(1),
    }));
  }, []);

  const hourly = [2, 3, 4, 5, 5, 4, 3, 2, 3, 4, 5, 5];

  const alertLog = [
    {
      t: '14:32',
      text: 'Sagrada Família reached capacity. 340 tourists re-routed.',
    },
    {
      t: '13:15',
      text: 'Park Güell moderate. Advisory sent to 180 users.',
    },
  ];

  return (
    <PageShell 
      className="pb-safe-bottom-actions"
      header={
        <>
          <StatusBar />
          <TopAppBar
            title="DMO Dashboard — Barcelona"
            badge="BETA"
            showBack
            onBack={() => router.push('/')}
          />
        </>
      }
    >

      <main className="content-shell space-y-6 pb-4 pt-6 sm:pt-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-primary/80">
            Appendix · B2B preview
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Demand, diversion, and actions
          </h1>
        </Reveal>

        <Reveal delay={1}>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {prdKpis.map((k, i) => (
              <motion.div
                key={k.label}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <GlassCard hover className="h-full shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <k.icon className="h-4 w-4 text-primary" strokeWidth={2} />
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
                      {k.label}
                    </p>
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {k.value}
                  </p>
                  <p className="mt-1 text-xs text-primary/90">{k.hint}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={2}>
          <GlassCard hover={false} id="snapshot">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              Live density snapshot
            </h3>
            <div className="relative h-[200px] overflow-hidden rounded-xl border border-border/50 bg-muted/30">
              <svg
                className="absolute inset-0 h-full w-full text-foreground opacity-[0.08]"
                viewBox="0 0 100 60"
              >
                <defs>
                  <pattern
                    id="dmoMiniGrid"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 8 0 L 0 0 0 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="60" fill="url(#dmoMiniGrid)" />
              </svg>
              {mockAttractions.slice(0, 6).map((attr, i) => (
                <div
                  key={attr.id}
                  className="absolute"
                  style={{
                    left: `${15 + (i % 3) * 28}%`,
                    top: `${20 + Math.floor(i / 3) * 35}%`,
                  }}
                >
                  <div
                    className="h-3 w-3 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: getCrowdColor(attr.crowdLevel) }}
                    title={attr.name}
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-[0.65rem] text-muted-foreground">
              Prototype grid — same logic as traveller heatmap
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={3}>
          <GlassCard hover={false}>
            <h3 className="mb-4 font-display text-sm font-semibold text-foreground">
              Alert log
            </h3>
            <ul className="space-y-0 divide-y divide-border/50">
              {alertLog.map((row) => (
                <li key={row.t} className="flex gap-3 py-3 first:pt-0">
                  <Bell className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <div>
                    <p className="text-sm text-foreground">{row.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{row.t}</p>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={4}>
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
              Recommended DMO actions
            </h3>
            <div className="space-y-3">
              <GlassCard hover={false} className="border-primary/20">
                <p className="font-medium text-foreground">
                  Open Parc de la Ciutadella overflow zone
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Absorb spillover when Gothic Quarter hits amber.
                </p>
                <Button size="sm" className="mt-4" fullWidth>
                  Activate
                </Button>
              </GlassCard>
              <GlassCard hover={false}>
                <p className="font-medium text-foreground">
                  Push advisory to users near Gràcia district
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Nudge flows before the evening peak.
                </p>
                <Button variant="outline" size="sm" className="mt-4" fullWidth>
                  Send alert
                </Button>
              </GlassCard>
            </div>
          </div>
        </Reveal>

        <Reveal delay={5}>
          <GlassCard hover={false} className="border-primary/20" id="reports">
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Key insights
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Peak hours', dashboardStats.peakHour],
                ['Most popular', dashboardStats.topAttraction],
                ['Quiet corridor', dashboardStats.leastCrowded],
                [
                  'People diverted',
                  `${(dashboardStats.peopleDiverted / 1000).toFixed(1)}K`,
                ],
              ].map(([a, b]) => (
                <li
                  key={String(a)}
                  className="flex justify-between gap-4 border-b border-border/40 pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-muted-foreground">{a}</span>
                  <span className="font-medium text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={6}>
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-foreground">
              <BarChart3 className="h-5 w-5 text-primary" />
              Attraction performance
            </h3>
            <div className="space-y-3">
              {attractionStats.map((attr, i) => (
                <motion.div
                  key={attr.id}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.04, duration: 0.4 }}
                >
                  <GlassCard hover className="py-3">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display text-sm font-semibold text-foreground">
                          {attr.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {attr.dailyVisitors} visitors today
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className="ml-auto h-3 w-3 rounded-full ring-2 ring-white/50"
                          style={{
                            backgroundColor: getCrowdColor(attr.crowdLevel),
                          }}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          {getCrowdLabel(attr.crowdLevel)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={reduce ? false : { width: 0 }}
                          whileInView={
                            reduce
                              ? undefined
                              : { width: `${(attr.crowdLevel / 5) * 100}%` }
                          }
                          viewport={{ once: true }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <span className="shrink-0 text-muted-foreground">
                        {attr.satisfaction}★
                      </span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={7}>
          <GlassCard hover={false}>
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-foreground">
              <Clock className="h-5 w-5 text-primary" />
              Hourly traffic pattern
            </h3>
            <div className="flex h-36 items-end gap-1">
              {hourly.map((level, idx) => (
                <div
                  key={idx}
                  className="flex h-full flex-1 items-end justify-center"
                >
                  <motion.div
                    className="w-full max-w-[90%] rounded-t-md"
                    style={{
                      height: `${Math.max(12, (level / 5) * 100)}%`,
                      backgroundColor: getCrowdColor(level),
                      transformOrigin: 'bottom',
                    }}
                    initial={reduce ? false : { scaleY: 0 }}
                    whileInView={reduce ? undefined : { scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: idx * 0.04,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>9 AM</span>
              <span>3 PM</span>
              <span>9 PM</span>
            </div>
          </GlassCard>
        </Reveal>
      </main>
    </PageShell>
  );
}
