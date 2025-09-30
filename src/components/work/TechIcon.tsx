'use client';

import { TECH_ICONS } from '@/lib/iconMapping';
import { cn } from '@/lib/utils';

interface TechIconProps {
  tech: string;
  className?: string;
}

export function TechIcon({ tech, className }: TechIconProps) {
  // Normalize the tech name to lowercase for matching
  const normalizedTech = tech.toLowerCase();
  const Icon = TECH_ICONS[normalizedTech] || TECH_ICONS[normalizedTech.replace('.', '')];
  
  if (!Icon) {
    return null;
  }

  return (
    <div 
      className={cn(
        'p-2 rounded-md bg-muted border border-border',
        className
      )}
    >
      <Icon size="1.5em" />
    </div>
  );
}
