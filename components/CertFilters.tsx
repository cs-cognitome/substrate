import React from 'react';
import clsx from 'clsx';

export const CERT_TAXONOMY = [
  "Azure",
  "Blue Team",
  "Drones",
  "AWS",
  "Offensive",
  "AI",
  "Threat Intelligence",
  "AI Security",
  "Microsoft",
] as const;

interface CertFiltersProps {
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  tagCounts: Record<string, number>;
}

export default function CertFilters({
  activeTags,
  onToggleTag,
  tagCounts,
}: CertFiltersProps) {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row flex-wrap gap-2">
          {CERT_TAXONOMY.map((tag) => {
            const count = tagCounts[tag] || 0;
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={clsx(
                  "px-2.5 py-1 text-xs font-mono border rounded-md transition-all duration-300 flex items-center gap-1.5",
                  isActive
                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_10px_rgba(0,255,128,0.15)]"
                    : "border-border/50 bg-black text-gray-500 hover:border-primary/50 hover:text-gray-300"
                )}
              >
                <span>{tag}</span>
                <span className={clsx(
                  "text-[10px] px-1.5 py-0.5 rounded flex items-center justify-center",
                  isActive ? "bg-primary/20 text-primary" : "bg-surface border border-border/50 text-gray-500"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
