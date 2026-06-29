import Link from "next/link";
import {
  BentoCard,
  BentoCardBody,
  BentoCardFooter,
  BentoCardTag,
  BentoCardTitle,
} from "./components/BentoCard";
import { DitherShaderBackground } from "./components/DitherShaderBackground";
import { Marquee } from "./components/Marquee";
import { ScrollReveal, TextReveal } from "./components/ScrollReveal";
import { ScrollToExplore } from "./components/ScrollToExplore";

const EMAIL = "artali.create@gmail.com";
const GITHUB = "https://github.com/sharyyoru";
const LINKEDIN = "https://www.linkedin.com/in/wilson-ali-3a1156141/";

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

const aiProjectExamples = [
  {
    title: "Sentiment Analysis",
    description:
      "Classify Twitter or Reddit posts as positive, negative, or neutral to understand brand perception and public opinion.",
    tag: "NLP / Text Mining",
    color: "blue" as const,
    slug: "sentiment-analysis",
    tech: ["Python", "TextBlob", "SpaCy", "Gemini API"],
  },
  {
    title: "Customer Support Chatbot",
    description:
      "Build an AI conversation layer for customer service with intent recognition, entity extraction, and contextual responses.",
    tag: "Conversational AI",
    color: "orange" as const,
    slug: "customer-support-chatbot",
    tech: ["Rasa / Dialogflow", "Next.js", "Gemini API", "WebSocket"],
  },
  {
    title: "Image Classification",
    description:
      "Classify animals, plants, or medical images using transfer learning on ResNet or VGG to demonstrate deep learning fundamentals.",
    tag: "Computer Vision",
    color: "pink" as const,
    slug: "image-classification",
    tech: ["Python", "TensorFlow", "Keras", "ResNet / VGG"],
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black text-white">
      <DitherShaderBackground />

      <main className="relative z-10 flex flex-1 flex-col">
        {/* Hero Section */}
        <section className="relative flex min-h-[90vh] flex-col justify-between border-b-4 border-white px-4 py-8 sm:px-8 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-3">
              <span className="inline-block border-2 border-white bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-brutal-white-sm text-white">
                Available for Select Projects
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-block border-2 border-white bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-brutal-white-sm transition-colors hover:bg-white hover:text-black"
              >
                Contact: {EMAIL}
              </a>
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">
              Dubai, UAE
            </span>
          </div>

          <div className="flex flex-col gap-6 py-12 md:py-20">
            <h1 className="max-w-6xl font-black uppercase leading-[0.85] tracking-tighter text-[14vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw]">
              WILSON ALI
            </h1>
            <div className="max-w-3xl">
              <p className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl md:text-3xl">
                Creative AI Solution Building Specialist.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-white bg-black px-4 py-2 text-sm font-bold uppercase tracking-wider"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-white bg-black px-4 py-2 text-sm font-bold uppercase tracking-wider"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-wrap gap-3">
              {["AI Infrastructure", "Technical Direction", "Product Strategy"].map(
                (item) => (
                  <span
                    key={item}
                    className="border-2 border-white bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
            <ScrollToExplore targetId="selected-work" />
          </div>
        </section>

        {/* Bento Grid Section */}
        <section id="selected-work" className="px-4 py-16 sm:px-8 lg:px-12">
          <div className="mb-8 flex items-center justify-between">
            <TextReveal
              text="Selected Work"
              tag="h2"
              className="text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl"
            />
            <span className="hidden h-4 flex-1 border-b-4 border-white sm:ml-6 sm:block" />
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
              color="dark"
              className="overflow-hidden p-0"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b-4 border-white bg-black p-4 sm:p-6">
                  <BentoCardTitle className="mb-0 text-white">Tech Arsenal</BentoCardTitle>
                  <BentoCardTag>Always Evolving</BentoCardTag>
                </div>
                <div className="flex flex-1 items-center">
                  <Marquee
                    items={skills}
                    speed={25}
                    className="border-y-0"
                    itemClassName="text-white"
                    variant="dark"
                  />
                </div>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* AI Project Examples Section */}
        <section className="border-t-4 border-white bg-black px-4 py-16 sm:px-8 lg:px-12">
          <div className="mb-8 flex items-center justify-between">
            <TextReveal
              text="AI Project Examples"
              tag="h2"
              className="text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl"
            />
            <span className="hidden h-4 flex-1 border-b-4 border-white sm:ml-6 sm:block" />
          </div>

          <p className="mb-8 max-w-3xl text-lg font-medium">
            Hands-on AI prototypes that demonstrate NLP, conversational AI, and
            computer vision architecture. Each example includes a working UI
            sample, system architecture, and notes on production wiring.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {aiProjectExamples.map((project) => (
              <BentoCard
                key={project.slug}
                colSpan={1}
                rowSpan={1}
                color={project.color}
                className="justify-between"
              >
                <BentoCardTag>{project.tag}</BentoCardTag>
                <BentoCardTitle className="text-2xl sm:text-3xl">
                  {project.title}
                </BentoCardTitle>
                <BentoCardBody>{project.description}</BentoCardBody>
                <div className="my-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border-2 border-white bg-black px-2 py-1 text-xs font-bold uppercase text-white shadow-brutal-white-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <BentoCardFooter>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-bold uppercase tracking-wider underline-offset-4 hover:underline"
                  >
                    View Architecture & Demo
                  </Link>
                  <span className="text-2xl">→</span>
                </BentoCardFooter>
              </BentoCard>
            ))}
          </div>
        </section>

        {/* Contact Marquee */}
        <section className="border-t-4 border-white bg-black">
          <Marquee
            items={[
              "Let's Build Something Sharp",
              "AI Solution Architecture",
              "Technical Direction",
              EMAIL,
              "Dubai, UAE",
            ]}
            speed={40}
            itemClassName="text-white"
            separator="◆"
            variant="dark"
          />
        </section>

        {/* Footer */}
        <footer className="border-t-4 border-white bg-black px-4 py-12 text-white sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <ScrollReveal className="md:col-span-6">
              <h3 className="mb-4 text-2xl font-black uppercase tracking-tight">
                Wilson Ali
              </h3>
              <p className="max-w-md text-white/80">
                Creative AI Solution Building Specialist. Technical Director.
                Architect of AI-driven ecosystems.
              </p>
            </ScrollReveal>
            <ScrollReveal className="md:col-span-3" delay={0.1}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
                Connect
              </h4>
              <ul className="space-y-2 font-medium">
                <li>
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal className="md:col-span-3" delay={0.2}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
                Location
              </h4>
              <p className="font-medium">Dubai, United Arab Emirates</p>
              <p className="mt-2 text-sm text-white/60">
                Open to work · On-site / Hybrid
              </p>
            </ScrollReveal>
          </div>
          <div className="mt-12 flex flex-col justify-between gap-4 border-t-2 border-white/20 pt-6 sm:flex-row sm:items-center">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Wilson Ali. All rights reserved.
            </p>
            <p className="text-sm font-bold uppercase tracking-wider text-white/60">
              Built with Next.js + Tailwind + Framer Motion
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
