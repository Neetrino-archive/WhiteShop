'use client';

import { Shuffle } from 'lucide-react';

interface CompareIconProps {
  /**
   * Optional custom size in pixels; defaults to 20.
   */
  size?: number;
  /**
   * Optional stroke width for Shuffle icon strokes.
   */
  strokeWidth?: number;
  /**
   * Allows passing custom utility classes for color/spacing.
   */
  className?: string;
  /**
   * Preserved flag for legacy usage to highlight active state.
   */
  isActive?: boolean;
}

/**
 * Unified Compare icon that mirrors the mobile Shuffle glyph.
 */
export function CompareIcon({
  size = 18,
  strokeWidth = 1.8,
  className = '',
  isActive = false,
}: CompareIconProps) {
  const resolvedClassName = `${className} ${isActive ? '' : ''}`.trim();
  return (
    <Shuffle
      size={size}
      strokeWidth={strokeWidth}
      className={resolvedClassName || undefined}
    />
  );
}

