"use client";

import { motion } from "framer-motion";

export type MarqueeProps = {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
};

export function Marquee({
  items,
  direction = "left",
  speed = 30,
  className = "",
  itemClassName = "",
  separator = "●",
}: MarqueeProps) {
  const duplicated = [...items, ...items, ...items, ...items];
  const distance = direction === "left" ? "-50%" : "0%";
  const initial = direction === "left" ? "0%" : "-50%";

  return (
    <div
      className={`group relative flex overflow-hidden whitespace-nowrap border-y-4 border-ink bg-paper py-4 ${className}`}
    >
      <motion.div
        className="flex shrink-0 items-center gap-6 pr-6"
        initial={{ x: initial }}
        animate={{ x: distance }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {duplicated.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-6">
            <span
              className={`inline-block text-lg font-bold uppercase tracking-wider sm:text-xl ${itemClassName}`}
            >
              {item}
            </span>
            <span className="text-accent-orange" aria-hidden="true">
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-paper to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-paper to-transparent sm:w-16" />
    </div>
  );
}
