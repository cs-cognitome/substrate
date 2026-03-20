import DecipheringText from "@/components/DecipheringText";
import Scene from "@/components/Scene";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center">
      <Scene />
      
      <div className="text-center space-y-6 z-10 backdrop-blur-[2px] p-8 rounded-xl border border-border/40 bg-black/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-4">
          <ShieldCheck size={14} />
          <span>STATUS: AVAILABLE FOR OPERATIONS</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter">
          <DecipheringText text="AI SECURITY &" speed={40} /><br />
          <span className="text-primary"><DecipheringText text="PENTESTING" speed={40} /></span>
        </h1>
        
        <p className="max-w-xl mx-auto text-gray-400 font-mono text-sm leading-relaxed">
          Exploring the intersections of offensive security, artificial intelligence, and applied cryptography. Uncovering vulnerabilities before they are exploited.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/whoami" className="px-6 py-2 bg-primary text-black font-mono font-semibold rounded hover:bg-primary/80 transition-colors flex items-center justify-center gap-2">
            INITIALIZE_PROFILE <ArrowRight size={16} />
          </Link>
          <Link href="/research" className="px-6 py-2 border border-border text-gray-300 font-mono rounded hover:bg-surface hover:text-white transition-colors flex items-center justify-center">
            VIEW_LOGS
          </Link>
        </div>
      </div>
    </div>
  );
}
