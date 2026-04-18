'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Attraction } from '@/lib/mockData';
import { MapPin, Clock, Sparkles } from 'lucide-react';
import { CrowdBadge } from './CrowdBadge';
import { cn } from '@/lib/utils';

interface AttractionCardProps {
  attraction: Attraction;
  onSelect?: (attraction: Attraction) => void;
  selected?: boolean;
}

export const AttractionCard = ({
  attraction,
  onSelect,
  selected = false,
}: AttractionCardProps) => {
  const reduce = useReducedMotion();
  const best = attraction.bestVisitTime;
  const ai = attraction.aiSuggestion;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(attraction);
        }
      }}
      onClick={() => onSelect?.(attraction)}
      whileHover={reduce ? undefined : { y: -3 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={cn(
        'group cursor-pointer rounded-2xl border p-4 shadow-[0_12px_40px_-16px_oklch(0.25_0.04_158_/_0.18)] transition-colors',
        selected
          ? 'border-primary bg-primary/[0.08] ring-2 ring-primary/25'
          : 'border-border/70 bg-card/75 backdrop-blur-xl hover:border-primary/35 hover:bg-card/90'
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/70 opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
              {attraction.name}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-foreground">
              {attraction.category}
            </span>
            {attraction.isCommunityPartner && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-tight text-primary">
                🌱 Community Partner
              </span>
            )}
          </div>
        </div>
        <CrowdBadge level={attraction.crowdLevel} size="sm" showLabel />
      </div>

      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {attraction.description}
      </p>

      {best ? (
        <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
          Best time: <span className="text-primary">{best}</span>
        </p>
      ) : null}

      {ai ? (
        <p className="mb-3 border-l-2 border-primary/40 pl-3 text-xs italic leading-relaxed text-primary">
          AI suggests: {ai}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-primary/80" />
          ~{attraction.estTime} min visit
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary/80" />
          Grid {attraction.gridX},{attraction.gridY}
        </span>
      </div>
    </motion.div>
  );
};
