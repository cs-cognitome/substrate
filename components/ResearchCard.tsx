import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import { PostMetadata } from '@/utils/getPosts';
import clsx from 'clsx';
import Image from 'next/image';

export default function ResearchCard({ post }: { post: PostMetadata }) {
  return (
    <Link href={`/research/${post.slug}`} className="block group">
      <div className="flex flex-row items-start gap-6 px-5 py-11 border border-border/50 bg-surface rounded-xl hover:border-primary/50 hover:bg-black transition-all duration-300 relative overflow-hidden">

        {/* Top glow line on hover */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />

        {/* Left: date, title, excerpt, tags */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <span className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
            <Calendar size={12} /> {post.date}
          </span>

          <h2 className="text-base font-bold text-white group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 font-mono">
            {post.excerpt}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-gray-500 bg-surface/80 border border-border/40 px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: image + READ_LOG */}
        <div className="flex flex-col items-end justify-between self-stretch shrink-0">
          {/* Cover image or placeholder */}
          <div className="w-20 h-16 rounded-lg overflow-hidden border border-border/30 bg-black flex items-center justify-center">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                width={80}
                height={64}
                className="object-cover w-full h-full"
              />
            ) : (
              <FileText size={20} className="text-gray-700" />
            )}
          </div>

          {/* READ_LOG */}
          <div className="text-primary font-mono text-xs flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            READ_LOG <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
