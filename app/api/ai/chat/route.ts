import { getModel } from "@/lib/gemini";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

const systemPrompt = `
You are a helpful, professional customer support AI for a technology services company.
Keep answers concise (under 3 sentences when possible).
You can help with: order status, refunds, shipping, password resets, pricing, and general questions.
If the user asks something outside your scope, politely offer to connect them with a human agent.
`;

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const model = getModel("gemini-1.5-flash");

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I will act as the customer support AI." }] },
        ...history.map((msg: ChatMessage) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const reply = response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      {
        error: "AI chat failed",
        fallback: true,
      },
      { status: 500 }
    );
  }
}
