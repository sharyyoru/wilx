import { MacbookMockup } from "@/app/components/MacbookMockup";
import {
  ArchitectureBox,
  ProjectSection,
  ProjectShell,
} from "@/app/components/ProjectShell";

export const metadata = {
  title: "ALiice — Medical CRM + ERP | Wilson Ali",
  description:
    "Next-Gen Medical CRM + ERP. Scalable, multi-tenant healthcare infrastructure architected by Wilson Ali.",
};

export default function AliicePage() {
  return (
    <ProjectShell
      title="ALiice — Medical CRM + ERP"
      tag="Healthcare"
      description="A next-generation, multi-tenant Medical CRM and ERP platform purpose-built for modern healthcare organisations. ALiice unifies patient management, clinical workflows, billing, inventory, and AI-assisted diagnostics in a single composable infrastructure."
      tech={[
        "Next.js",
        "Supabase",
        "PostgreSQL",
        "TypeScript",
        "Tailwind CSS",
        "Gemini API",
        "Row-Level Security",
        "Vercel",
      ]}
    >
      <ProjectSection title="App Preview">
        <MacbookMockup>
          <div className="flex h-full w-full flex-col bg-neutral-950 font-sans text-white">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-900 px-4 py-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto flex h-6 w-64 items-center rounded bg-neutral-800 px-3 text-[10px] text-white/40">
                app.aliice.health
              </div>
            </div>
            {/* App UI */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="flex w-40 flex-col border-r border-white/10 bg-neutral-900 p-3 text-[10px]">
                <div className="mb-3 text-[11px] font-black uppercase tracking-widest text-white/40">ALiice</div>
                {["Dashboard", "Patients", "Appointments", "Billing", "Inventory", "Reports", "Settings"].map((item, i) => (
                  <div key={item} className={`mb-1 rounded px-2 py-1.5 font-medium ${i === 0 ? "bg-white text-black" : "text-white/60 hover:bg-white/5"}`}>
                    {item}
                  </div>
                ))}
              </div>
              {/* Main */}
              <div className="flex-1 overflow-auto p-4">
                <div className="mb-4 text-sm font-black uppercase tracking-tight text-white">Dashboard</div>
                <div className="mb-4 grid grid-cols-4 gap-2">
                  {[
                    { label: "Patients", value: "2,847" },
                    { label: "Today's Appts", value: "34" },
                    { label: "Revenue", value: "$48.2k" },
                    { label: "Open Tickets", value: "12" },
                  ].map((s) => (
                    <div key={s.label} className="rounded border border-white/10 bg-white/5 p-3">
                      <div className="text-[9px] text-white/40 uppercase tracking-wider">{s.label}</div>
                      <div className="mt-1 text-lg font-black text-white">{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded border border-white/10 bg-white/5 p-3">
                    <div className="mb-2 text-[9px] uppercase tracking-wider text-white/40">Recent Patients</div>
                    {["Sarah M., 34 — Cardiology", "James K., 52 — Ortho", "Aisha R., 28 — General"].map((p) => (
                      <div key={p} className="border-b border-white/5 py-1.5 text-[10px] text-white/70">{p}</div>
                    ))}
                  </div>
                  <div className="rounded border border-white/10 bg-white/5 p-3">
                    <div className="mb-2 text-[9px] uppercase tracking-wider text-white/40">AI Diagnostics Queue</div>
                    {["Chest X-Ray — Pending", "Lab Results — Analysing", "MRI Scan — Complete ✓"].map((p) => (
                      <div key={p} className="border-b border-white/5 py-1.5 text-[10px] text-white/70">{p}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MacbookMockup>
      </ProjectSection>

      <ProjectSection title="Why ALiice exists">
        <p>
          Healthcare software in the MENA region is fragmented, legacy-heavy,
          and rarely designed for the actual workflows of clinicians and
          administrators. ALiice was architected from first principles: a
          multi-tenant SaaS platform where every hospital, clinic, or practice
          operates in complete data isolation while sharing the same
          infrastructure cost curve.
        </p>
        <p>
          The AI layer — powered by Gemini — assists with clinical note
          summarisation, diagnosis suggestion based on lab results, and
          automated billing code extraction, reducing administrative overhead
          by an estimated 40%.
        </p>
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ArchitectureBox
            title="Multi-Tenant Data Layer"
            steps={[
              { label: "Row-Level Security", description: "Supabase RLS policies enforce tenant isolation at the database layer — no application-level filtering required." },
              { label: "Schema per Tenant", description: "Each clinic gets a dedicated Postgres schema; shared tables for global config only." },
              { label: "Audit Logging", description: "Every mutation is logged with user, tenant, timestamp, and previous value for HIPAA-style compliance." },
              { label: "Encrypted PII", description: "Patient identifiers encrypted at rest using AES-256; keys managed per tenant." },
            ]}
          />
          <ArchitectureBox
            title="AI Clinical Layer"
            steps={[
              { label: "Note Summarisation", description: "Gemini summarises consultation notes into structured SOAP format in under 2 seconds." },
              { label: "Lab Result Analysis", description: "Structured lab data fed to Gemini for differential diagnosis suggestions with confidence scores." },
              { label: "Billing Code Extraction", description: "ICD-10 and CPT codes auto-extracted from clinical notes, reducing coder workload." },
              { label: "Appointment Intelligence", description: "No-show prediction model suggests optimal scheduling buffers per patient history." },
            ]}
          />
        </div>
      </ProjectSection>

      <ProjectSection title="Core Modules">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Patient 360:</strong> Unified timeline of all visits, prescriptions, lab results, imaging, and communications.</li>
          <li><strong>Appointment Engine:</strong> Drag-and-drop scheduling with conflict detection, SMS/email reminders, and waitlist management.</li>
          <li><strong>Billing & Insurance:</strong> Claims submission, EOB parsing, and payment reconciliation with regional insurance integrations.</li>
          <li><strong>Inventory & Pharmacy:</strong> Real-time stock tracking, expiry alerts, automated reorder triggers.</li>
          <li><strong>ERP Core:</strong> HR, payroll, and facility management modules built on the same data layer.</li>
          <li><strong>Admin Portal:</strong> Super-admin tenant management, usage analytics, and billing for the SaaS operator.</li>
        </ul>
      </ProjectSection>
    </ProjectShell>
  );
}
