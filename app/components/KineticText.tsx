"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type KineticTextProps = {
  text: string;
  className?: string;
  baseSize?: string;
};

export function KineticText({
  text,
  className = "",
  baseSize = "text-5xl sm:text-7xl md:text-8xl lg:text-9xl",
}: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  };

  const letters = text.split("");

  return (
    <div
      ref={containerRef}
      className={`relative w-full cursor-default select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex flex-wrap justify-start leading-[0.85] tracking-tighter ${baseSize}`}
      >
        {letters.map((char, index) => (
          <KineticLetter
            key={`${char}-${index}`}
            char={char}
            containerRef={containerRef}
            mouseX={springX}
            mouseY={springY}
          />
        ))}
      </div>
    </div>
  );
}

function KineticLetter({
  char,
  containerRef,
  mouseX,
  mouseY,
}: {
  char: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const letterRef = useRef<HTMLSpanElement>(null);

  const distanceFromMouse = (latestX: number, latestY: number) => {
    if (!letterRef.current || !containerRef.current) return Infinity;
    const rect = letterRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const letterX = rect.left - containerRect.left + rect.width / 2;
    const letterY = rect.top - containerRect.top + rect.height / 2;
    return Math.hypot(latestX - letterX, latestY - letterY);
  };

  const weight = useTransform<number, number>(
    [mouseX, mouseY],
    (latest: number[]) => {
      const distance = distanceFromMouse(latest[0], latest[1]);
      const maxDistance = 400;
      const normalized = Math.min(distance / maxDistance, 1);
      return 900 - normalized * 500;
    }
  );

  const spacing = useTransform<number, number>(
    [mouseX, mouseY],
    (latest: number[]) => {
      const distance = distanceFromMouse(latest[0], latest[1]);
      const maxDistance = 300;
      const normalized = Math.max(0, 1 - distance / maxDistance);
      return normalized * 12;
    }
  );

  const fontVar = useTransform(weight, (v) => `"wght" ${Math.round(v)}`);
  const margin = useTransform(spacing, (v) => `${v}px`);

  return (
    <motion.span
      ref={letterRef}
      className="inline-block font-black will-change-transform"
      style={{
        fontVariationSettings: fontVar,
        marginRight: margin,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
