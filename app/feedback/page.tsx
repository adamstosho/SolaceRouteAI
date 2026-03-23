'use client';

import React, { useState } from 'react';
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
  ENJOYMENT_OPTIONS,
  type CrowdAccuracy,
} from '@/lib/tripFeedback';
import {
  Star,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const CROWD_OPTIONS: { id: CrowdAccuracy; label: string }[] = [
  { id: 'spot_on', label: 'Spot on' },
  { id: 'slightly_off', label: 'Slightly off' },
  { id: 'very_wrong', label: 'Very wrong' },
];

export default function FeedbackPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { setFeedback, setCurrentStep } = useTrip();
  const [satisfaction, setSatisfaction] = useState(4);
  const [comment, setComment] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [crowdAccuracy, setCrowdAccuracy] = useState<CrowdAccuracy | null>(
    'spot_on'
  );
  const [enjoymentTags, setEnjoymentTags] = useState<string[]>([
    'No queues',
    'Discovered something new',
  ]);

  const toggleEnjoyment = (tag: string) => {
    setEnjoymentTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    setFeedback({
      satisfaction,
      comment,
      wouldRecommend,
      crowdAccuracy,
      enjoymentTags,
      skipped: false,
    });
    setCurrentStep(6);
    toast.success('Feedback saved', {
      description: 'Thanks — this helps everyone route more calmly.',
    });
    router.push('/thankyou');
  };

  const handleSkip = () => {
    setFeedback({
      satisfaction,
      comment: '',
      wouldRecommend: true,
      crowdAccuracy: null,
      enjoymentTags: [],
      skipped: true,
    });
    setCurrentStep(6);
    toast.message('Skipped for now', {
      description: 'You can share feedback on your next visit.',
    });
    router.push('/thankyou');
  };

  return (
    <PageShell className="pb-safe-bottom-actions">
      <StatusBar />
      <TopAppBar title="How was your visit?" showBack={false} />

      <main className="content-shell space-y-6 pb-4 pt-6 sm:pt-8">
        <Reveal>
          <ProgressRail step={3} />
        </Reveal>

        <Reveal delay={1}>
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-4 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <CheckCircle2 className="h-7 w-7" strokeWidth={2} />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Visit complete!
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Riverside Park · 9:00 – 11:05 AM
            </p>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <GlassCard hover={false}>
            <label className="mb-4 block text-center font-display text-sm font-semibold text-foreground sm:text-left">
              Rate your experience
            </label>
            <div className="flex justify-between gap-1 sm:justify-center sm:gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setSatisfaction(star)}
                  whileTap={reduce ? undefined : { scale: 0.88 }}
                  aria-label={`${star} of 5`}
                  className="rounded-xl p-2"
                >
                  <Star
                    className={cn(
                      'h-9 w-9 transition-all sm:h-10 sm:w-10',
                      star <= satisfaction
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-border'
                    )}
                    strokeWidth={1.25}
                  />
                </motion.button>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Tap to rate
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={3}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              How accurate was our crowd prediction?
            </label>
            <div className="flex flex-wrap gap-2">
              {CROWD_OPTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCrowdAccuracy(id)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                    crowdAccuracy === id
                      ? 'border-primary bg-primary/12 text-primary'
                      : 'border-border/70 bg-card/50'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Recommend SolaceRouteAI to others?
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setWouldRecommend(true)}
                className={cn(
                  'flex-1 rounded-xl border-2 py-3 text-sm font-semibold',
                  wouldRecommend
                    ? 'border-primary bg-primary/12 text-primary'
                    : 'border-border/70'
                )}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setWouldRecommend(false)}
                className={cn(
                  'flex-1 rounded-xl border-2 py-3 text-sm font-semibold',
                  !wouldRecommend
                    ? 'border-destructive/50 bg-destructive/10 text-destructive'
                    : 'border-border/70'
                )}
              >
                No
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={5}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              What did you enjoy?
            </label>
            <div className="flex flex-wrap gap-2">
              {ENJOYMENT_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleEnjoyment(tag)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                    enjoymentTags.includes(tag)
                      ? 'border-primary bg-primary/12 text-primary'
                      : 'border-border/70 bg-card/50'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={6}>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <MessageSquare className="h-4 w-4 text-primary" />
              Anything else?
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us more (optional)…"
              maxLength={500}
              rows={4}
              className="w-full resize-none rounded-xl border border-border/70 bg-muted/40 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-2 text-right text-xs text-muted-foreground">
              {comment.length}/500
            </p>
          </div>
        </Reveal>

        <Reveal delay={7}>
          <div className="flex gap-3 rounded-xl border border-border/50 bg-muted/30 p-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Your feedback is anonymised and helps improve routes for all
              travellers.
            </p>
          </div>
        </Reveal>
      </main>

      <div className="fixed-bottom-action-bar">
        <div className="mx-auto w-full max-w-lg space-y-2">
          <Button size="lg" fullWidth onClick={handleSubmit}>
            Submit feedback
          </Button>
          <Button variant="ghost" size="lg" fullWidth onClick={handleSkip}>
            Skip for now
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
