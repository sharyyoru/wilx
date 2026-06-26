import {
  BentoCard,
  BentoCardBody,
  BentoCardFooter,
  BentoCardTag,
  BentoCardTitle,
} from "./components/BentoCard";
import { KineticText } from "./components/KineticText";
import { Marquee } from "./components/Marquee";
import { ScrollReveal, TextReveal } from "./components/ScrollReveal";

const skills = [
  "Next.js",
  "React",
  "Supabase",
  "Laravel",
  "Windsurf",
  "AI Orchestration",
];

const projects = [
  {
    title: "ALiice",
    description:
      "Next-Gen Medical CRM + ERP. Architecting scalable, multi-tenant healthcare infrastructure.",
    tag: "Healthcare",
    color: "orange" as const,
  },
  {
    title: "Code DXB",
    description:
      "Enterprise AI & Workforce Transformation Conference. Dubai, October 2026.",
    tag: "Conference",
    color: "blue" as const,
  },
  {
    title: "Bold and Beyond",
    description:
      "Wellness Ecosystem & Smart Hardware. Mission: Upgrade Your Human OS.",
    tag: "Wellness",
    color: "pink" as const,
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col paper-texture">
      {/* Decorative noise grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
        aria-hidden="true"
      >
        <div className="h-full w-full" />
      </div>

      <main className="flex flex-1 flex-col">
        {/* Hero Section */}
        <section className="relative flex min-h-[90vh] flex-col justify-between border-b-4 border-ink px-4 py-8 sm:px-8 lg:px-12">
          <div className="flex items-start justify-between">
            <span className="inline-block border-2 border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-brutal-sm">
              Available for Select Projects
            </span>
            <span className="hidden text-sm font-bold uppercase tracking-wider sm:block">
              Dubai, UAE
            </span>
          </div>

          <div className="flex flex-col gap-8 py-12 md:py-20">
            <KineticText
              text="ART WILSON ALIPIO"
              className="max-w-6xl"
              baseSize="text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] leading-[0.85]"
            />
            <div className="max-w-2xl">
              <TextReveal
                text="Creative AI Solution Building Specialist."
                tag="p"
                className="text-xl font-bold uppercase tracking-tight text-ink sm:text-2xl md:text-3xl"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-wrap gap-3">
              {["AI Infrastructure", "Technical Direction", "Product Strategy"].map(
                (item) => (
                  <span
                    key={item}
                    className="border-2 border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-brutal-sm"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">
              Scroll to explore
            </span>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="px-4 py-16 sm:px-8 lg:px-12">
          <div className="mb-8 flex items-center justify-between">
            <TextReveal
              text="Selected Work"
              tag="h2"
              className="text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl"
            />
            <span className="hidden h-4 flex-1 border-b-4 border-ink sm:ml-6 sm:block" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[minmax(220px,auto)]">
            {/* Bento Box 1: The Bio */}
            <BentoCard
              colSpan={5}
              rowSpan={2}
              color="yellow"
              className="justify-between"
            >
              <BentoCardTag>Identity</BentoCardTag>
              <BentoCardTitle className="text-3xl sm:text-4xl">
                The Bio
              </BentoCardTitle>
              <BentoCardBody className="text-lg font-medium">
                Transitioning complex enterprise challenges into elegant
                AI-driven ecosystems. Former agency Technical Director now
                architecting independent tech infrastructure.
              </BentoCardBody>
              <BentoCardFooter>
                <span className="text-sm font-bold uppercase tracking-wider">
                  Technical Director → Independent
                </span>
              </BentoCardFooter>
            </BentoCard>

            {/* Bento Box 2: ALiice */}
            <BentoCard
              colSpan={7}
              rowSpan={1}
              color="orange"
              className="justify-between"
            >
              <BentoCardTag>{projects[0].tag}</BentoCardTag>
              <BentoCardTitle className="text-3xl sm:text-4xl">
                {projects[0].title}
              </BentoCardTitle>
              <BentoCardBody>{projects[0].description}</BentoCardBody>
              <BentoCardFooter>
                <span className="text-sm font-bold uppercase tracking-wider">
                  View Case Study
                </span>
                <span className="text-2xl">→</span>
              </BentoCardFooter>
            </BentoCard>

            {/* Bento Box 3: Code DXB */}
            <BentoCard
              colSpan={4}
              rowSpan={1}
              color="blue"
              className="justify-between"
            >
              <BentoCardTag>{projects[1].tag}</BentoCardTag>
              <BentoCardTitle>{projects[1].title}</BentoCardTitle>
              <BentoCardBody>{projects[1].description}</BentoCardBody>
              <BentoCardFooter>
                <span className="text-sm font-bold uppercase tracking-wider">
                  Oct 2026
                </span>
              </BentoCardFooter>
            </BentoCard>

            {/* Bento Box 4: Bold and Beyond */}
            <BentoCard
              colSpan={4}
              rowSpan={1}
              color="pink"
              className="justify-between"
            >
              <BentoCardTag>{projects[2].tag}</BentoCardTag>
              <BentoCardTitle>{projects[2].title}</BentoCardTitle>
              <BentoCardBody>{projects[2].description}</BentoCardBody>
              <BentoCardFooter>
                <span className="text-sm font-bold uppercase tracking-wider">
                  Wellness Tech
                </span>
              </BentoCardFooter>
            </BentoCard>

            {/* Bento Box 5: Tech Arsenal (Marquee) */}
            <BentoCard
              colSpan={12}
              rowSpan={1}
              color="paper"
              className="overflow-hidden p-0"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b-4 border-ink bg-paper p-4 sm:p-6">
                  <BentoCardTitle className="mb-0">Tech Arsenal</BentoCardTitle>
                  <BentoCardTag>Always Evolving</BentoCardTag>
                </div>
                <div className="flex flex-1 items-center">
                  <Marquee
                    items={skills}
                    speed={25}
                    className="border-y-0"
                    itemClassName="text-foreground"
                  />
                </div>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* Contact Marquee */}
        <section className="border-t-4 border-ink bg-paper">
          <Marquee
            items={[
              "Let's Build Something Sharp",
              "AI Solution Architecture",
              "Technical Direction",
              "wilson@example.com",
              "Dubai, UAE",
            ]}
            speed={40}
            itemClassName="text-foreground"
            separator="◆"
          />
        </section>

        {/* Footer */}
        <footer className="border-t-4 border-ink bg-ink px-4 py-12 text-paper sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <ScrollReveal className="md:col-span-6">
              <h3 className="mb-4 text-2xl font-black uppercase tracking-tight">
                Art Wilson Alipio
              </h3>
              <p className="max-w-md text-paper/80">
                Creative AI Solution Building Specialist. Technical Director.
                Architect of AI-driven ecosystems.
              </p>
            </ScrollReveal>
            <ScrollReveal className="md:col-span-3" delay={0.1}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-paper/60">
                Connect
              </h4>
              <ul className="space-y-2 font-medium">
                <li>
                  <a
                    href="https://www.linkedin.com/in/artwilsonalipio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/sharyyoru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal className="md:col-span-3" delay={0.2}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-paper/60">
                Location
              </h4>
              <p className="font-medium">Dubai, United Arab Emirates</p>
              <p className="mt-2 text-sm text-paper/60">
                Open to work · On-site / Hybrid
              </p>
            </ScrollReveal>
          </div>
          <div className="mt-12 flex flex-col justify-between gap-4 border-t-2 border-paper/20 pt-6 sm:flex-row sm:items-center">
            <p className="text-sm text-paper/60">
              © {new Date().getFullYear()} Art Wilson Alipio. All rights reserved.
            </p>
            <p className="text-sm font-bold uppercase tracking-wider text-paper/60">
              Built with Next.js + Tailwind + Framer Motion
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
