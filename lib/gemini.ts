import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export function getModel(modelName: string = "gemini-1.5-flash") {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY is not configured in .env.local");
  }
  return genAI.getGenerativeModel({ model: modelName });
}
