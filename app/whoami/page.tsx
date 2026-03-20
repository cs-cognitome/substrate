import { Terminal, Code, Shield } from "lucide-react";
import DecipheringText from "@/components/DecipheringText";

export default function WhoAmI() {
  const skills = [
    { category: "Languages", items: ["Python", "Go", "TypeScript", "C/C++", "Rust"] },
    { category: "Offensive", items: ["Metasploit", "Burp Suite", "Cobalt Strike", "Ghidra", "Nmap"] },
    { category: "AI/ML", items: ["PyTorch", "TensorFlow", "Transformers", "LangChain"] },
    { category: "Cloud & Infra", items: ["AWS", "Kubernetes", "Docker", "Terraform"] },
  ];

  const timeline = [
    { year: "2026", role: "AI Security Researcher", desc: "Focusing on adversarial attacks against LLMs and secure AI deployment." },
    { year: "2024", role: "Senior Penetration Tester", desc: "Led red team engagements for Fortune 500 financial institutions." },
    { year: "2022", role: "Security Analyst", desc: "Threat hunting, malware analysis, and incident response." },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-mono text-primary flex items-center gap-3">
          <Terminal /> <DecipheringText text="whoami" speed={30} />
        </h1>
        <p className="mt-4 text-gray-400 font-mono">
          I am a cybersecurity researcher with a deep focus on the intersection of artificial intelligence and offensive security. I break things to understand how to build them stronger.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-mono text-white flex items-center gap-2">
          <Code className="text-primary" /> Technical Arsenal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skillGroup, i) => (
            <div key={i} className="p-4 border border-border/50 bg-surface rounded-lg">
              <h3 className="text-primary font-mono text-sm mb-3">[{skillGroup.category}]</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, j) => (
                  <span key={j} className="px-2 py-1 bg-black border border-border text-gray-300 text-xs font-mono rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-mono text-white flex items-center gap-2">
          <Shield className="text-primary" /> Operational History
        </h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {timeline.map((item, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(0,255,102,0.2)] z-10 text-xs font-mono text-primary">
                {item.year.slice(-2)}'
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-border/50 bg-surface">
                <div className="font-mono text-primary mb-1">{item.role}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
