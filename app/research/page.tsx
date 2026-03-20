import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import DecipheringText from "@/components/DecipheringText";
import { getPostMetadata } from "@/utils/getPosts";
import Link from "next/link";

export default function ResearchPage() {
  const posts = getPostMetadata();

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-mono text-primary flex items-center gap-3">
          <BookOpen /> <DecipheringText text="research_logs" speed={40} />
        </h1>
        <p className="mt-4 text-gray-400 font-mono">
          Public disclosures, vulnerability research, and technical write-ups.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link href={`/research/${post.slug}`} key={post.slug} className="block group">
            <div className="p-6 border border-border/50 bg-surface rounded-xl hover:border-primary/50 transition-all hover:bg-black group-hover:-translate-y-1 duration-300">
              <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-3xl">
                {post.excerpt}
              </p>
              <div className="text-primary font-mono text-sm flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                READ_LOG <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <div className="p-12 border border-dashed border-border/50 text-center font-mono text-gray-500 rounded-xl bg-surface/50">
            NO LOGS FOUND IN DATABASE.
          </div>
        )}
      </div>
    </div>
  );
}
