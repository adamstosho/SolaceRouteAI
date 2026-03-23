'use client'

import { cn } from '@/lib/utils'

export function StatusBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-3 shrink-0 border-b border-border/60 bg-card/40 backdrop-blur-md sm:h-4',
        className
      )}
      aria-hidden
    />
  )
}
