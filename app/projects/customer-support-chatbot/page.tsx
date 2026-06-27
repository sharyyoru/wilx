import { ChatbotDemo } from "@/app/components/demos/ChatbotDemo";
import {
  ArchitectureBox,
  DemoPanel,
  ProjectSection,
  ProjectShell,
} from "@/app/components/ProjectShell";

export const metadata = {
  title: "Customer Support Chatbot Project | Wilson Ali",
  description:
    "Conversational AI chatbot for customer support using intent recognition and contextual responses.",
};

export default function CustomerSupportChatbotPage() {
  return (
    <ProjectShell
      title="Customer Support Chatbot"
      tag="Conversational AI"
      description="Build a chatbot with Rasa or Dialogflow to learn about AI conversations, intent recognition, entity extraction, and user interaction design. This is a recruiter-friendly project because it maps directly to the automation of customer service."
      tech={[
        "Rasa",
        "Dialogflow",
        "Next.js",
        "WebSocket",
        "Gemini API",
        "Supabase",
      ]}
    >
      <ProjectSection title="Why this project matters">
        <p>
          Customer support chatbots are one of the fastest-growing AI
          applications in enterprises. They reduce ticket volume, shorten
          response times, and collect structured data from unstructured
          conversations. For a portfolio, this project proves you can design
          an interaction flow, not just train a model.
        </p>
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ArchitectureBox
            title="NLU & Dialogue"
            steps={[
              {
                label: "Intent Detection",
                description:
                  "Classify user input into intents: order_status, refund, shipping, password_reset.",
              },
              {
                label: "Entity Extraction",
                description:
                  "Pull order IDs, dates, and product names from the message.",
              },
              {
                label: "Dialogue Policy",
                description:
                  "Rasa stories or Dialogflow contexts decide the next bot action.",
              },
              {
                label: "Response Generation",
                description:
                  "Return templated answers or use Gemini for dynamic, human-like replies.",
              },
            ]}
          />
          <ArchitectureBox
            title="Integration Flow"
            steps={[
              {
                label: "Chat UI",
                description:
                  "Next.js chat interface with message history and typing indicators.",
              },
              {
                label: "API Gateway",
                description:
                  "Next.js API route or WebSocket server receives messages.",
              },
              {
                label: "Bot Engine",
                description:
                  "Rasa/Dialogflow processes intent and returns the next response.",
              },
              {
                label: "CRM Hook",
                description:
                  "Fetch live order data from Shopify/Salesforce and personalize replies.",
              },
            ]}
          />
        </div>
      </ProjectSection>

      <ProjectSection title="How competitors present this">
        <p>
          Portfolios like Edenred Invoice Assistant and GRC Compliance LLM show
          chatbot projects with a full conversation thread, intent labels, and a
          handoff-to-human button. The best examples include a short case study
          explaining deflection rate or ticket-resolution impact, which makes
          the project feel production-ready rather than academic.
        </p>
      </ProjectSection>

      <ProjectSection title="Working UI Sample">
        <DemoPanel title="Try the support chatbot">
          <ChatbotDemo />
        </DemoPanel>
      </ProjectSection>

      <ProjectSection title="Production Wiring">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Bot platform:</strong> Rasa Open Source for full control, or
            Dialogflow CX for faster Google Cloud deployment.
          </li>
          <li>
            <strong>LLM fallback:</strong> Route unrecognized intents to the
            Gemini API for graceful, context-aware answers.
          </li>
          <li>
            <strong>Session storage:</strong> Supabase Realtime or Redis to
            persist conversation context across sessions.
          </li>
          <li>
            <strong>Escalation:</strong> Detect frustration or unknown intent
            and offer a live-agent handoff via WebSocket.
          </li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
