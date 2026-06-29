import Link from "next/link";
import { ReactNode } from "react";
import { BentoCardTag } from "./BentoCard";
import { TextReveal } from "./ScrollReveal";

export type ProjectShellProps = {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  children: ReactNode;
};

export function ProjectShell({
  title,
  tag,
  description,
  tech,
  children,
}: ProjectShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex flex-1 flex-col">
        <section className="border-b-4 border-white px-4 py-8 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 border-2 border-white bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-brutal-white-sm transition-colors hover:bg-white hover:text-black"
          >
            ← Back to Home
          </Link>

          <div className="max-w-4xl">
            <BentoCardTag className="mb-4">{tag}</BentoCardTag>
            <TextReveal
              text={title}
              tag="h1"
              className="mb-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl"
            />
            <p className="max-w-2xl text-lg font-medium leading-relaxed">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((item) => (
                <span
                  key={item}
                  className="border-2 border-white bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-brutal-white-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="flex-1 px-4 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl space-y-12">{children}</div>
        </div>

        <footer className="border-t-4 border-white bg-black px-4 py-8 text-white sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">
                Want to build this together?
              </h3>
              <p className="text-sm text-white/70">
                Reach out to discuss architecture, production wiring, or team
                enablement.
              </p>
            </div>
            <a
              href="mailto:artali.create@gmail.com"
              className="inline-flex items-center border-4 border-white bg-black px-6 py-3 font-bold uppercase tracking-wider text-white shadow-brutal-white transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-white-lg"
            >
              Contact Wilson Ali
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function ProjectSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-black uppercase tracking-tight sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed sm:text-lg">
        {children}
      </div>
    </section>
  );
}

export function ArchitectureBox({
  title,
  steps,
}: {
  title: string;
  steps: { label: string; description: string }[];
}) {
  return (
    <div className="border-4 border-white bg-black p-6 text-white shadow-brutal-white">
      <h3 className="mb-4 text-lg font-black uppercase tracking-tight">
        {title}
      </h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.label} className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-white bg-white font-bold text-black">
              {index + 1}
            </div>
            <div>
              <div className="font-bold uppercase tracking-wide">{step.label}</div>
              <p className="text-sm text-white/80">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DemoPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-4 border-white bg-black p-1 shadow-brutal-white">
      <div className="border-4 border-white bg-black p-6 text-white shadow-brutal-white-sm">
        <h3 className="mb-4 text-lg font-black uppercase tracking-tight">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
