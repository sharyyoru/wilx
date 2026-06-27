import { getModel } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const model = getModel("gemini-1.5-flash");

    const prompt = `
Classify the sentiment of the following social media text as exactly one of: positive, negative, or neutral.
Then explain the reasoning in one short sentence.

Text: """${text}"""

Return ONLY a JSON object in this exact format, with no markdown or extra text:
{
  "sentiment": "positive" | "negative" | "neutral",
  "explanation": "short reason"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({
      sentiment: parsed.sentiment,
      explanation: parsed.explanation,
    });
  } catch (error) {
    console.error("Sentiment analysis error:", error);
    return NextResponse.json(
      {
        error: "AI analysis failed",
        fallback: true,
      },
      { status: 500 }
    );
  }
}
