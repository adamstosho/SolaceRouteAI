'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PageShell } from '@/components/PageShell';
import { StatusBar } from '@/components/StatusBar';
import { WelcomeHero } from '@/components/WelcomeHero';
import { Sparkles, BarChart3, Fingerprint, Database, Globe } from 'lucide-react';

const statuses = [
  { icon: Database, text: 'Accessing live visitor sensor data...' },
  { icon: Globe, text: 'Loading destination capacity limits...' },
  { icon: BarChart3, text: 'Predicting upcoming congestion spikes...' },
  { icon: Fingerprint, text: 'Matching with your travel preferences...' },
  { icon: Sparkles, text: 'Generating your optimal solace route...' },
];

export default function ProcessingPage() {
  const router = useRouter();
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStatusIdx((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 1200);

    const redirectTimer = setTimeout(() => {
      router.push('/heatmap');
    }, 6500);

    return () => {
      clearInterval(statusTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <PageShell className="flex min-h-[100dvh] flex-col items-center justify-center text-center">
      <StatusBar />
      
      <div className="content-shell flex flex-1 flex-col items-center justify-center">
        {/* Central Animation */}
        <div className="relative mb-12">
          <WelcomeHero />
          <motion.div
            className="absolute -inset-8 rounded-full border border-primary/10"
            animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-16 rounded-full border border-primary/5"
            animate={{ scale: [1, 1.6, 1], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        {/* AI Thinking Messages */}
        <div className="h-20 w-full max-w-sm px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={statusIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-3 text-primary">
                {React.createElement(statuses[statusIdx].icon, { className: "h-5 w-5" })}
                <p className="font-display text-lg font-medium text-foreground">
                  {statuses[statusIdx].text}
                </p>
              </div>
              
              {/* Progress dots */}
              <div className="flex gap-1.5">
                {statuses.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 w-6 rounded-full"
                    initial={false}
                    animate={{
                      backgroundColor: i <= statusIdx 
                        ? 'oklch(0.58 0.16 158)' 
                        : 'oklch(0.58 0.16 158 / 0.15)'
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <motion.p 
          className="mt-12 text-xs tracking-[0.2em] uppercase text-muted-foreground/60"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Solace Engine v1.0
        </motion.p>
      </div>
    </PageShell>
  );
}
