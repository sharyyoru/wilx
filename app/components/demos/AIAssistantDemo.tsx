"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; text: string; ts: string };

const SAMPLE_EXCHANGES: [string, string][] = [
  ["Schedule a meeting with Sarah tomorrow at 3pm", "Got it — I've created a calendar event: **Meeting with Sarah** on Tuesday at 3:00 PM. I've also drafted an invite email. Want me to send it?"],
  ["Set a reminder to review the Q3 report in 2 hours", "Reminder set for **2:00 PM today**: Review Q3 Report. I'll also pin the document to your focus view when the time arrives."],
  ["What's on my schedule today?", "You have **3 events** today:\n• 10:00 AM — Standup (30 min)\n• 2:00 PM — Review Q3 Report (reminder)\n• 4:30 PM — Client call with Acme Corp"],
  ["Summarise my unread emails from this week", "You have **7 unread emails**. Top priorities:\n1. Acme Corp — contract renewal (needs reply)\n2. Sarah — meeting confirmation\n3. Newsletter × 5 (low priority)"],
  ["Draft a reply to the Acme Corp contract email", "Draft ready:\n\n*Hi Team, Thank you for the update. We'd like to schedule a call to align on the renewal terms. Are you available this Thursday?*\n\nShall I send it or refine the tone?"],
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function AIAssistantDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi Wilson! I'm your AI assistant. I can manage your **calendar**, set **reminders**, and handle **emails**. What can I help with today?", ts: now() },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sampleIdx, setSampleIdx] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    setInput("");
    setBusy(true);

    const userMsg: Message = { role: "user", text, ts: now() };
    setMessages((m) => [...m, userMsg]);

    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));

    const idx = sampleIdx % SAMPLE_EXCHANGES.length;
    const reply = SAMPLE_EXCHANGES[idx][1];
    setSampleIdx((i) => i + 1);

    setMessages((m) => [...m, { role: "assistant", text: reply, ts: now() }]);
    setBusy(false);
  };

  const useSample = () => {
    const idx = sampleIdx % SAMPLE_EXCHANGES.length;
    setInput(SAMPLE_EXCHANGES[idx][0]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 text-xs font-mono">
        {["Calendar", "Reminders", "Email"].map((cap) => (
          <span key={cap} className="border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-emerald-400">
            {cap} ✓
          </span>
        ))}
      </div>

      <div className="h-72 overflow-y-auto border border-white/20 bg-black p-4 space-y-3 font-mono text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="mt-0.5 h-5 w-5 shrink-0 rounded-none border border-emerald-400 bg-emerald-400/10 flex items-center justify-center text-[9px] text-emerald-400 font-bold">AI</div>
            )}
            <div className={`max-w-[78%] rounded-none px-3 py-2 text-xs leading-relaxed ${m.role === "user" ? "bg-white text-black" : "border border-white/20 bg-white/5 text-white"}`}>
              {m.text.split("\n").map((line, j) => (
                <p key={j} className={j > 0 ? "mt-1" : ""}>
                  {line.split(/(\*\*[^*]+\*\*)/).map((seg, k) =>
                    seg.startsWith("**") ? <strong key={k}>{seg.slice(2, -2)}</strong> : seg
                  )}
                </p>
              ))}
              <div className="mt-1 text-[10px] opacity-40">{m.ts}</div>
            </div>
            {m.role === "user" && (
              <div className="mt-0.5 h-5 w-5 shrink-0 border border-white/40 bg-white/10 flex items-center justify-center text-[9px] text-white font-bold">W</div>
            )}
          </div>
        ))}
        {busy && (
          <div className="flex gap-2">
            <div className="h-5 w-5 shrink-0 border border-emerald-400 bg-emerald-400/10 flex items-center justify-center text-[9px] text-emerald-400 font-bold">AI</div>
            <div className="border border-white/20 bg-white/5 px-3 py-2 text-xs text-white/50">
              <span className="inline-flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <button
          onClick={useSample}
          className="border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:bg-white/10"
        >
          Sample
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask your assistant…"
          className="flex-1 border border-white/20 bg-black px-3 py-2 font-mono text-xs text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
        />
        <button
          onClick={() => send(input)}
          disabled={busy || !input.trim()}
          className="border-2 border-white bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-black disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
