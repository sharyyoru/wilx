"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "bot";
  text: string;
};

const responses: Record<string, string> = {
  "order": "I can help you track or cancel an order. Please provide your order ID.",
  "refund": "Refunds are processed within 5-7 business days. Would you like to initiate one?",
  "shipping": "Shipping usually takes 3-5 business days domestically and 7-14 days internationally.",
  "password": "You can reset your password from the account settings page.",
  "price": "I can check current pricing for you. Which product are you asking about?",
  "help": "I am here to help. What do you need assistance with today?",
  "hello": "Hi there! How can I support you today?",
  "hi": "Hello! What can I do for you?",
  "thanks": "You are welcome! Let me know if you need anything else.",
};

const fallbackResponses = [
  "I am not sure I understood that. Could you rephrase?",
  "I am still learning. Let me connect you with a human agent if needed.",
  "Can you provide more details so I can assist better?",
];

function getBotReply(userText: string): string {
  const lower = userText.toLowerCase();
  for (const keyword of Object.keys(responses)) {
    if (lower.includes(keyword)) return responses[keyword];
  }
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

const starterPrompts = [
  "Where is my order?",
  "I want a refund",
  "How do I reset my password?",
  "What are your shipping times?",
];

export function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I am your AI support assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(userMessage);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setTyping(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex w-full flex-col border-4 border-ink bg-paper shadow-brutal">
      <div className="border-b-4 border-ink bg-ink p-3 text-paper">
        <span className="text-sm font-bold uppercase tracking-wider">
          Customer Support AI
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex h-72 flex-col gap-3 overflow-y-auto p-4"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[80%] border-2 border-ink p-3 text-sm shadow-brutal-sm ${
                msg.role === "user"
                  ? "self-end bg-accent-yellow text-ink"
                  : "self-start bg-paper text-ink"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="self-start border-2 border-ink bg-paper p-3 text-sm shadow-brutal-sm"
            >
              <span className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:150ms]">●</span>
                <span className="animate-bounce [animation-delay:300ms]">●</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t-4 border-ink p-3">
        <div className="mb-3 flex flex-wrap gap-2">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                setInput(prompt);
              }}
              className="border-2 border-ink bg-paper px-2 py-1 text-xs font-bold uppercase shadow-brutal-sm transition-colors hover:bg-accent-yellow"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a support question..."
            className="flex-1 border-4 border-ink bg-paper px-4 py-2 font-mono text-base shadow-brutal-sm outline-none focus:shadow-brutal"
          />
          <button
            onClick={handleSend}
            className="border-4 border-ink bg-accent-blue px-4 py-2 font-bold uppercase tracking-wider text-white shadow-brutal transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
