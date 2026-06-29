import { AIAssistantDemo } from "@/app/components/demos/AIAssistantDemo";
import {
  ArchitectureBox,
  DemoPanel,
  ProjectSection,
  ProjectShell,
} from "@/app/components/ProjectShell";

export const metadata = {
  title: "AI Virtual Assistant | Wilson Ali",
  description:
    "Multi-purpose AI assistant combining NLP, calendar sync, email integration, and reminder management.",
};

export default function AIAssistantPage() {
  return (
    <ProjectShell
      title="AI Integrated Virtual Assistant"
      tag="Conversational AI / NLP"
      description="A production-grade AI assistant that manages calendar events, drafts and summarises emails, and sets context-aware reminders. Combines large language model reasoning with live API integrations — demonstrating end-to-end multi-agent system design."
      tech={[
        "Next.js",
        "Gemini API",
        "Google Calendar API",
        "Gmail API",
        "LangChain",
        "TypeScript",
        "Vercel AI SDK",
        "WebSocket",
      ]}
    >
      <ProjectSection title="Why this project matters">
        <p>
          AI assistants that connect to real productivity APIs are the fastest-
          growing category of enterprise software. Unlike toy chatbots, this
          system demonstrates intent classification, entity extraction,
          multi-turn memory, and live third-party API orchestration — skills
          that map directly to roles in AI product engineering and solution
          architecture.
        </p>
        <p>
          Companies like Google, Microsoft, and dozens of AI-first startups
          treat calendar + email + reminder integration as the baseline for
          evaluating AI assistant engineers. Showing a working pipeline puts
          you in the top 5% of candidates.
        </p>
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ArchitectureBox
            title="NLP Pipeline"
            steps={[
              {
                label: "Intent Classification",
                description:
                  "Gemini classifies each utterance into one of: schedule, remind, email-read, email-draft, query.",
              },
              {
                label: "Entity Extraction",
                description:
                  "Named entities (person, time, date, subject) extracted and normalised before API dispatch.",
              },
              {
                label: "Context Management",
                description:
                  "Sliding window conversation history maintains multi-turn context for follow-up queries.",
              },
              {
                label: "Response Generation",
                description:
                  "LLM generates natural-language confirmations with structured action payloads embedded.",
              },
            ]}
          />
          <ArchitectureBox
            title="Integration Layer"
            steps={[
              {
                label: "Calendar API",
                description:
                  "Google Calendar API creates, reads, and updates events with timezone normalisation.",
              },
              {
                label: "Email API",
                description:
                  "Gmail API fetches, summarises, and drafts replies; priority scoring via LLM.",
              },
              {
                label: "Reminder Engine",
                description:
                  "Scheduled jobs (Vercel Cron / BullMQ) fire push notifications and in-app alerts.",
              },
              {
                label: "Auth & Security",
                description:
                  "OAuth 2.0 scoped tokens; no email content stored server-side beyond session.",
              },
            ]}
          />
        </div>
      </ProjectSection>

      <ProjectSection title="How top competitors present this">
        <p>
          The strongest AI assistant portfolios (e.g., Adept AI demos,
          HuggingFace Transformers Agents) show a live chat interface with
          real API calls, a clear latency breakdown, and at least one
          multi-step task like &quot;schedule a meeting, draft the invite, and
          remind me 30 minutes before&quot;. The demo below simulates the full
          intent → action → confirmation loop with sample data.
        </p>
      </ProjectSection>

      <ProjectSection title="Interactive Demo">
        <DemoPanel title="AI Assistant — calendar, reminders & email (type a request or click Sample)">
          <AIAssistantDemo />
        </DemoPanel>
      </ProjectSection>

      <ProjectSection title="Production Wiring">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>LLM backbone:</strong> Gemini 1.5 Flash via Vercel AI SDK
            streaming — sub-500ms first token on typical requests.
          </li>
          <li>
            <strong>Tool calling:</strong> Gemini function-calling maps intents
            to typed API handler functions; no regex parsing required.
          </li>
          <li>
            <strong>Auth:</strong> NextAuth.js with Google OAuth; scoped to
            calendar.events and gmail.modify only.
          </li>
          <li>
            <strong>Memory:</strong> Conversation history stored in Supabase
            with per-session isolation; optional long-term memory via
            vector embeddings.
          </li>
          <li>
            <strong>Deployment:</strong> Vercel serverless with edge runtime
            for the streaming chat endpoint; Vercel Cron for reminders.
          </li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
