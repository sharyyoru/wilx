"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const positiveWords = new Set([
  "good", "great", "love", "excellent", "happy", "best", "amazing", "awesome",
  "fantastic", "wonderful", "perfect", "brilliant", "outstanding", "superb",
  "like", "enjoy", "pleased", "satisfied", "impressive", "remarkable",
]);

const negativeWords = new Set([
  "bad", "hate", "terrible", "worst", "awful", "sad", "angry", "poor",
  "horrible", "disappointing", "disgusting", "boring", "useless", "annoying",
  "frustrated", "fail", "broken", "waste", "ugly",
]);

function classifyLocally(text: string): "positive" | "negative" | "neutral" {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  let score = 0;
  words.forEach((word) => {
    if (positiveWords.has(word)) score += 1;
    if (negativeWords.has(word)) score -= 1;
  });
  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
}

const examples = [
  "I love this product! It works perfectly.",
  "Terrible service, I am very disappointed.",
  "The package arrived on Tuesday.",
];

export function SentimentDemo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<"positive" | "negative" | "neutral" | null>(null);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [fallback, setFallback] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setExplanation("");
    setFallback(false);

    try {
      const res = await fetch("/api/ai/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("AI request failed");

      const data = await res.json();
      setResult(data.sentiment);
      setExplanation(data.explanation);
    } catch {
      setResult(classifyLocally(text));
      setExplanation("Gemini was unavailable; using local rule-based fallback.");
      setFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const colorMap = {
    positive: "bg-white text-black",
    negative: "bg-white text-black",
    neutral: "bg-black text-white",
  };

  const labelMap = {
    positive: "Positive 😊",
    negative: "Negative 😠",
    neutral: "Neutral 😐",
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="sentiment-input"
          className="text-sm font-bold uppercase tracking-wider"
        >
          Enter social media text
        </label>
        <textarea
          id="sentiment-input"
          rows={4}
          className="w-full resize-none border-4 border-white bg-black p-4 font-mono text-base text-white shadow-brutal-white-sm outline-none focus:shadow-brutal-white"
          placeholder="Type a tweet or Reddit comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="border-4 border-white bg-white px-6 py-3 font-bold uppercase tracking-wider text-black shadow-brutal-white transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-white-lg disabled:opacity-50 disabled:hover:translate-0 disabled:hover:shadow-brutal-white"
        >
          {loading ? "Analyzing with Gemini..." : "Analyze Sentiment"}
        </button>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => {
                setText(example);
                setResult(null);
                setExplanation("");
              }}
              className="border-2 border-white bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-brutal-white-sm transition-colors hover:bg-white hover:text-black"
            >
              Try: &quot;{example.slice(0, 20)}...&quot;
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={`border-4 border-white p-4 shadow-brutal-white ${colorMap[result]}`}
          >
            <span className="text-sm font-bold uppercase tracking-wider opacity-80">
              {fallback ? "Local fallback sentiment" : "Gemini predicted sentiment"}
            </span>
            <div className="mt-1 text-2xl font-black">{labelMap[result]}</div>
            {explanation && (
              <p className="mt-2 text-sm opacity-90">{explanation}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-white/70">
        This demo first calls the Gemini API. If the API is unavailable, it falls
        back to a local rule-based classifier.
      </p>
    </div>
  );
}
