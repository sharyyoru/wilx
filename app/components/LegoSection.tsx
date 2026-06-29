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

function VideoCard({ src, label }: { src: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let playing = false;

    const tryPlay = () => {
      if (!playing) {
        playing = true;
        video.play().catch(() => { playing = false; });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.readyState >= 3) {
            tryPlay();
          } else {
            video.addEventListener("canplay", tryPlay, { once: true });
          }
        } else {
          playing = false;
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <div ref={containerRef} className="group relative overflow-hidden bg-neutral-900" style={{ aspectRatio: "9/16" }}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10">
        <p className="text-xs font-bold uppercase tracking-wider text-white">{label}</p>
      </div>
    </div>
  );
}

function SlideshowCard({ images, label }: { images: string[]; label: string }) {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="group relative overflow-hidden bg-neutral-900" style={{ aspectRatio: "9/16" }}>
      <Image
        src={images[idx]}
        alt={`${label} ${idx + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 33vw"
        priority={idx === 0}
      />

      {/* Paddles — always visible on mobile, hover on desktop */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center border border-white/30 bg-black/70 text-xl text-white backdrop-blur-sm transition-all hover:bg-black md:opacity-0 md:group-hover:opacity-100"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center border border-white/30 bg-black/70 text-xl text-white backdrop-blur-sm transition-all hover:bg-black md:opacity-0 md:group-hover:opacity-100"
      >
        ›
      </button>

      {/* Bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-3 pt-12">
        <p className="text-xs font-black uppercase tracking-wider text-white">{label}</p>
        <p className="mt-0.5 text-[10px] text-white/50">{idx + 1} / {images.length}</p>
        <div className="mt-2 flex gap-0.5">
          {images.map((_, i) => (
            <div
              key={i}
              className="h-0.5 flex-1 rounded-full transition-colors duration-200"
              style={{ background: i === idx ? "#fff" : "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LegoSection() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {VIDEOS.map((v) => (
        <VideoCard key={v.src} src={v.src} label={v.label} />
      ))}
      <SlideshowCard images={LLOYD_IMAGES} label="Lloyd — Life Dragon Mech" />
      <SlideshowCard images={RAS_IMAGES} label="Ras — Rage Mech" />
    </div>
  );
}
