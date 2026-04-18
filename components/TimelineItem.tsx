'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Attraction } from '@/lib/mockData';
import { Clock, MapPin, Sparkles, ChevronUp, ChevronDown, CloudSun, Utensils, Car, Gift } from 'lucide-react';
import { CrowdBadge } from './CrowdBadge';

interface TimelineItemProps {
  attraction: Attraction;
  startTime: string;
  endTime: string;
  isLast?: boolean;
  order: number;
  /** Override AI note (defaults to attraction.aiSuggestion) */
  aiReason?: string;
  isEditing?: boolean;
  onReorder?: (dir: 'up' | 'down') => void;
}

export const TimelineItem = ({
  attraction,
  startTime,
  endTime,
  isLast = false,
  order,
  aiReason,
  isEditing,
  onReorder,
}: TimelineItemProps) => {
  const reduce = useReducedMotion();
  const note = aiReason ?? attraction.aiSuggestion;
  const hours = attraction.estTime / 60;
  const durationLabel =
    hours >= 1
      ? hours % 1 === 0
        ? `Approx. ${hours} hour${hours > 1 ? 's' : ''}`
        : `Approx. ${hours.toFixed(1)} hours`
      : `Approx. ${attraction.estTime} min`;

  // Simulated live data for the prototype
  const liveInsights = [
    {
      icon: CloudSun,
      text: "22°C · Sunny",
      visible: attraction.category === 'Nature' || attraction.category === 'Architecture'
    },
    {
      icon: Utensils,
      text: "Local Tip: Tapas bar nearby is quiet",
      visible: attraction.category === 'Heritage' || attraction.category === 'Food & Drink'
    },
    {
      icon: Car,
      text: "Traffic: Light flow on Via Laietana",
      visible: attraction.id === 'bcn-1' || attraction.id === 'bcn-4'
    }
  ].filter(i => i.visible);

  // Incentive logic: Quiet places get vouchers!
  const hasVoucher = attraction.crowdLevel <= 2;

  return (
    <motion.div
      className="relative flex gap-4 pb-2"
      initial={reduce ? false : { opacity: 0, x: -12 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="z-10 h-3.5 w-3.5 rounded-full border-[3px] border-background bg-gradient-to-br from-primary to-emerald-500 shadow-[0_0_0_4px_oklch(0.52_0.14_158_/_0.2)]"
          initial={reduce ? false : { scale: 0 }}
          whileInView={reduce ? undefined : { scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 }}
        />
        {!isLast && (
          <div
            className="my-1 min-h-[4.5rem] w-px flex-1 border-l border-dashed border-primary/35"
            aria-hidden
          />
        )}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {startTime}
          </p>
          {liveInsights[0] && (
            <div className="flex items-center gap-1 text-[0.65rem] font-bold text-muted-foreground/80">
              {React.createElement(liveInsights[0].icon, { className: "h-3 w-3" })}
              {liveInsights[0].text}
            </div>
          )}
        </div>
        <motion.div
          className="mb-2 rounded-2xl border border-border/60 bg-card/70 p-3.5 shadow-[0_8px_28px_-12px_oklch(0.2_0.03_158_/_0.15)] backdrop-blur-md"
          whileHover={reduce ? undefined : { y: -2 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        >
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {attraction.name}
                </h3>
                {hasVoucher && (
                  <span className="flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[0.6rem] font-bold text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
                    <Gift className="h-2.5 w-2.5" />
                    SOLACE REWARD
                  </span>
                )}
              </div>
              <span className="mt-1 inline-block rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[0.65rem] font-medium text-foreground">
                {attraction.category}
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <div className="flex items-center gap-1.5">
                {isEditing && (
                  <div className="flex flex-col gap-0.5 mr-1">
                    <button 
                      onClick={() => onReorder?.('up')}
                      className="p-1 hover:bg-primary/10 rounded text-primary transition-colors"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => onReorder?.('down')}
                      className="p-1 hover:bg-primary/10 rounded text-primary transition-colors"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
                  {order}
                </span>
              </div>
              <CrowdBadge level={attraction.crowdLevel} size="sm" showLabel />
            </div>
          </div>

          <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3 text-primary" />
              {startTime} – {endTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" />
              {durationLabel}
            </span>
          </div>

          {note ? (
            <div className="space-y-2 border-t border-border/40 pt-2">
              <p className="flex gap-1.5 text-xs italic leading-relaxed text-primary">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary/80" />
                <span>{note}</span>
              </p>
              
              {/* Secondary live insights like food/traffic alerts */}
              {liveInsights.slice(1).map((insight, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-lg bg-primary/5 px-2 py-1.5 text-[0.65rem] text-primary-foreground/90 font-medium">
                  {React.createElement(insight.icon, { className: "h-3 w-3 text-primary" })}
                  {insight.text}
                </div>
              ))}
              
              {hasVoucher && (
                <div className="mt-2 flex items-center justify-between rounded-xl bg-amber-500 px-3 py-2 text-white shadow-sm ring-1 ring-amber-600/20">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider">Claim 20% Solace Discount</span>
                  </div>
                  <div className="text-[0.6rem] font-medium opacity-90">CODE: SOLACE24</div>
                </div>
              )}
            </div>
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
};
