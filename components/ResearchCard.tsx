import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { PostMetadata } from '@/utils/getPosts';
import clsx from 'clsx';

export default function ResearchCard({ post }: { post: PostMetadata }) {
  return (
    <Link href={`/research/${post.slug}`} className="block group">
      <div className="flex flex-row items-center gap-6 px-5 py-9 border border-border/50 bg-surface rounded-xl hover:border-primary/50 hover:bg-black transition-all duration-300 relative overflow-hidden">

        {/* Top glow line on hover */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />

        {/* Left: meta + title + excerpt */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
              <Calendar size={12} /> {post.date}
            </span>
            {post.depth && (
              <span className={clsx(
                "text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase border",
                post.depth === 'emerging'
                  ? "border-purple-500/30 text-purple-400 bg-purple-500/10"
                  : "border-blue-500/30 text-blue-400 bg-blue-500/10"
              )}>
                {post.depth}
              </span>
            )}
          </div>

          <h2 className="text-base font-bold text-white mb-1.5 group-hover:text-primary transition-colors truncate">
            {post.title}
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-1 font-mono text-xs">
            {post.excerpt}
          </p>
        </div>

        {/* Right: tags + arrow */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-end max-w-[220px]">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono text-gray-500 bg-surface/80 border border-border/40 px-2 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="text-primary font-mono text-xs flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            READ_LOG <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

