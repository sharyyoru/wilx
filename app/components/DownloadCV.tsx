"use client";

import { useState } from "react";

export function DownloadCV() {
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

      const W = 210;
      const H = 297;
      const ml = 18;
      const mr = W - 18;
      const col2 = 130; // right column start

      let y = 0;

      // ─── Helpers ────────────────────────────────────────────────────
      const rgb = (r: number, g: number, b: number) => doc.setTextColor(r, g, b);
      const fill = (r: number, g: number, b: number) => doc.setFillColor(r, g, b);
      const draw = (r: number, g: number, b: number) => doc.setDrawColor(r, g, b);

      const bold = (size: number) => { doc.setFont("helvetica", "bold"); doc.setFontSize(size); };
      const normal = (size: number) => { doc.setFont("helvetica", "normal"); doc.setFontSize(size); };
      const italic = (size: number) => { doc.setFont("helvetica", "italic"); doc.setFontSize(size); };

      const rule = (yy: number, x1 = ml, x2 = mr, thickness = 0.3) => {
        draw(220, 220, 220); doc.setLineWidth(thickness);
        doc.line(x1, yy, x2, yy);
      };

      const wrap = (text: string, x: number, yy: number, maxW: number, lineH: number): number => {
        const lines = doc.splitTextToSize(text, maxW) as string[];
        doc.text(lines, x, yy);
        return yy + lines.length * lineH;
      };

      const sectionHead = (label: string, yy: number): number => {
        bold(7);
        rgb(140, 140, 140);
        doc.text(label.toUpperCase(), ml, yy);
        rule(yy + 1.5, ml, mr, 0.25);
        return yy + 6;
      };

      // ─── HEADER BLOCK ────────────────────────────────────────────────
      fill(10, 10, 10);
      doc.rect(0, 0, W, 46, "F");

      // Accent bar left edge
      fill(255, 255, 255);
      doc.rect(0, 0, 3, 46, "F");

      // Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      rgb(255, 255, 255);
      doc.text("WILSON ALI", ml + 2, 18);

      // Title
      normal(9);
      rgb(180, 180, 180);
      doc.text("Technical Director  ·  Creative Strategist  ·  AI Solution Architect", ml + 2, 26);

      // Contact row
      bold(7.5);
      rgb(255, 255, 255);
      doc.text("+971 58 541 7606", ml + 2, 34);
      doc.text("artali.create@gmail.com", ml + 2 + 44, 34);
      doc.text("Dubai, UAE", ml + 2 + 44 + 52, 34);
      doc.text("github.com/sharyyoru", ml + 2 + 44 + 52 + 28, 34);

      // Subtle dot separators
      rgb(100, 100, 100);
      normal(9);
      doc.text("·", ml + 2 + 43, 34);
      doc.text("·", ml + 2 + 44 + 51, 34);
      doc.text("·", ml + 2 + 44 + 52 + 27, 34);

      y = 56;

      // ─── TWO COLUMN LAYOUT ───────────────────────────────────────────
      // Left column width
      const lcW = col2 - ml - 6;
      const rcW = mr - col2;

      // ═══════════════ LEFT COLUMN ═══════════════════════════════════
      let ly = y;

      // PROFILE
      ly = sectionHead("Profile", ly);
      normal(8.5);
      rgb(50, 50, 50);
      ly = wrap(
        "Versatile technology leader and creative director with 14+ years shaping digital ecosystems across the MENA region. Expert in AI solution architecture, enterprise platform design, and full-cycle brand campaigns for global clients. Currently building ALiice (Medical CRM/ERP), Code DXB (AI conference), and Bold & Beyond (wellness hardware/software).",
        ml, ly, lcW, 4.5
      );
      ly += 8;

      // STRENGTHS
      ly = sectionHead("Core Strengths", ly);
      const strengths = [
        ["AI Solution Architecture", "Designing scalable AI pipelines, LLM integrations, and multi-tenant SaaS platforms from first principles."],
        ["Technical Direction", "Leading engineering teams across full-stack, mobile, and hardware projects from prototype to production."],
        ["Creative Direction", "Concept development and campaign direction for Lipton, McDonald's, Total, and regional enterprise brands."],
        ["Conference Production", "End-to-end event strategy: hackathons, esports, keynotes, and activations for 300+ attendee summits."],
        ["Product Strategy", "Market positioning, go-to-market planning, and growth architecture across B2B and B2C verticals."],
      ];
      for (const [title, desc] of strengths) {
        bold(8.5); rgb(20, 20, 20); doc.text(`${title}`, ml, ly);
        ly += 4;
        normal(7.8); rgb(80, 80, 80);
        ly = wrap(desc, ml, ly, lcW, 4);
        ly += 4;
      }
      ly += 2;

      // PROJECTS
      ly = sectionHead("Key Projects", ly);
      const projects = [
        {
          name: "ALiice — Medical CRM + ERP",
          tag: "Healthcare · SaaS",
          desc: "Multi-tenant healthcare platform unifying patient management, clinical workflows, billing, AI diagnostics, and ERP. Built on Next.js, Supabase with row-level security, and Gemini AI.",
        },
        {
          name: "Code DXB 2026",
          tag: "Conference · Dubai",
          desc: "Enterprise AI & Workforce Transformation Conference. 300+ attendees, 48 speakers, 12 workshops. Full event platform: ticketing, QR check-in, AI networking matching, live Q&A.",
        },
        {
          name: "Bold and Beyond",
          tag: "Wellness · Hardware",
          desc: "Smart wearable + AI coaching platform. BLE biometric device streams HRV, SpO2, and movement data to an adaptive coaching layer powered by Gemini and LSTM readiness models.",
        },
      ];
      for (const p of projects) {
        bold(8.5); rgb(20, 20, 20); doc.text(p.name, ml, ly);
        italic(7.5); rgb(130, 130, 130); doc.text(p.tag, ml, ly + 3.5);
        ly += 7;
        normal(7.8); rgb(70, 70, 70);
        ly = wrap(p.desc, ml, ly, lcW, 4);
        ly += 5;
      }

      // ═══════════════ RIGHT COLUMN ══════════════════════════════════
      let ry = y;

      // EXPERIENCE
      ry = sectionHead("Experience", ry);

      const jobs = [
        {
          title: "Conference & Activations Producer",
          company: "ATEX International Exhibitions",
          period: "Jun 2025 – Present  ·  1 yr 1 mo",
          location: "Dubai, UAE",
          bullets: [
            "Developed conference tracks for Real Estate, AI, F&B, Education & Hospitality.",
            "Organised hackathons and Esports events, driving attendee engagement.",
            "Produced activations for exhibitions at codeexpodxb.com & codeexpolibya.com.",
          ],
        },
        {
          title: "Technical Director",
          company: "Mutant",
          period: "Apr 2022 – Present  ·  4 yrs 3 mos",
          location: "United Arab Emirates",
          bullets: [
            "Full-stack technical direction across web, mobile, and AI product builds.",
            "Architected scalable multi-tenant platforms and AI-integrated workflows.",
          ],
        },
        {
          title: "Head of Marketing",
          company: "VLCC International LLC — MEA",
          period: "2018 – 2020  ·  2 yrs",
          location: "United Arab Emirates",
          bullets: [
            "Led regional marketing strategy across Middle East & Africa territories.",
          ],
        },
        {
          title: "Marketing Director",
          company: "V-TAC Innovative LED Lighting",
          period: "2017 – 2018  ·  1 yr",
          location: "United Kingdom",
          bullets: ["Directed brand and go-to-market strategy for LED product lines."],
        },
        {
          title: "Marketing Consultant",
          company: "WTS Energy",
          period: "Jul 2016 – Apr 2017  ·  10 mos",
          location: "Dubai, UAE",
          bullets: ["Energy sector B2B marketing strategy and campaign execution."],
        },
        {
          title: "Digital Marketing Consultant",
          company: "Sandpaper",
          period: "Jan 2016 – Jul 2016  ·  7 mos",
          location: "Dubai, UAE",
          bullets: ["Digital strategy, SEO, and paid media campaigns."],
        },
        {
          title: "Digital Marketing Consultant",
          company: "FP7",
          period: "Aug 2015 – Jan 2016  ·  6 mos",
          location: "Dubai, UAE",
          bullets: ["Integrated digital campaigns for regional brand clients."],
        },
        {
          title: "Digital Marketing Specialist",
          company: "Trafalgar Properties LLC",
          period: "Sep 2012 – Aug 2015  ·  3 yrs",
          location: "Dubai, UAE",
          bullets: ["Led digital marketing for luxury real estate developer."],
        },
        {
          title: "Senior Graphic Designer",
          company: "Quintessentially Creative",
          period: "Jan 2011 – Aug 2012  ·  1 yr 8 mos",
          location: "Dubai, UAE",
          bullets: ["Brand identity, luxury print, and digital design."],
        },
      ];

      for (const job of jobs) {
        if (ry > H - 20) break; // page overflow guard
        bold(8.5); rgb(20, 20, 20); doc.text(job.title, col2, ry);
        ry += 4;
        bold(7.5); rgb(60, 60, 60); doc.text(job.company, col2, ry);
        normal(7); rgb(140, 140, 140); doc.text(`  ·  ${job.period}`, col2 + doc.getTextWidth(job.company), ry);
        ry += 3.5;
        italic(7); rgb(160, 160, 160); doc.text(job.location, col2, ry);
        ry += 4;
        normal(7.5); rgb(70, 70, 70);
        for (const b of job.bullets) {
          doc.text("–", col2, ry);
          ry = wrap(b, col2 + 3.5, ry, rcW - 4, 3.8);
          ry += 0.5;
        }
        ry += 3;
        rule(ry - 1.5, col2, mr, 0.15);
      }

      // TECH STACK (right column, below experience)
      ry += 2;
      if (ry < H - 40) {
        ry = sectionHead("Tech Stack", ry);
        // right-column section head workaround
        // Already used helper which writes at ml, so redo manually:
        ry -= 6;
        bold(7); rgb(140, 140, 140);
        doc.text("TECH STACK", col2, ry);
        draw(220, 220, 220); doc.setLineWidth(0.25);
        doc.line(col2, ry + 1.5, mr, ry + 1.5);
        ry += 6;

        const techGroups = [
          ["Frontend", "Next.js, React, TypeScript, Tailwind CSS"],
          ["Backend", "Supabase, PostgreSQL, Node.js, REST/GraphQL"],
          ["AI / ML", "Gemini API, LLM fine-tuning, LSTM, Computer Vision"],
          ["Infrastructure", "Vercel, Docker, Git, CI/CD"],
          ["Creative", "Adobe CC, Figma, Brand Strategy, Video Direction"],
        ];
        for (const [label, stack] of techGroups) {
          bold(7.5); rgb(60, 60, 60); doc.text(`${label}:`, col2, ry);
          normal(7.5); rgb(100, 100, 100);
          doc.text(stack, col2 + 20, ry);
          ry += 4.5;
        }
      }

      // ─── FOOTER ─────────────────────────────────────────────────────
      fill(10, 10, 10);
      doc.rect(0, H - 10, W, 10, "F");
      fill(255, 255, 255);
      doc.rect(0, H - 10, 3, 10, "F");
      normal(7); rgb(120, 120, 120);
      doc.text("Wilson Ali  ·  artali.create@gmail.com  ·  +971 58 541 7606  ·  Dubai, UAE", ml + 2, H - 4);
      bold(7); rgb(180, 180, 180);
      doc.text("wilx.vercel.app", mr - 28, H - 4);

      doc.save("Wilson-Ali-CV.pdf");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={generate}
      disabled={loading}
      className="inline-flex items-center gap-2 border-2 border-white bg-black px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white hover:text-black disabled:opacity-50"
    >
      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-4-4m4 4l4-4M4 20h16" />
      </svg>
      {loading ? "Generating…" : "Download CV"}
    </button>
  );
}
