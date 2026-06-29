import { MacbookMockup } from "@/app/components/MacbookMockup";
import {
  ArchitectureBox,
  ProjectSection,
  ProjectShell,
} from "@/app/components/ProjectShell";

export const metadata = {
  title: "Bold and Beyond — Wellness Ecosystem | Wilson Ali",
  description:
    "Wellness Ecosystem & Smart Hardware. Mission: Upgrade Your Human OS.",
};

export default function BoldAndBeyondPage() {
  return (
    <ProjectShell
      title="Bold and Beyond"
      tag="Wellness"
      description="A full-stack wellness ecosystem combining a smart wearable hardware platform, AI health coaching, habit intelligence, and a community-driven marketplace. Mission: Upgrade Your Human OS."
      tech={[
        "Next.js",
        "React Native",
        "Supabase",
        "Gemini API",
        "BLE / Wearable SDK",
        "TypeScript",
        "Stripe",
        "Vercel",
      ]}
    >
      <ProjectSection title="App Preview">
        <MacbookMockup>
          <div className="flex h-full w-full flex-col bg-neutral-950 font-sans text-white">
            <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-900 px-4 py-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto flex h-6 w-64 items-center rounded bg-neutral-800 px-3 text-[10px] text-white/40">
                app.boldandbeyond.com
              </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="flex w-40 flex-col border-r border-white/10 bg-neutral-900 p-3 text-[10px]">
                <div className="mb-3 text-[11px] font-black uppercase tracking-widest text-pink-400">B&B</div>
                {["Overview", "Vitals", "Workouts", "Nutrition", "Sleep", "Coach AI", "Marketplace"].map((item, i) => (
                  <div key={item} className={`mb-1 rounded px-2 py-1.5 font-medium ${i === 0 ? "bg-pink-500 text-white" : "text-white/60"}`}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-4">
                <div className="mb-4 text-sm font-black uppercase tracking-tight text-white">Your Human OS — Today</div>
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "HRV", value: "68ms", color: "text-green-400" },
                    { label: "Sleep Score", value: "84", color: "text-blue-400" },
                    { label: "Readiness", value: "91%", color: "text-pink-400" },
                  ].map((s) => (
                    <div key={s.label} className="rounded border border-white/10 bg-white/5 p-3 text-center">
                      <div className="text-[9px] text-white/40 uppercase tracking-wider">{s.label}</div>
                      <div className={`mt-1 text-xl font-black ${s.color}`}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded border border-white/10 bg-white/5 p-3">
                  <div className="mb-2 text-[9px] uppercase tracking-wider text-white/40">AI Coach Insight</div>
                  <p className="text-[10px] leading-relaxed text-white/70">
                    &ldquo;Your recovery score is high today. Optimal window for strength training is 2–6PM.
                    Hydration is 20% below target — aim for 600ml before your next session.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MacbookMockup>
      </ProjectSection>

      <ProjectSection title="What Bold and Beyond is">
        <p>
          Bold and Beyond is not a fitness app. It is a complete human
          performance operating system — hardware, software, AI, and community
          in a single vertically integrated product. The wearable collects
          biometric data continuously; the AI layer synthesises it into
          personalised coaching; the marketplace connects users with verified
          coaches, supplements, and gear.
        </p>
        <p>
          The platform targets the premium wellness consumer who has outgrown
          generic fitness apps and wants a system that adapts to them — not the
          other way around.
        </p>
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ArchitectureBox
            title="Hardware + Data Layer"
            steps={[
              { label: "BLE Wearable", description: "Custom wearable streams HRV, SpO2, skin temperature, and movement data via Bluetooth LE SDK." },
              { label: "Edge Processing", description: "On-device preprocessing filters noise and computes 30-second rolling averages before cloud sync." },
              { label: "Supabase Real-time", description: "Biometric events streamed to Supabase with real-time subscriptions for live dashboard updates." },
              { label: "Time-Series Store", description: "InfluxDB stores raw sensor data; Postgres stores aggregated daily summaries and user profiles." },
            ]}
          />
          <ArchitectureBox
            title="AI Coaching Layer"
            steps={[
              { label: "Readiness Model", description: "LSTM trained on HRV, sleep, and activity patterns predicts daily readiness score 0–100." },
              { label: "Gemini Coach", description: "Gemini generates personalised daily coaching messages grounded on the user's last 7-day biometric context." },
              { label: "Habit Intelligence", description: "Reinforcement learning agent identifies habit formation patterns and suggests optimal micro-interventions." },
              { label: "Progress Narratives", description: "Weekly AI-generated progress reports with trend analysis delivered in conversational language." },
            ]}
          />
        </div>
      </ProjectSection>

      <ProjectSection title="Product Pillars">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Vitals Dashboard:</strong> Real-time HRV, sleep architecture, recovery score, and strain index visualised in a clean daily overview.</li>
          <li><strong>AI Coach:</strong> Context-aware coaching that adjusts recommendations based on biometric trends, not generic templates.</li>
          <li><strong>Workout Intelligence:</strong> Adaptive training plans that scale intensity based on readiness score and recovery status.</li>
          <li><strong>Nutrition Sync:</strong> Meal logging with macro tracking and AI-generated meal suggestions aligned with training goals.</li>
          <li><strong>Marketplace:</strong> Vetted coaches, supplements, and wellness products with integrated purchasing and fulfilment.</li>
          <li><strong>Community:</strong> Challenge system, leaderboards, and group coaching sessions with accountability mechanics.</li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
