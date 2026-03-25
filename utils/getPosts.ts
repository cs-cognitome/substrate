import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  tags?: string[];
  depth?: 'foundational' | 'emerging' | string;
}

export function getPostMetadata(): PostMetadata[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const files = fs.readdirSync(contentDirectory);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));

  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(path.join(contentDirectory, fileName), 'utf8');
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      slug: fileName.replace('.md', ''),
      tags: matterResult.data.tags || [],
      depth: matterResult.data.depth || 'foundational',
    };
  });

  return posts.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getPostContent(slug: string) {
  const file = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const content = fs.readFileSync(file, 'utf8');
  return matter(content);
}
