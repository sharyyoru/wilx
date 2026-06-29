"use client";

import { useEffect } from "react";

export const INSTAGRAM_REELS: { url: string; caption: string }[] = [
  { url: "https://www.instagram.com/reel/PLACEHOLDER_1/", caption: "Lego Build 1" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_2/", caption: "Lego Build 2" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_3/", caption: "Lego Build 3" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_4/", caption: "Lego Build 4" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_5/", caption: "Lego Build 5" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_6/", caption: "Lego Build 6" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_7/", caption: "Lego Build 7" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_8/", caption: "Lego Build 8" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_9/", caption: "Lego Build 9" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_10/", caption: "Lego Build 10" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_11/", caption: "Lego Build 11" },
  { url: "https://www.instagram.com/reel/PLACEHOLDER_12/", caption: "Lego Build 12" },
];

const BENTO_LAYOUT = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
];

function ReelCard({ reel, className }: { reel: typeof INSTAGRAM_REELS[number]; className: string }) {
  const isPlaceholder = reel.url.includes("PLACEHOLDER");

  return (
    <div
      className={`group relative overflow-hidden border-2 border-white/20 bg-white/5 transition-all duration-300 hover:border-white/60 ${className}`}
      style={{ minHeight: "200px" }}
    >
      {isPlaceholder ? (
        <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 p-4 text-center">
          <div className="h-8 w-8 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center">
            <svg className="h-4 w-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69L9.54 5.98A.998.998 0 008 6.82z"/>
            </svg>
          </div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-wider">
            Paste reel URL<br />in LegoSection.tsx
          </p>
          <p className="text-[10px] text-white/20 font-mono">{reel.caption}</p>
        </div>
      ) : (
        <blockquote
          className="instagram-media h-full w-full"
          data-instgrm-permalink={`${reel.url}?utm_source=ig_embed`}
          data-instgrm-version="14"
          data-instgrm-captioned
          style={{
            background: "#000",
            border: 0,
            borderRadius: 0,
            boxShadow: "none",
            display: "block",
            margin: 0,
            minWidth: "100%",
            padding: 0,
            width: "100%",
          }}
        />
      )}
    </div>
  );
}

export function LegoSection() {
  useEffect(() => {
    const hasReal = INSTAGRAM_REELS.some((r) => !r.url.includes("PLACEHOLDER"));
    if (!hasReal) return;
    if (typeof window !== "undefined" && (window as Window & { instgrm?: { Embeds?: { process?: () => void } } }).instgrm?.Embeds?.process) {
      (window as Window & { instgrm?: { Embeds?: { process?: () => void } } }).instgrm!.Embeds!.process!();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4" style={{ gridAutoRows: "minmax(200px, auto)" }}>
      {INSTAGRAM_REELS.map((reel, i) => (
        <ReelCard key={i} reel={reel} className={BENTO_LAYOUT[i] ?? ""} />
      ))}
    </div>
  );
}
