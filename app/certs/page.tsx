import { Award, ExternalLink } from "lucide-react";
import DecipheringText from "@/components/DecipheringText";
import fs from "fs";
import path from "path";

export default async function CertsPage() {
  const filePath = path.join(process.cwd(), "content", "certs.json");
  const certsData = fs.readFileSync(filePath, "utf-8");
  const certs = JSON.parse(certsData) as {
    id: string;
    name: string;
    issuer: string;
    date: string;
    description: string;
  }[];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-mono text-primary flex items-center gap-3">
          <Award /> <DecipheringText text="certifications" speed={40} />
        </h1>
        <p className="mt-4 text-gray-400 font-mono">
          Validated knowledge and practical skills across offensive security, cloud infrastructure, and enterprise defense.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert) => (
          <div key={cert.id} className="group relative p-6 bg-surface border border-border/50 rounded-xl hover:border-primary/50 transition-colors flex flex-col h-full">
            <div className="absolute top-4 right-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={20} />
            </div>
            <div className="flex-grow">
              <div className="text-xs text-gray-500 font-mono mb-2">{cert.date}</div>
              <h2 className="text-lg font-bold text-white mb-2 leading-tight">{cert.name}</h2>
              <div className="text-primary font-mono text-sm mb-4">{cert.issuer}</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {cert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
