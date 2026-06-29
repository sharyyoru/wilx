"use client";

import React, { useEffect, useRef, useState } from "react";

function splitLines(text: string): string[] {
  return text.split("\n");
}

function FlipChar({
  char,
  delay,
}: {
  char: string;
  delay: number;
}) {
  const [display, setDisplay] = useState(char);
  const [flipping, setFlipping] = useState(false);
  const prevChar = useRef(char);

  useEffect(() => {
    if (prevChar.current === char) return;
    const t = setTimeout(() => {
      setFlipping(true);
      setTimeout(() => {
        setDisplay(char);
        setFlipping(false);
        prevChar.current = char;
      }, 120);
    }, delay);
    return () => clearTimeout(t);
  }, [char, delay]);

  if (char === " ") return <span className="inline-block w-[0.5ch]" />;

  return (
    <span
      className="inline-block overflow-hidden"
      style={{
        perspective: "400px",
      }}
    >
      <span
        className="inline-block font-mono font-black tracking-tight transition-transform"
        style={{
          transform: flipping ? "rotateX(90deg)" : "rotateX(0deg)",
          transitionDuration: "120ms",
          transformOrigin: "50% 50%",
        }}
      >
        {display}
      </span>
    </span>
  );
}

export function TextFlippingBoard({ text }: { text: string }) {
  const lines = splitLines(text);

  return (
    <div className="w-full select-none font-mono">
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="flex flex-wrap leading-tight">
          {line.split("").map((char, charIdx) => (
            <FlipChar
              key={`${lineIdx}-${charIdx}`}
              char={char}
              delay={charIdx * 18 + lineIdx * 60}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
