import { getPostContent, getPostMetadata } from "@/utils/getPosts";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = getPostContent(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="animate-in fade-in duration-700 max-w-3xl mx-auto">
      <Link href="/research" className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-8 hover:text-primary-dim transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> RETURN_TO_LOGS
      </Link>
      
      <header className="mb-10 pb-6 border-b border-border">
        <div className="flex items-center gap-2 text-gray-500 font-mono text-sm mb-4">
          <Calendar size={16} /> <time>{post.data.date}</time>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">{post.data.title}</h1>
      </header>

      <div className="text-gray-300 font-sans text-base leading-loose space-y-6 [&>h1]:text-white [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-10 [&>h1]:mb-6 [&>h2]:text-white [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-white [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>pre]:bg-[#050505] [&>pre]:border [&>pre]:border-border [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>code]:font-mono [&>code]:text-primary [&>code]:bg-primary/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
