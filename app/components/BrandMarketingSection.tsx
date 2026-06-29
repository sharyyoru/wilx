"use client";

import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  {
    id: "lipton",
    src: "/otherbrands/lipton-ramadan.mp4",
    brand: "Lipton",
    title: "Ramadan — #AMinuteOfGoodness",
    role: "Creative Director & Concept Architect",
    aim: "Humanise the Lipton brand during Ramadan by anchoring it in a moment of shared goodness — not consumption. The brief demanded emotional resonance with MENA audiences during the most culturally significant period of the year.",
    result: "The campaign generated measurable uplift in brand sentiment across GCC markets. The '#AMinuteOfGoodness' hashtag became a community-driven extension of the spot, with organic reposting amplifying reach beyond paid media.",
    color: "#FFCC00",
    tag: "Brand Campaign",
  },
  {
    id: "mcdonalds",
    src: "/otherbrands/mcdonalds-mcarabia.mp4",
    brand: "McDonald's",
    title: "McArabia — True To Tradition",
    role: "Director & Concept Developer",
    aim: "Position the McArabia not as a localisation compromise, but as a proud cultural statement. The concept challenged the perception that fast food and heritage are at odds — instead celebrating the McArabia as authentically regional.",
    result: "The spot elevated the McArabia from a menu item to a cultural touchstone. Internal brand tracking showed a significant increase in McArabia order intent among 18–35 demographics following the campaign flight.",
    color: "#DA291C",
    tag: "Product Campaign",
  },
  {
    id: "total",
    src: "/otherbrands/total-quartz.mp4",
    brand: "Total",
    title: "Quartz — TV Spot",
    role: "Director & Brand Strategist",
    aim: "Reframe Total Quartz engine oil from a functional commodity to a performance brand with emotional weight. The spot needed to cut through in a category dominated by technical specs, speaking instead to the pride of the driver.",
    result: "The TV spot ran across regional broadcast and digital channels, delivering strong recall scores in post-campaign testing. The cinematic treatment became a benchmark for subsequent Total Quartz creative in the region.",
    color: "#E31E24",
    tag: "TV Commercial",
  },
];

export function BrandMarketingSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.load();
    setPlaying(false);
  }, [active]);

  const current = VIDEOS[active];

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="flex flex-col gap-0 lg:flex-row lg:gap-0 border-t border-white/10">
      {/* Main player */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Video */}
        <div className="relative bg-black w-full" style={{ aspectRatio: "16/9" }}>
          <video
            ref={videoRef}
            key={current.src}
            src={current.src}
            className="h-full w-full object-cover"
            playsInline
            preload="metadata"
            onEnded={() => setPlaying(false)}
          />

          {/* Play / Pause centered overlay */}
          <button
            onClick={handlePlayPause}
            aria-label={playing ? "Pause" : "Play"}
            className="absolute inset-0 flex items-center justify-center group"
          >
            {/* Always-visible circle, fades out while playing unless hovered */}
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm transition-all group-hover:bg-black/60 group-hover:scale-110"
              style={{ opacity: playing ? 0 : 1, transition: "opacity 0.2s, transform 0.2s, background 0.2s" }}
            >
              {playing ? (
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: "3px" }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
            {/* Show pause on hover while playing */}
            {playing && (
              <div className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </div>
            )}
          </button>

          {/* Brand colour strip */}
          <div
            className="absolute bottom-0 left-0 h-1 w-full"
            style={{ background: current.color }}
          />
        </div>

        {/* Info panel */}
        <div className="flex-1 bg-neutral-950 border-t border-white/10 p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start gap-3 mb-5">
            <span
              className="shrink-0 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-sm"
              style={{ background: current.color, color: "#000" }}
            >
              {current.tag}
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-0.5">
                {current.brand}
              </p>
              <h3 className="text-xl font-black uppercase tracking-tight text-white leading-tight">
                {current.title}
              </h3>
            </div>
          </div>

          {/* Role / Aim / Result */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { label: "Role", body: current.role },
              { label: "Aim", body: current.aim },
              { label: "Result", body: current.result },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{ color: current.color }}
                >
                  {item.label}
                </p>
                <p className="text-sm leading-relaxed text-white/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-72 xl:w-80 shrink-0 border-t border-white/10 lg:border-t-0 lg:border-l bg-neutral-950">
        <div className="p-4 border-b border-white/10">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
            All Videos
          </p>
        </div>
        <div className="divide-y divide-white/5">
          {VIDEOS.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActive(i)}
              className={`w-full text-left px-4 py-4 flex gap-3 transition-colors ${
                active === i
                  ? "bg-white/8"
                  : "hover:bg-white/4"
              }`}
            >
              {/* Thumbnail placeholder */}
              <div
                className="relative shrink-0 rounded-sm overflow-hidden"
                style={{ width: 80, aspectRatio: "16/9", background: "#111" }}
              >
                <video
                  src={v.src}
                  className="h-full w-full object-cover"
                  preload="metadata"
                  muted
                  playsInline
                />
                {active === i && playing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  </div>
                )}
                {/* colour accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: v.color }}
                />
              </div>
              {/* Text */}
              <div className="min-w-0">
                <p
                  className="text-[9px] font-black uppercase tracking-widest mb-0.5"
                  style={{ color: active === i ? v.color : "rgba(255,255,255,0.35)" }}
                >
                  {v.brand}
                </p>
                <p className={`text-xs font-bold leading-snug ${active === i ? "text-white" : "text-white/60"}`}>
                  {v.title}
                </p>
                <p className="mt-1 text-[10px] text-white/30 leading-tight">{v.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
