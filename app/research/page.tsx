import { getPostMetadata } from "@/utils/getPosts";
import ResearchClient from "@/components/ResearchClient";

export const metadata = {
  title: "Research Logs | Minimalist Cyber-Research",
  description: "Public disclosures, vulnerability research, and technical write-ups.",
};

export default function ResearchPage() {
  const posts = getPostMetadata();

  return (
    <ResearchClient posts={posts} />
  );
}
