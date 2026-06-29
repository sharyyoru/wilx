"use client";

const ADOBE_TOOLS = [
  { abbr: "Ps", name: "Photoshop",    pct: 98, color: "#31A8FF" },
  { abbr: "Ai", name: "Illustrator",  pct: 97, color: "#FF9A00" },
  { abbr: "Id", name: "InDesign",     pct: 92, color: "#FF3366" },
  { abbr: "Pr", name: "Premiere Pro", pct: 90, color: "#9999FF" },
  { abbr: "Ae", name: "After Effects",pct: 85, color: "#9999FF" },
  { abbr: "Au", name: "Audition",     pct: 78, color: "#00E4BB" },
  { abbr: "Lr", name: "Lightroom",    pct: 95, color: "#31A8FF" },
  { abbr: "XD", name: "Adobe XD",     pct: 82, color: "#FF61F6" },
  { abbr: "Dw", name: "Dreamweaver",  pct: 70, color: "#4EB3CF" },
  { abbr: "Br", name: "Bridge",       pct: 88, color: "#8A8A8A" },
];

const OTHER_TOOLS = [
  { name: "Figma",            pct: 95, color: "#F24E1E" },
  { name: "Framer",           pct: 75, color: "#0055FF" },
  { name: "Canva",            pct: 88, color: "#00C4CC" },
  { name: "ChatGPT / OpenAI", pct: 92, color: "#10A37F" },
  { name: "Gemini AI",        pct: 90, color: "#8E75F0" },
  { name: "Midjourney",       pct: 85, color: "#e5e5e5" },
  { name: "Runway ML",        pct: 72, color: "#f5f5f5" },
  { name: "ElevenLabs",       pct: 70, color: "#FF6B35" },
  { name: "Notion AI",        pct: 88, color: "#f5f5f5" },
  { name: "GitHub Copilot",   pct: 92, color: "#6E40C9" },
];

function ToolBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

export function ToolsSection() {
  return (
    <div>
      {/* Adobe Suite */}
      <div className="mb-10">
        <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          Adobe Creative Suite
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ADOBE_TOOLS.map((t) => (
            <div key={t.name} className="group flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {/* Adobe badge */}
                <span
                  className="flex h-6 w-7 shrink-0 items-center justify-center rounded-sm text-[9px] font-black text-white"
                  style={{ background: t.color }}
                >
                  {t.abbr}
                </span>
                <span className="text-sm font-bold text-white/90 leading-none">{t.name}</span>
                <span className="ml-auto text-[10px] font-bold text-white/40">{t.pct}%</span>
              </div>
              <ToolBar pct={t.pct} color={t.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mb-10 h-px bg-white/10" />

      {/* Design & AI Tools */}
      <div>
        <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          Design & AI Tools
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {OTHER_TOOLS.map((t) => (
            <div key={t.name} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: t.color }}
                />
                <span className="text-sm font-bold text-white/90 leading-none">{t.name}</span>
                <span className="ml-auto text-[10px] font-bold text-white/40">{t.pct}%</span>
              </div>
              <ToolBar pct={t.pct} color={t.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
