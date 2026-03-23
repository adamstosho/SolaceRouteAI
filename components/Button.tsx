'use client';

import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const reduce = useReducedMotion();

    const baseStyles =
      'relative font-medium rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';

    const variantStyles = {
      primary:
        'bg-primary text-primary-foreground shadow-[0_4px_24px_-4px_oklch(0.45_0.14_158_/_0.55)] hover:bg-primary/92 active:bg-primary/85',
      secondary:
        'bg-secondary/90 text-secondary-foreground border border-border/80 hover:bg-secondary backdrop-blur-sm',
      outline:
        'border-2 border-primary/80 text-primary bg-card/40 backdrop-blur-sm hover:bg-primary/10 active:bg-primary/[0.15]',
      ghost:
        'text-foreground hover:bg-muted/80 active:bg-muted/60 rounded-xl',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-base sm:text-base',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthClass,
          className
        )}
        disabled={disabled || loading}
        whileHover={reduce || disabled || loading ? {} : { scale: 1.01 }}
        whileTap={reduce || disabled || loading ? {} : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        {...props}
      >
        {variant === 'primary' && !reduce && (
          <span
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.2) 50%, transparent 60%)',
            }}
          />
        )}
        {loading ? (
          <svg
            className="relative z-[1] w-4 h-4 animate-spin shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
