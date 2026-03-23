'use client';

import { Toaster } from 'sonner';

/** Sonner without next-themes — matches app light shell */
export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      duration={3200}
      style={{ zIndex: 100 }}
      toastOptions={{
        classNames: {
          toast:
            'rounded-xl border border-border/60 bg-card/95 text-foreground shadow-lg backdrop-blur-md',
          title: 'font-medium',
          description: 'text-muted-foreground text-sm',
        },
      }}
    />
  );
}
