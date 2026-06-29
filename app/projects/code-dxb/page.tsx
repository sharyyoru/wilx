import { MacbookMockup } from "@/app/components/MacbookMockup";
import {
  ArchitectureBox,
  ProjectSection,
  ProjectShell,
} from "@/app/components/ProjectShell";

export const metadata = {
  title: "Code DXB — AI Conference Dubai 2026 | Wilson Ali",
  description:
    "Enterprise AI & Workforce Transformation Conference. Dubai, October 2026.",
};

export default function CodeDXBPage() {
  return (
    <ProjectShell
      title="Code DXB 2026"
      tag="Conference"
      description="Enterprise AI & Workforce Transformation Conference. Dubai, October 2026. Where the region's top technologists, enterprise leaders, and AI builders converge to shape the next era of work."
      tech={[
        "Next.js",
        "Supabase",
        "Stripe",
        "TypeScript",
        "Tailwind CSS",
        "Resend",
        "Vercel",
        "QR Check-in",
      ]}
    >
      <ProjectSection title="Event Platform Preview">
        <MacbookMockup>
          <div className="flex h-full w-full flex-col bg-neutral-950 font-sans text-white">
            <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-900 px-4 py-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto flex h-6 w-64 items-center rounded bg-neutral-800 px-3 text-[10px] text-white/40">
                codedxb.com
              </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
              {/* Hero */}
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col items-center justify-center border-b border-white/10 bg-gradient-to-br from-blue-950 to-black p-6 text-center">
                  <div className="mb-2 text-[9px] font-bold uppercase tracking-widest text-blue-400">Dubai · October 2026</div>
                  <div className="text-2xl font-black uppercase tracking-tighter text-white">CODE DXB</div>
                  <div className="mt-1 text-[10px] text-white/50">Enterprise AI & Workforce Transformation</div>
                  <div className="mt-4 flex gap-3">
                    {["320+", "48", "12"].map((n, i) => (
                      <div key={i} className="text-center">
                        <div className="text-base font-black text-blue-400">{n}</div>
                        <div className="text-[8px] text-white/40">{["Attendees", "Speakers", "Workshops"][i]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded bg-blue-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Get Tickets
                  </div>
                </div>
                {/* Schedule strip */}
                <div className="flex gap-2 overflow-x-auto p-3">
                  {[
                    { time: "9:00", talk: "Opening Keynote", speaker: "Wilson Ali" },
                    { time: "10:30", talk: "AI in Healthcare", speaker: "Dr. Aisha R." },
                    { time: "12:00", talk: "LLM Architecture", speaker: "Sam K." },
                    { time: "14:00", talk: "Workforce AI Panel", speaker: "4 Speakers" },
                  ].map((s) => (
                    <div key={s.time} className="min-w-[120px] rounded border border-white/10 bg-white/5 p-2">
                      <div className="text-[9px] text-blue-400">{s.time}</div>
                      <div className="text-[10px] font-bold text-white">{s.talk}</div>
                      <div className="text-[9px] text-white/40">{s.speaker}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MacbookMockup>
      </ProjectSection>

      <ProjectSection title="What Code DXB is">
        <p>
          Code DXB is Dubai&apos;s premier enterprise AI conference — a two-day
          event bringing together C-suite executives, engineering leaders, and
          AI practitioners to explore the practical realities of workforce
          transformation in an AI-first world.
        </p>
        <p>
          Unlike generic tech conferences, Code DXB is deliberately
          practitioner-focused: every session is required to include a live
          demo, a real deployment case study, or a hands-on workshop component.
          No vaporware, no keynote theatre.
        </p>
      </ProjectSection>

      <ProjectSection title="Platform Architecture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ArchitectureBox
            title="Event Operations"
            steps={[
              { label: "Ticketing", description: "Stripe-powered tiered ticketing (General, VIP, Workshop) with promo code engine and group booking." },
              { label: "QR Check-in", description: "Unique QR code per ticket; scanning app validates and logs attendance in real time via Supabase." },
              { label: "Schedule Builder", description: "Admin CMS for session management, speaker profiles, room assignments, and live schedule updates." },
              { label: "Email Automation", description: "Resend handles confirmation, reminder, and post-event follow-up sequences with personalisation." },
            ]}
          />
          <ArchitectureBox
            title="Attendee Experience"
            steps={[
              { label: "Personalised Agenda", description: "Attendees build a personal schedule from 48 sessions; conflict detection prevents double-booking." },
              { label: "Networking Matching", description: "AI matches attendees by role, interests, and stated goals; suggests top 5 connections to meet." },
              { label: "Live Q&A", description: "Real-time audience question submission with upvoting; moderator dashboard surfaces top questions." },
              { label: "Post-Event Hub", description: "Session recordings, slide decks, and speaker contacts available in a private attendee portal." },
            ]}
          />
        </div>
      </ProjectSection>

      <ProjectSection title="Event Highlights">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Keynotes:</strong> 4 main stage keynotes from regional AI leaders, enterprise CDOs, and international AI researchers.</li>
          <li><strong>Workshops:</strong> 12 hands-on half-day workshops covering LLM fine-tuning, AI product management, and enterprise deployment patterns.</li>
          <li><strong>Roundtables:</strong> Closed-door executive roundtables on AI governance, talent strategy, and board-level AI literacy.</li>
          <li><strong>Expo:</strong> 30+ AI vendors demonstrating live production systems — no slideware permitted on the expo floor.</li>
          <li><strong>Hackathon:</strong> 24-hour AI hackathon with AED 50,000 prize pool, judged by a panel of enterprise AI architects.</li>
          <li><strong>Networking:</strong> AI-matched networking sessions, speaker dinners, and a closing evening at a Dubai landmark venue.</li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
