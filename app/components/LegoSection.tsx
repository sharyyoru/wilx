"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  { src: "/lego/arc-dragon-mech_poses.mp4",          label: "Arc Dragon Mech" },
  { src: "/lego/MasterMech_Poses.mp4",                label: "Master Mech" },
  { src: "/lego/Kai-DemonHunter-Mech_6-igvid.mp4",   label: "Kai Demon Hunter" },
  { src: "/lego/Cole-Asura-mech.mp4",                 label: "Cole Asura Mech" },
  { src: "/lego/jay-raider-mech_instructions-ig.mp4", label: "Jay Raider Mech" },
];

const LLOYD_IMAGES = [
  "/lego/Lloyd Dragon Mech/Life-Dragon-Mech.jpg",
  "/lego/Lloyd Dragon Mech/Life-Dragon-Mech_2.jpg",
  "/lego/Lloyd Dragon Mech/Life-Dragon-Mech_3.jpg",
  "/lego/Lloyd Dragon Mech/Life-Dragon-Mech_5.jpg",
  "/lego/Lloyd Dragon Mech/Life-Dragon-Mech_6.jpg",
  "/lego/Lloyd Dragon Mech/Life-Dragon-Mech_7.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01_2.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01_3.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01_4.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01_5.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01_6.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01_7.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01_8.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01_9.jpg",
  "/lego/Lloyd Dragon Mech/LifeDragonMech01_10.jpg",
];

const RAS_IMAGES = [
  "/lego/Ras Rage Mech/Ras-Rage-Mech.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_2.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech-head.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech-head-with-jaw.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech-body.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech-body_wolf-form.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech-full.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_Poses.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_Poses_2.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_Poses_3.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_Poses_4.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_Poses_5.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_Poses_6.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_Poses_7.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_Poses_8.jpg",
  "/lego/Ras Rage Mech/Ras-Rage-Mech_Poses_9.jpg",
];

function VideoCard({ src, label, className }: { src: string; label: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`group relative overflow-hidden bg-neutral-900 ${className ?? ""}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8">
        <p className="text-xs font-bold uppercase tracking-wider text-white/80">
          {label}
        </p>
      </div>
    </div>
  );
}

function SlideshowCard({ images, label, className }: { images: string[]; label: string; className?: string }) {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className={`group relative overflow-hidden bg-neutral-900 ${className ?? ""}`}>
      <Image
        src={images[idx]}
        alt={`${label} ${idx + 1}`}
        fill
        className="object-cover transition-opacity duration-300"
        sizes="(max-width: 768px) 50vw, 25vw"
        priority={idx === 0}
      />

      {/* Paddles */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/90"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/90"
      >
        ›
      </button>

      {/* Bottom bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-3 pt-10">
        <p className="text-xs font-black uppercase tracking-wider text-white">{label}</p>
        <p className="mt-0.5 text-[10px] text-white/50">{idx + 1} / {images.length}</p>
        <div className="mt-2 flex gap-0.5">
          {images.map((_, i) => (
            <div
              key={i}
              className="h-0.5 flex-1 rounded-full transition-colors duration-200"
              style={{ background: i === idx ? "#fff" : "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LegoSection() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-3" style={{ gridAutoRows: "340px" }}>
      {/* Hero video — 2 cols × 2 rows */}
      <VideoCard src={VIDEOS[0].src} label={VIDEOS[0].label} className="col-span-2 row-span-2 md:col-span-2 md:row-span-2" />

      {/* Right column top two */}
      <VideoCard src={VIDEOS[1].src} label={VIDEOS[1].label} className="col-span-1 row-span-1" />
      <VideoCard src={VIDEOS[2].src} label={VIDEOS[2].label} className="col-span-1 row-span-1" />

      {/* Lloyd slideshow — 2 cols × 2 rows (portrait feel) */}
      <SlideshowCard images={LLOYD_IMAGES} label="Lloyd — Life Dragon Mech" className="col-span-2 row-span-2 md:col-span-2 md:row-span-2" />

      {/* Bottom row videos */}
      <VideoCard src={VIDEOS[3].src} label={VIDEOS[3].label} className="col-span-1 row-span-1" />
      <VideoCard src={VIDEOS[4].src} label={VIDEOS[4].label} className="col-span-1 row-span-1" />

      {/* Ras slideshow — 2 cols × 2 rows */}
      <SlideshowCard images={RAS_IMAGES} label="Ras — Rage Mech" className="col-span-2 row-span-2 md:col-span-2 md:row-span-2" />
    </div>
  );
}
