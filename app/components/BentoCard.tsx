"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type BentoCardProps = {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  color?: "paper" | "orange" | "yellow" | "blue" | "pink" | "dark";
  className?: string;
  hover?: "lift" | "tilt" | "none";
};

const colorMap = {
  paper: "bg-paper text-ink",
  orange: "bg-accent-orange text-white",
  yellow: "bg-accent-yellow text-ink",
  blue: "bg-accent-blue text-white",
  pink: "bg-accent-pink text-white",
  dark: "bg-ink text-paper",
};

const colSpanClass: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

const rowSpanClass: Record<number, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
  4: "md:row-span-4",
};

export function BentoCard({
  children,
  colSpan = 1,
  rowSpan = 1,
  color = "paper",
  className,
  hover = "lift",
}: BentoCardProps) {
  const hoverClasses = {
    lift: "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg transition-transform",
    tilt: "hover:rotate-1 transition-transform",
    none: "",
  };

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden border-4 border-ink p-6 sm:p-8 shadow-brutal",
        colorMap[color],
        hoverClasses[hover],
        "flex flex-col col-span-1 row-span-1",
        colSpanClass[colSpan],
        rowSpanClass[rowSpan],
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function BentoCardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-xl sm:text-2xl font-bold tracking-tight uppercase mb-3",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function BentoCardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-base sm:text-lg leading-relaxed", className)}>
      {children}
    </p>
  );
}

export function BentoCardTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block self-start border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-brutal-sm bg-paper text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}

export function BentoCardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-auto pt-4 flex items-end justify-between", className)}>
      {children}
    </div>
  );
}

// Utility for cn is imported from lib/utils.ts; create it if not present
