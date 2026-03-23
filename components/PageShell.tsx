import { motion, AnimatePresence } from 'framer-motion'
import { AppBackground } from '@/components/AppBackground'
import { cn } from '@/lib/utils'

type PageShellProps = {
  children: React.ReactNode
  className?: string
  backgroundVariant?: 'default' | 'warm' | 'alert'
  header?: React.ReactNode
  footer?: React.ReactNode
}

export function PageShell({
  children,
  className,
  backgroundVariant = 'default',
  header,
  footer,
}: PageShellProps) {
  return (
    <div
      className={cn(
        'relative min-h-[100dvh] overflow-x-hidden bg-background text-foreground',
        className
      )}
    >
      <AppBackground variant={backgroundVariant} />
      
      {header && <div className="relative z-50">{header}</div>}

      <AnimatePresence mode="wait">
        <motion.div
          key="page-content"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn('relative z-10', header && 'pt-14', className)}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {footer && <div className="relative z-50">{footer}</div>}
    </div>
  )
}
