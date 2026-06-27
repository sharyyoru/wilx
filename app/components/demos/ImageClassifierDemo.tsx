"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sampleCategories = [
  ["Golden Retriever", 0.94, "Labrador", 0.04, "Beagle", 0.02],
  ["Tabby Cat", 0.91, "Siamese", 0.06, "Persian", 0.03],
  ["African Elephant", 0.97, "Asian Elephant", 0.02, "Rhinoceros", 0.01],
  ["Sunflower", 0.89, "Daisy", 0.08, "Tulip", 0.03],
];

export function ImageClassifierDemo() {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<
    { label: string; confidence: number }[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [fallback, setFallback] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getMockResults = () => {
    const random = sampleCategories[Math.floor(Math.random() * sampleCategories.length)];
    const parsed = [];
    for (let i = 0; i < random.length; i += 2) {
      parsed.push({ label: random[i] as string, confidence: random[i + 1] as number });
    }
    return parsed;
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    setResults(null);
    setLoading(true);
    setFallback(false);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];

      try {
        const res = await fetch("/api/ai/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        if (!res.ok) throw new Error("AI request failed");

        const data = await res.json();
        setResults(data.predictions);
      } catch {
        setFallback(true);
        setResults(getMockResults());
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer border-4 border-dashed border-white bg-black p-8 text-center shadow-brutal-white-sm transition-colors hover:bg-white hover:text-black"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <div className="text-sm font-bold uppercase tracking-wider">
          Drop an image here or click to upload
        </div>
        <div className="mt-1 text-xs opacity-70">
          JPG, PNG, WEBP up to 5MB
        </div>
      </div>

      {image && (
        <div className="border-4 border-white bg-black p-2 shadow-brutal-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Upload preview"
            className="h-48 w-full object-contain"
          />
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 border-4 border-white bg-black p-4 shadow-brutal-white">
          <div className="h-6 w-6 animate-spin border-4 border-white border-t-transparent" />
          <span className="font-bold uppercase tracking-wider">
            Analyzing with Gemini Vision...
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-4 border-white bg-black p-4 text-white shadow-brutal-white"
          >
            <div className="mb-3 flex items-center justify-between text-sm font-bold uppercase tracking-wider">
              <span>Top Predictions</span>
              {fallback && (
                <span className="text-xs text-white/70">Local Fallback</span>
              )}
            </div>
            <div className="space-y-3">
              {results.map((result) => (
                <div key={result.label}>
                  <div className="flex justify-between text-sm font-bold">
                    <span>{result.label}</span>
                    <span>{(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="mt-1 h-4 w-full border-2 border-white bg-black">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence * 100}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-white/70">
        This demo first sends the image to Gemini Vision for classification. If
        the API is unavailable, it falls back to simulated ResNet/VGG-style
        predictions.
      </p>
    </div>
  );
}
