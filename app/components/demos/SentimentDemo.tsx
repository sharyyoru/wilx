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
  "frustrated", "worst", "fail", "broken", "waste", "ugly",
]);

function classify(text: string): "positive" | "negative" | "neutral" {
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
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(classify(text));
      setLoading(false);
    }, 600);
  };

  const colorMap = {
    positive: "bg-accent-blue text-white",
    negative: "bg-accent-pink text-white",
    neutral: "bg-paper text-ink",
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
          className="w-full resize-none border-4 border-ink bg-paper p-4 font-mono text-base shadow-brutal-sm outline-none focus:shadow-brutal"
          placeholder="Type a tweet or Reddit comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="border-4 border-ink bg-accent-yellow px-6 py-3 font-bold uppercase tracking-wider shadow-brutal transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg disabled:opacity-50 disabled:hover:translate-0 disabled:hover:shadow-brutal"
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => {
                setText(example);
                setResult(null);
              }}
              className="border-2 border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-brutal-sm transition-colors hover:bg-accent-yellow"
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
            className={`border-4 border-ink p-4 shadow-brutal ${colorMap[result]}`}
          >
            <span className="text-sm font-bold uppercase tracking-wider opacity-80">
              Predicted sentiment
            </span>
            <div className="mt-1 text-2xl font-black">{labelMap[result]}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-ink/70">
        This demo uses a rule-based classifier for the UI. In production, swap
        the logic for a Gemini API call or a fine-tuned Hugging Face model.
      </p>
    </div>
  );
}
