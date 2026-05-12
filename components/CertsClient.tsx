"use client";

import React, { useState, useMemo } from 'react';
import CertFilters from './CertFilters';
import { Award } from 'lucide-react';
import DecipheringText from './DecipheringText';
import Image from 'next/image';
import clsx from 'clsx';

interface Cert {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
  badge?: string;
  tags?: string[];
}

export default function CertsClient({ certs }: { certs: Cert[] }) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    certs.forEach(cert => {
      cert.tags?.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [certs]);

  const filteredCerts = useMemo(() => {
    return certs.filter(cert => {
      if (activeTags.length > 0) {
        const certTags = cert.tags || [];
        return activeTags.some(t => certTags.includes(t));
      }
      return true;
    });
  }, [certs, activeTags]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Page header */}
      <div className="pb-2">
        <h1 className="text-3xl font-mono text-primary flex items-center gap-3">
          <Award /> <DecipheringText text="certs" speed={40} />
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left sidebar */}
        <div className="w-full lg:w-1/4 shrink-0 lg:sticky lg:top-24 space-y-8">
          {/* Description */}
          <div className="space-y-3">
            <p className="text-primary/50 font-mono text-sm leading-relaxed">
              Beyond the badges: a diligent and constant expansion of my tech-toolkit.
            </p>
            <p className="text-gray-500 font-mono text-sm leading-relaxed">
              {/* TODO: Replace with real description */}
              A synthesis of practical skill and architectural knowledge — the foundation for building, securing, and scaling resilient systems.
            </p>
          </div>

          {/* Filters */}
          <CertFilters
            activeTags={activeTags}
            onToggleTag={toggleTag}
            tagCounts={tagCounts}
            onClear={() => setActiveTags([])}
          />
        </div>

        {/* Right: cert cards grid */}
        <div className="w-full lg:w-3/4">
          <div className="mb-6 flex justify-between items-center bg-surface/30 p-4 border border-border/50 rounded-lg">
            <div className="font-mono text-sm text-gray-400">
              SHOWING <span className="text-primary font-bold">{filteredCerts.length}</span> CERT{filteredCerts.length !== 1 && 'S'}
            </div>
            {activeTags.length > 0 && (
              <button
                onClick={() => setActiveTags([])}
                className="text-xs font-mono text-gray-500 hover:text-primary transition-colors"
              >
                [CLEAR_FILTERS]
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className="group relative flex flex-col bg-surface border border-border/50 rounded-xl hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,102,0.08)] overflow-hidden min-h-[300px]"
              >
                {/* Top glow line on hover */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />

                {/* Card content */}
                <div className="flex flex-col flex-grow p-6">
                  {/* Date */}
                  <div className="text-primary font-mono text-xs mb-3 tracking-wide">
                    {cert.date}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-primary/90 transition-colors">
                    {cert.name}
                  </h2>

                  {/* Description */}
                  {cert.description && (
                    <p className="text-gray-500 text-sm leading-relaxed font-mono font-light tracking-wide flex-grow">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Bottom row: tags + badge */}
                <div className="flex items-end justify-between px-6 pb-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.tags?.map(tag => (
                      <span
                        key={tag}
                        className={clsx(
                          "text-[11px] font-mono px-2.5 py-1 rounded border transition-colors",
                          activeTags.includes(tag)
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border/50 bg-black text-gray-400"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Badge */}
                  {cert.badge && (
                    <div className="shrink-0 ml-4">
                      <Image
                        src={cert.badge}
                        alt={cert.name}
                        width={90}
                        height={90}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredCerts.length === 0 && (
              <div className="col-span-full p-12 border border-dashed border-border/50 text-center font-mono text-gray-500 rounded-xl bg-surface/50 flex flex-col items-center justify-center space-y-4">
                <div className="text-primary/50 text-4xl">∅</div>
                <div>NO CERTS MATCH THE SPECIFIED VECTORS.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
