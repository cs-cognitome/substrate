"use client";

import React, { useState, useMemo } from 'react';
import CertFilters, { CERT_TAXONOMY } from './CertFilters';
import { Award, ExternalLink } from 'lucide-react';
import DecipheringText from './DecipheringText';
import Image from 'next/image';

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
    CERT_TAXONOMY.forEach(tag => counts[tag] = 0);
    certs.forEach(cert => {
      cert.tags?.forEach(tag => {
        if (counts[tag] !== undefined) {
          counts[tag]++;
        }
      });
    });
    return counts;
  }, [certs]);

  const filteredCerts = useMemo(() => {
    return certs.filter(cert => {
      if (activeTags.length > 0) {
        const certTags = cert.tags || [];
        const matches = activeTags.some(t => certTags.includes(t));
        if (!matches) return false;
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
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-mono text-primary flex items-center gap-3">
          <Award /> <DecipheringText text="certifications" speed={40} />
        </h1>
        <p className="mt-4 text-primary/50 font-mono text-sm leading-relaxed">
          Beyond the badges: a diligent and constant expansion of my tech-toolkit. These certifications represent a deeper dive into defensive and offensive security, hardened cloud infrastructure, and the intersection of Applied AI and LLM Security.
        </p>
        <p className="mt-3 text-gray-500 font-mono text-sm leading-relaxed">
          This synthesis of practical skill and architectural knowledge serves as my foundation for building, securing, and scaling resilient systems in complex environments.
        </p>
      </div>

      {/* Horizontal Filters */}
      <CertFilters
        activeTags={activeTags}
        onToggleTag={toggleTag}
        tagCounts={tagCounts}
      />

      {/* Cert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <div key={cert.id} className="animate-in slide-in-from-bottom-4 duration-500 group bg-surface border border-border/50 rounded-xl hover:border-primary/50 transition-colors flex flex-row h-full">
            {/* Left: text content */}
            <div className="flex-grow px-6 pt-5 pb-6 flex flex-col">
              <div className="text-xs text-gray-500 font-mono mb-1">{cert.date}</div>
              <h2 className="text-lg font-bold text-white mb-2 leading-tight">{cert.name}</h2>
              <div className="text-primary font-mono text-sm mb-3">{cert.issuer}</div>
              {cert.description && (
                <p className="text-gray-400 text-xs leading-relaxed">{cert.description}</p>
              )}
              {cert.tags && cert.tags.length > 0 && (
                <div className="mt-auto pt-6 flex flex-wrap gap-1.5">
                  {cert.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/5 border border-border/30 text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Right: badge column */}
            {cert.badge && (
              <div className="border-l border-border/25 p-4 flex items-center justify-center shrink-0 mt-5 mb-6">
                <Image
                  src={cert.badge}
                  alt={cert.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            )}
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
  );
}
