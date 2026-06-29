"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TextFlippingBoard } from "./ui/text-flipping-board";

const MESSAGES: string[] = [
  "NEXT.JS\nREACT\nSUPABASE",
  "LARAVEL\nWINDSURF\nAI AGENTS",
  "TYPESCRIPT\nTAILWIND\nFRAMER",
  "POSTGRES\nREDIS\nDOCKER",
  "OPENAI API\nGEMINI API\nRAG SYSTEMS",
];

export function TechArsenalBoard() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next]);

  return <TextFlippingBoard text={MESSAGES[msgIdx]} />;
}
