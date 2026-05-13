import React from 'react';
import clsx from 'clsx';

export const TAXONOMY = [
  "GenAI & LLMs",
  "AI Ethics",
  "Vulnerability Management",
  "AI Red Team",
  "Azure",
  "Drones",
  "Swarm Intelligence",
  "Robotics",
  "Synthetic Biology",
  "Brain-Computer Interfaces",
  "Neuroscience",
  "Cognitive Science",
  "Privacy & Anonymity",
  "Privacy Enhancing Tech"
] as const;

interface ResearchFiltersProps {
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  tagCounts: Record<string, number>;
  onClear: () => void;
}

export default function ResearchFilters({
  activeTags,
  onToggleTag,
  tagCounts,
  onClear,
}: ResearchFiltersProps) {
  return (
    <div className="space-y-3 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm text-gray-400">RESEARCH VECTORS</h3>
        {activeTags.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-mono text-gray-500 hover:text-primary transition-colors"
          >
            [exit]
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {TAXONOMY.map((tag) => {
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
  );
}
