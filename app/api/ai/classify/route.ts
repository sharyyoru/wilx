import { getModel } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Image base64 data is required" },
        { status: 400 }
      );
    }

    const model = getModel("gemini-1.5-flash");

    const prompt = `
Look at this image and classify it. Return ONLY a JSON object with no markdown or extra text.

Provide the top 3 predicted categories as an array with label and confidence (0.0 to 1.0). Choose from general categories like animals, plants, objects, or vehicles depending on what is in the image. Do not use extremely specific breed names unless you are very confident.

Format:
{
  "predictions": [
    { "label": "Category A", "confidence": 0.94 },
    { "label": "Category B", "confidence": 0.04 },
    { "label": "Category C", "confidence": 0.02 }
  ]
}
`;

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: image,
        },
      },
    ]);
    const response = await result.response;
    const rawText = response.text();

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ predictions: parsed.predictions });
  } catch (error) {
    console.error("Image classification error:", error);
    return NextResponse.json(
      {
        error: "AI classification failed",
        fallback: true,
      },
      { status: 500 }
    );
  }
}
