"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const VIDEOS = [
  { src: "/lego/arc-dragon-mech_poses.mp4",        label: "Arc Dragon Mech" },
  { src: "/lego/MasterMech_Poses.mp4",              label: "Master Mech Poses" },
  { src: "/lego/Kai-DemonHunter-Mech_6-igvid.mp4", label: "Kai Demon Hunter" },
  { src: "/lego/Cole-Asura-mech.mp4",               label: "Cole Asura Mech" },
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
  return (
    <div className={`group relative overflow-hidden bg-black ${className ?? ""}`}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <p className="text-xs font-bold uppercase tracking-wider text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {label}
        </p>
      </div>
    </div>
  );
}

function SlideshowCard({ images, label, className }: { images: string[]; label: string; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % images.length);
        setFading(false);
      }, 400);
    }, 2800);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className={`group relative overflow-hidden bg-black ${className ?? ""}`}>
      <Image
        src={images[idx]}
        alt={label}
        fill
        className="object-cover transition-opacity duration-400"
        style={{ opacity: fading ? 0 : 1 }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-sm font-black uppercase tracking-wider text-white">{label}</p>
        <div className="mt-2 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className="h-0.5 flex-1 rounded-full transition-colors duration-300"
              style={{ background: i === idx ? "#fff" : "rgba(255,255,255,0.3)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LegoSection() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4" style={{ gridAutoRows: "320px" }}>
      {/* Row 1: Big hero video (2×2) + 2 portrait videos */}
      <VideoCard src={VIDEOS[0].src} label={VIDEOS[0].label} className="col-span-2 row-span-2" />
      <VideoCard src={VIDEOS[1].src} label={VIDEOS[1].label} className="col-span-1 row-span-1" />
      <VideoCard src={VIDEOS[2].src} label={VIDEOS[2].label} className="col-span-1 row-span-1" />

      {/* Row 2 right: Lloyd slideshow tall */}
      <SlideshowCard images={LLOYD_IMAGES} label="Lloyd — Life Dragon Mech" className="col-span-2 row-span-2" />

      {/* Row 3: 2 more videos + Ras slideshow */}
      <VideoCard src={VIDEOS[3].src} label={VIDEOS[3].label} className="col-span-1 row-span-1" />
      <VideoCard src={VIDEOS[4].src} label={VIDEOS[4].label} className="col-span-1 row-span-1" />
      <SlideshowCard images={RAS_IMAGES} label="Ras — Rage Mech" className="col-span-2 row-span-2" />
    </div>
  );
}
