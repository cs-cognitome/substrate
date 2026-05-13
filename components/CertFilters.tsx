import React from 'react';
import clsx from 'clsx';

const CERT_TAXONOMY = [
  "Defensive",
  "Offensive",
  "AWS",
  "Cloud",
  "Azure",
  "Microsoft",
] as const;

// Tags derived dynamically from certs data, so no hardcoded taxonomy needed
interface CertFiltersProps {
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  tagCounts: Record<string, number>;
  onClear: () => void;
}

export default function CertFilters({
  activeTags,
  onToggleTag,
  tagCounts,
  onClear,
}: CertFiltersProps) {
  return (
    <div className="space-y-3 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm text-gray-400">CHOOSE TAG</h3>
        {activeTags.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-mono text-gray-500 hover:text-primary transition-colors"
          >
            [CLEAR]
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        {CERT_TAXONOMY.map((tag) => {
          const count = tagCounts[tag] || 0;
          const isActive = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={clsx(
                "px-2.5 py-1 text-xs font-mono border rounded-md transition-all duration-300 flex items-center justify-between w-full",
                isActive
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_10px_rgba(0,255,128,0.15)]"
                  : "border-border/50 bg-black text-gray-500 hover:border-primary/50 hover:text-gray-300"
              )}
            >
              <span>{tag}</span>
              <span className={clsx(
                "text-[10px] px-1.5 py-0.5 rounded",
                isActive ? "bg-primary/20 text-primary" : "bg-surface border border-border/50 text-gray-500"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
