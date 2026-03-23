'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ProgressRail({
  step,
  total = 3,
  className,
}: {
  step: number
  total?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {Array.from({ length: total }).map((_, i) => {
        const isCurrent = i === step - 1
        const isPast = i < step - 1
        return (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <motion.div
              className={cn(
                'h-3 w-3 rounded-full border-2 transition-colors',
                isCurrent || isPast
                  ? 'bg-primary border-primary shadow-[0_0_10px_oklch(0.55_0.14_158_/_0.3)]'
                  : 'bg-transparent border-muted-foreground/30'
              )}
              initial={false}
              animate={{ 
                scale: isCurrent ? 1.2 : 1,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
