"use client";

import { motion } from "framer-motion";

export type MarqueeProps = {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
  variant?: "light" | "dark";
};

export function Marquee({
  items,
  direction = "left",
  speed = 30,
  className = "",
  itemClassName = "",
  separator = "●",
  variant = "light",
}: MarqueeProps) {
  const duplicated = [...items, ...items, ...items, ...items];
  const distance = direction === "left" ? "-50%" : "0%";
  const initial = direction === "left" ? "0%" : "-50%";

  const variantClasses =
    variant === "dark"
      ? "border-y-4 border-white bg-black text-white"
      : "border-y-4 border-ink bg-paper text-ink";

  const separatorColor = variant === "dark" ? "text-white" : "text-accent-orange";
  const fadeFrom = variant === "dark" ? "from-black" : "from-paper";

  return (
    <div
      className={`group relative flex overflow-hidden whitespace-nowrap py-4 ${variantClasses} ${className}`}
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
            <span className={separatorColor} aria-hidden="true">
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r ${fadeFrom} to-transparent sm:w-16`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l ${fadeFrom} to-transparent sm:w-16`} />
    </div>
  );
}
