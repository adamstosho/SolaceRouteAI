import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Wifi, WifiOff } from 'lucide-react'

export function StatusBar({ className }: { className?: string }) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine)
      const handleOnline = () => setIsOnline(true)
      const handleOffline = () => setIsOnline(false)
      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)
      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }
  }, [])

  return (
    <div
      className={cn(
        'flex h-6 flex-row items-center space-x-1 border-b border-border/60 bg-card/40 px-3 backdrop-blur-md transition-colors',
        !isOnline && 'bg-destructive/10',
        className
      )}
    >
      <div className="flex flex-1 items-center gap-1.5 overflow-hidden">
        {isOnline ? (
          <Wifi className="h-2.5 w-2.5 text-primary" />
        ) : (
          <WifiOff className="h-2.5 w-2.5 text-destructive" />
        )}
        <span className={cn(
          "truncate text-[0.6rem] font-bold uppercase tracking-widest",
          isOnline ? "text-primary/70" : "text-destructive"
        )}>
          {isOnline ? 'Live Crowd Sync' : 'Offline Mode: Using Predicted Data'}
        </span>
      </div>
      <div className="text-[0.6rem] font-medium text-muted-foreground/60 tabular-nums">
        {isOnline ? 'Updated 2m ago' : 'Last sync: 14:02'}
      </div>
    </div>
  )
}
