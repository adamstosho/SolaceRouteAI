'use client';

import React from 'react';
import { getCrowdColor, getCrowdLabel } from '@/lib/mockData';

interface CrowdBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const CrowdBadge = ({
  level,
  size = 'md',
  showLabel = true,
}: CrowdBadgeProps) => {
  const color = getCrowdColor(level);
  const label = getCrowdLabel(level);

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <span
        className={`${sizeClasses[size]} shrink-0 rounded-full`}
        style={{ backgroundColor: color }}
      />
      {showLabel && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}
    </span>
  );
};
