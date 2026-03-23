'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Variant = 'default' | 'warm' | 'alert'

const variantTint: Record<Variant, string> = {
  default: 'from-primary/25 via-teal-400/15 to-transparent',
  warm: 'from-amber-400/20 via-primary/20 to-transparent',
  alert: 'from-rose-400/15 via-amber-300/10 to-transparent',
}

export function AppBackground({ variant = 'default' }: { variant?: Variant }) {
  const reduce = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)
 
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Base wash */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,var(--glow-1),transparent_55%),radial-gradient(ellipse_90%_60%_at_100%_50%,var(--glow-2),transparent_50%),radial-gradient(ellipse_80%_50%_at_0%_80%,var(--glow-3),transparent_45%)]"
        style={{
          ['--glow-1' as string]: 'oklch(0.72 0.12 158 / 0.35)',
          ['--glow-2' as string]: 'oklch(0.75 0.08 200 / 0.2)',
          ['--glow-3' as string]: 'oklch(0.85 0.06 95 / 0.4)',
        }}
      />

      {/* Animated orbs */}
      {!reduce && (
        <>
          <motion.div
            className={`absolute -left-1/4 -top-1/4 h-[min(100vw,40rem)] w-[min(100vw,40rem)] rounded-full bg-gradient-to-br ${variantTint[variant]} blur-[120px]`}
            animate={{
              x: [0, 60, 0],
              y: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-1/4 -bottom-1/4 h-[min(90vw,36rem)] w-[min(90vw,36rem)] rounded-full bg-gradient-to-tl from-cyan-400/20 via-primary/15 to-transparent blur-[100px]"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[min(80vw,24rem)] w-[min(80vw,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-300/10 via-transparent to-teal-300/10 blur-[80px]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}

      {/* Subtle floating node-like particles */}
      {isMounted && !reduce && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/20 blur-[1px]"
              initial={{
                x: `${(20 + i * 20) % 100}%`,
                y: `${(15 + i * 25) % 100}%`,
                opacity: 0,
              }}
              animate={{
                y: [null, '-20%', '120%'],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                delay: i * 5,
                ease: 'linear',
              }}
            />
          ))}
        </>
      )}

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.5 0.02 158 / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.5 0.02 158 / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
