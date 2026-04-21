import DecipheringText from "@/components/DecipheringText";
import Link from "next/link";
import clsx from "clsx";

export default function Home() {
  const showcaseTags = [
    { name: "Azure", count: 1, active: false },
    { name: "Blue Team", count: 1, active: true },
    { name: "AWS", count: 1, active: false },
    { name: "CompTIA", count: 1, active: false },
    { name: "arcX", count: 1, active: false },
    { name: "HackTheBox", count: 8, active: false },
    { name: "DataCamp", count: 1, active: false },
  ];

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
      {/* Background Image (Black Hole Original) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/blackhole.png')",
          backgroundPosition: "calc(50% + 16px) calc(50% - 4px)"
        }}
      />

      {/* Background Image Overlay (Very light just for text readability) */}
      <div className="absolute inset-0 z-0 bg-black/10" />

      <div className="w-full max-w-[1300px] mx-auto px-6 z-10 flex flex-col mt-4 lg:mt-12">
        {/* Header - Spans full width, no grid constraints to prevent wrapping */}
        <h1 className="text-6xl md:text-[6rem] lg:text-[7.5rem] font-bold font-mono tracking-tighter leading-[1] whitespace-nowrap mb-12 lg:mb-16">
          <div className="text-white">
            &gt;_<DecipheringText text="AI SECURITY &" speed={40} />
          </div>
          <div className="text-white">
            <DecipheringText text="ENGINEERING" speed={40} />
          </div>
        </h1>

        {/* Two columns below the header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start">
          {/* Left: Buttons */}
          <div className="lg:col-span-7 flex flex-wrap gap-4 pt-2 pl-3">
            <Link href="/whoami" className="px-6 py-3 bg-primary text-black font-mono font-bold text-sm rounded hover:bg-primary/80 transition-colors inline-flex items-center justify-center">
              INITIALIZE_PROFILE
            </Link>
            <Link href="/research" className="px-6 py-3 border border-border text-gray-400 font-mono text-sm rounded hover:text-white hover:border-gray-500 transition-colors inline-flex items-center justify-center">
              VIEW_LOGS
            </Link>
          </div>

          {/* Right: Status and Certs */}
          <div className="lg:col-span-5 space-y-6 lg:mt-[-14px] pl-16">
            <div className="text-primary font-mono text-[32px] animate-breathe uppercase tracking-wide leading-tight">
              <span className="mr-2">&gt;_</span>STATUS: AVAILABLE<br />FOR OPERATIONS
            </div>

            <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-sm">
              Ready to secure your infrastructure and redefine your defence-in-depth strategy.
            </p>

            {/* Certs Showcase */}
            <div className="flex flex-wrap gap-1.5">
              {showcaseTags.map((tag) => (
                <div
                  key={tag.name}
                  className={clsx(
                    "px-2 py-1 text-[11px] font-mono border rounded-md transition-all duration-300 flex items-center gap-1",
                    tag.active
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border/50 bg-black text-gray-500"
                  )}
                >
                  <span>{tag.name}</span>
                  <span className={clsx(
                    "text-[10px] px-1.5 py-0.5 rounded flex items-center justify-center",
                    tag.active ? "bg-primary/20 text-primary" : "bg-surface border border-border/50 text-gray-500"
                  )}>
                    {tag.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
