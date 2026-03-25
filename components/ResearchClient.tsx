"use client";

import React, { useState, useMemo } from 'react';
import { PostMetadata } from '@/utils/getPosts';
import ResearchFilters, { TAXONOMY } from './ResearchFilters';
import ResearchCard from './ResearchCard';
import { BookOpen } from 'lucide-react';
import DecipheringText from './DecipheringText';

export default function ResearchClient({ posts }: { posts: PostMetadata[] }) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeDepth, setActiveDepth] = useState<'all' | 'foundational' | 'emerging'>('all');

  // Compute total counts for each tag globally
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TAXONOMY.forEach(tag => counts[tag] = 0);
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        if (counts[tag] !== undefined) {
          counts[tag]++;
        }
      });
    });
    return counts;
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Check depth
      if (activeDepth !== 'all' && post.depth !== activeDepth) {
        return false;
      }
      
      // Check tags (OR logic: if any selected tag is in post.tags)
      if (activeTags.length > 0) {
        const postTags = post.tags || [];
        const matches = activeTags.some(t => postTags.includes(t));
        if (!matches) return false;
      }

      return true;
    });
  }, [posts, activeTags, activeDepth]);

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
          <BookOpen /> <DecipheringText text="research_logs" speed={40} />
        </h1>
        <p className="mt-4 text-gray-400 font-mono flex items-center gap-2 max-w-2xl">
          <span className="text-primary">&gt;</span> Public disclosures, vulnerability research, and technical write-ups.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 shrink-0 lg:sticky lg:top-24">
          <ResearchFilters 
            activeTags={activeTags}
            onToggleTag={toggleTag}
            activeDepth={activeDepth}
            setDepth={setActiveDepth}
            tagCounts={tagCounts}
          />
        </div>

        {/* Results Grid */}
        <div className="w-full lg:w-3/4">
          <div className="mb-6 flex justify-between items-center bg-surface/30 p-4 border border-border/50 rounded-lg">
            <div className="font-mono text-sm text-gray-400">
              SHOWING <span className="text-primary font-bold">{filteredPosts.length}</span> LOG{filteredPosts.length !== 1 && 'S'}
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
            {filteredPosts.map((post) => (
              <div key={post.slug} className="animate-in slide-in-from-bottom-4 duration-500">
                <ResearchCard post={post} />
              </div>
            ))}
            {filteredPosts.length === 0 && (
              <div className="col-span-full p-12 border border-dashed border-border/50 text-center font-mono text-gray-500 rounded-xl bg-surface/50 flex flex-col items-center justify-center space-y-4">
                <div className="text-primary/50 text-4xl">∅</div>
                <div>NO LOGS MATCH THE SPECIFIED VECTORS.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
