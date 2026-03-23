'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { cardHover } from '@/lib/motion-variants'

type GlassCardProps = {
  children: React.ReactNode
  className?: string
  hover?: boolean
  id?: string
}

export function GlassCard({ children, className, hover = true, id }: GlassCardProps) {
  const reduce = useReducedMotion()

  const base =
    'rounded-2xl border border-border/60 bg-card/70 p-4 shadow-[0_8px_32px_-12px_oklch(0.2_0.02_158_/_0.12)] backdrop-blur-xl ring-1 ring-white/30 dark:ring-white/5'

  if (reduce || !hover) {
    return (
      <div id={id} className={cn(base, className)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      id={id}
      className={cn(base, className)}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
    >
      {children}
    </motion.div>
  )
}
