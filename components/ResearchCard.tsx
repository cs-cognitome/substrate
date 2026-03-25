import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { PostMetadata } from '@/utils/getPosts';
import clsx from 'clsx';

export default function ResearchCard({ post }: { post: PostMetadata }) {
  return (
    <Link href={`/research/${post.slug}`} className="block group h-full">
      <div className="h-full flex flex-col p-6 border border-border/50 bg-surface rounded-xl hover:border-primary/50 transition-all hover:bg-black group-hover:-translate-y-1 duration-300 relative overflow-hidden">
        
        {/* Subtle glow effect on hover */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />

        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
          </div>
          {post.depth && (
            <span className={clsx(
              "text-[10px] font-mono px-2 py-1 rounded-sm uppercase border",
              post.depth === 'emerging' 
                ? "border-purple-500/30 text-purple-400 bg-purple-500/10" 
                : "border-blue-500/30 text-blue-400 bg-blue-500/10"
            )}>
              {post.depth}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-mono flex items-center gap-1 text-gray-500 bg-surface/80 border border-border/40 px-2 py-1 rounded-md">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2 block border-t border-border/50 text-primary font-mono text-sm flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity w-full">
          READ_LOG <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
