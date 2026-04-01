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

type DepthType = 'all' | 'foundational' | 'emerging';

interface ResearchFiltersProps {
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  activeDepth: DepthType;
  setDepth: (depth: DepthType) => void;
  tagCounts: Record<string, number>;
}

export default function ResearchFilters({
  activeTags,
  onToggleTag,
  activeDepth,
  setDepth,
  tagCounts
}: ResearchFiltersProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Depth Toggle */}
      <div className="flex flex-col space-y-3">
        <h3 className="font-mono text-sm text-gray-400">DEPTH_LEVEL</h3>
        <div className="flex flex-wrap gap-2">
          {(['all', 'foundational', 'emerging'] as DepthType[]).map((depth) => (
            <button
              key={depth}
              onClick={() => setDepth(depth)}
              className={clsx(
                "px-2.5 py-1 text-xs font-mono border rounded-md transition-all duration-300 uppercase",
                activeDepth === depth 
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_10px_rgba(0,255,128,0.15)]" 
                  : "border-border/50 bg-black text-gray-500 hover:border-primary/50 hover:text-gray-300"
              )}
            >
              {depth}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="flex flex-col space-y-3">
        <h3 className="font-mono text-sm text-gray-400">RESEARCH_VECTORS</h3>
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
    </div>
  );
}
