import React from 'react';
import { useSashStudio } from '../context/SashStudioContext';

/**
 * SmartSpaceMeter
 * Displays available embroidery space percentage and word limits
 * Matches the exact UI indicator shown in the designer screenshots.
 */
export default function SmartSpaceMeter({ className = "" }) {
  const { totalSpacePercentage, hasOverlap, nameSpaceUsage, verseSpaceUsage } = useSashStudio();

  const isWarning = totalSpacePercentage > 85 || hasOverlap;

  return (
    <div className={`bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-3 shadow-md flex items-center justify-between gap-4 ${className}`}>
      <div className="flex flex-col">
        <span className="font-embroidery text-sash-black text-xs tracking-wider uppercase leading-none">
          Embroidery Space
        </span>
        {hasOverlap && (
          <span className="text-[10px] text-red-600 font-medium tracking-tight mt-0.5">
            Space limit exceeded
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Progress Bar */}
        <div className="w-24 md:w-32 h-2.5 bg-zinc-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              isWarning ? 'bg-red-600' : 'bg-sash-gold'
            }`}
            style={{ width: `${Math.min(100, totalSpacePercentage)}%` }}
          />
        </div>

        {/* Percentage Label */}
        <span className={`font-embroidery text-sm md:text-base tracking-wider ${
          isWarning ? 'text-red-600 font-bold' : 'text-sash-black'
        }`}>
          {totalSpacePercentage}%
        </span>
      </div>
    </div>
  );
}
