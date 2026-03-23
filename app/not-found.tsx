import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <div className="h-3 border-b border-border/60 bg-card/40 backdrop-blur-md sm:h-4" />
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-12 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-primary/25 bg-primary/10 shadow-[0_20px_50px_-18px_oklch(0.45_0.12_158_/_0.35)]">
          <Compass className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary/80">
          404
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          This path isn&apos;t on the map
        </h1>
        <p className="mt-4 max-w-md text-pretty text-muted-foreground">
          The page may have moved, or the link is wrong. Head back to
          SolaceRouteAI and continue your calmer-city journey.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_4px_24px_-4px_oklch(0.45_0.14_158_/_0.55)] transition-colors hover:bg-primary/92"
        >
          <Home className="h-5 w-5" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
