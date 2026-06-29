"use client";

import { useEffect, useState } from "react";

const TITLES = [
  "Creative AI Solutions Architect",
  "Growth & Digital Marketing Strategist",
  "Business Development & Innovation Lead",
];

export function HeroSubtitle() {
  const [idx, setIdx] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % TITLES.length);
        setFlipping(false);
      }, 350);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="overflow-hidden"
      style={{ perspective: "800px" }}
    >
      <p
        className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl md:text-3xl"
        style={{
          display: "inline-block",
          transition: "transform 350ms cubic-bezier(0.4,0,0.2,1), opacity 350ms",
          transform: flipping ? "rotateX(90deg)" : "rotateX(0deg)",
          opacity: flipping ? 0 : 1,
          transformOrigin: "50% 50%",
        }}
      >
        {TITLES[idx]}
      </p>
    </div>
  );
}
