'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopAppBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  /** When set, replaces the back control (e.g. heatmap menu — idea.md Screen 3). */
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  /** e.g. "BETA" for DMO dashboard (PRD) */
  badge?: string;
}

export const TopAppBar = ({
  title,
  showBack = false,
  onBack,
  leftAction,
  rightAction,
  badge,
}: TopAppBarProps) => {
  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-between border-b border-primary/5 bg-background/60 px-4 backdrop-blur-2xl backdrop-saturate-150 transition-all sm:px-6"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {leftAction ? (
          <div className="-ml-1 shrink-0">{leftAction}</div>
        ) : showBack ? (
          <motion.button
            type="button"
            onClick={onBack}
            whileTap={{ scale: 0.94 }}
            className="-ml-1 shrink-0 rounded-xl p-2 text-foreground transition-colors hover:bg-muted/80"
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
          </motion.button>
        ) : null}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {title}
            </h1>
            {badge ? (
              <span className="shrink-0 rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                {badge}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="rounded-xl p-2 text-foreground transition-colors hover:bg-muted/80"
              aria-label="Select language"
            >
              <Languages className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[120px]">
            <DropdownMenuItem className="font-medium">English</DropdownMenuItem>
            <DropdownMenuItem>Español</DropdownMenuItem>
            <DropdownMenuItem>Català</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {rightAction}
      </div>
    </motion.header>
  );
};
