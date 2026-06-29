"use client";

import { useState } from "react";
import QRCode from "qrcode";

// ─── Constants ───────────────────────────────────────────────────────────────
const W = 210;
const H = 297;
const PAD = 16;          // page margin left/right
const FOOTER_H = 14;     // reserved footer height
const CONTENT_BOTTOM = H - FOOTER_H - 4;
const LINE_SM = 4.2;     // tight line height
const LINE_MD = 5.0;     // normal line height

// ─── Types ───────────────────────────────────────────────────────────────────
type Doc = import("jspdf").jsPDF;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function rgb(doc: Doc, r: number, g: number, b: number) { doc.setTextColor(r, g, b); }
function fill(doc: Doc, r: number, g: number, b: number) { doc.setFillColor(r, g, b); }
function stroke(doc: Doc, r: number, g: number, b: number) { doc.setDrawColor(r, g, b); }
function B(doc: Doc, size: number) { doc.setFont("helvetica", "bold"); doc.setFontSize(size); }
function N(doc: Doc, size: number) { doc.setFont("helvetica", "normal"); doc.setFontSize(size); }
function I(doc: Doc, size: number) { doc.setFont("helvetica", "italic"); doc.setFontSize(size); }

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}

function wrapText(doc: Doc, text: string, x: number, y: number, maxW: number, lineH: number): number {
  const lines = doc.splitTextToSize(text, maxW) as string[];
  doc.text(lines, x, y);
  return y + lines.length * lineH;
}

function hRule(doc: Doc, y: number, x1 = PAD, x2 = W - PAD, w = 0.2) {
  stroke(doc, 200, 200, 200);
  doc.setLineWidth(w);
  doc.line(x1, y, x2, y);
}

function sectionLabel(doc: Doc, text: string, x: number, y: number, x2: number): number {
  B(doc, 6.5); rgb(doc, 130, 130, 130);
  doc.text(text.toUpperCase(), x, y);
  hRule(doc, y + 1.8, x, x2, 0.2);
  return y + 6;
}

function renderFooter(doc: Doc, pageNum: number, total: number) {
  const fy = H - FOOTER_H + 4;
  fill(doc, 12, 12, 12);
  doc.rect(0, H - FOOTER_H, W, FOOTER_H, "F");
  fill(doc, 255, 255, 255);
  doc.rect(0, H - FOOTER_H, 3, FOOTER_H, "F");
  N(doc, 7); rgb(doc, 210, 210, 210);
  doc.text("Wilson Ali", PAD + 2, fy);
  rgb(doc, 140, 140, 140);
  doc.text("artali.create@gmail.com", PAD + 2 + 22, fy);
  doc.text("+971 58 541 7606", PAD + 2 + 60, fy);
  doc.text("Dubai, UAE", PAD + 2 + 96, fy);
  // page number centred
  rgb(doc, 140, 140, 140);
  doc.text(`${pageNum} / ${total}`, W / 2, fy, { align: "center" });
  // portfolio link right-aligned — clickable
  B(doc, 7); rgb(doc, 230, 230, 230);
  doc.textWithLink("wilx.vercel.app", W - PAD - 2, fy, { url: "https://wilx.vercel.app/", align: "right" });
}


export function DownloadCV() {
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

      // ── PAGE 1 HEADER ────────────────────────────────────────────────
      const HEADER_H = 44;
      fill(doc, 10, 10, 10);
      doc.rect(0, 0, W, HEADER_H, "F");
      fill(doc, 255, 255, 255);
      doc.rect(0, 0, 3, HEADER_H, "F");

      // QR Code — top right corner of header
      const qrDataUrl: string = await QRCode.toDataURL("https://wilx.vercel.app/", {
        width: 120, margin: 1,
        color: { dark: "#ffffff", light: "#0a0a0a" },
      });
      const QR_SIZE = HEADER_H - 6;
      doc.addImage(qrDataUrl, "PNG", W - PAD - QR_SIZE, 3, QR_SIZE, QR_SIZE);
      // tiny label under QR
      N(doc, 5.5); rgb(doc, 130, 130, 130);
      doc.text("Scan for portfolio", W - PAD - QR_SIZE + QR_SIZE / 2, HEADER_H - 1, { align: "center" });

      // Name — clickable link to portfolio
      doc.setFont("helvetica", "bold"); doc.setFontSize(24);
      rgb(doc, 255, 255, 255);
      doc.textWithLink("WILSON ALI", PAD + 2, 16, { url: "https://wilx.vercel.app/" });

      N(doc, 8.5); rgb(doc, 170, 170, 170);
      doc.text("Technical Director  ·  Creative Strategist  ·  AI Solution Architect", PAD + 2, 23);

      // Contact row
      const contacts = ["+971 58 541 7606", "artali.create@gmail.com", "Dubai, UAE", "wilx.vercel.app"];
      let cx = PAD + 2;
      N(doc, 7.5); rgb(doc, 210, 210, 210);
      for (let i = 0; i < contacts.length; i++) {
        if (i > 0) { rgb(doc, 90, 90, 90); doc.text("·", cx, 31); cx += 5; }
        rgb(doc, 210, 210, 210);
        if (contacts[i] === "wilx.vercel.app") {
          doc.textWithLink(contacts[i], cx, 31, { url: "https://wilx.vercel.app/" });
        } else {
          doc.text(contacts[i], cx, 31);
        }
        cx += doc.getTextWidth(contacts[i]) + 1;
      }

      // ── TWO-COLUMN BODY ──────────────────────────────────────────────
      const startY = HEADER_H + 8;
      const col2X = 116;
      const lcW = col2X - PAD - 5;
      const rcW = W - PAD - col2X - 2;

      // We'll track left and right columns independently, adding new pages when needed
      let ly = startY;
      let ry = startY;

      const ensurePage = (col: "l" | "r", needed: number) => {
        const ref = col === "l" ? ly : ry;
        if (ref + needed > CONTENT_BOTTOM) {
          doc.addPage();
          ly = PAD + 4;
          ry = PAD + 4;
        }
      };

      // ──── LEFT COLUMN ────────────────────────────────────────────────

      // PROFILE
      ly = sectionLabel(doc, "Profile", PAD, ly, col2X - 3);
      N(doc, 8); rgb(doc, 40, 40, 40);
      ly = wrapText(doc,
        "Versatile technology leader and creative director with 14+ years shaping digital ecosystems across the MENA region. Expert in AI solution architecture, enterprise platform design, and full-cycle brand campaigns for global clients. Currently building ALiice (Medical CRM/ERP), Code DXB (AI Conference), and Bold & Beyond (Wellness Hardware/Software).",
        PAD, ly, lcW, LINE_MD);
      ly += 7;

      // CORE STRENGTHS
      ly = sectionLabel(doc, "Core Strengths", PAD, ly, col2X - 3);
      const strengths = [
        ["AI Solution Architecture", "Designing scalable AI pipelines, LLM integrations, and multi-tenant SaaS platforms from first principles."],
        ["Technical Direction", "Leading engineering teams across full-stack, mobile, and hardware projects from prototype to production."],
        ["Creative Direction", "Concept development and campaign direction for Lipton, McDonald's, Total, and regional enterprise brands."],
        ["Conference Production", "End-to-end event strategy: hackathons, esports, keynotes, and activations for 300+ attendee summits."],
        ["Product Strategy", "Market positioning, go-to-market planning, and growth architecture across B2B and B2C verticals."],
      ];
      for (const [title, desc] of strengths) {
        ensurePage("l", 14);
        B(doc, 8); rgb(doc, 20, 20, 20); doc.text(title, PAD, ly); ly += 4;
        N(doc, 7.5); rgb(doc, 75, 75, 75);
        ly = wrapText(doc, desc, PAD, ly, lcW, LINE_SM);
        ly += 5;
      }
      ly += 2;

      // TECH STACK
      ensurePage("l", 10);
      ly = sectionLabel(doc, "Tech Stack", PAD, ly, col2X - 3);
      const techGroups: [string, string][] = [
        ["Frontend", "Next.js · React · TypeScript · Tailwind CSS"],
        ["Backend", "Supabase · PostgreSQL · Node.js · REST / GraphQL"],
        ["AI / ML", "Gemini API · LLM Fine-tuning · LSTM · Computer Vision"],
        ["Infra", "Vercel · Docker · Git · CI/CD"],
        ["Creative", "Adobe CC · Figma · Brand Strategy · Video Direction"],
      ];
      for (const [label, stack] of techGroups) {
        ensurePage("l", 6);
        B(doc, 7.5); rgb(doc, 50, 50, 50); doc.text(`${label}:`, PAD, ly);
        N(doc, 7.5); rgb(doc, 90, 90, 90); doc.text(stack, PAD + 18, ly);
        ly += 5;
      }

      // ──── RIGHT COLUMN ───────────────────────────────────────────────

      // EXPERIENCE
      ry = sectionLabel(doc, "Work Experience", col2X, ry, W - PAD);
      const jobs = [
        {
          title: "Conference & Activations Producer",
          company: "ATEX International Exhibitions",
          period: "Jun 2025 – Present · 1 yr 1 mo",
          location: "Dubai, UAE",
          bullets: [
            "Developed conference tracks: Real Estate, AI, F&B, Education & Hospitality.",
            "Organised hackathons and Esports events driving attendee engagement.",
            "Produced activations for codeexpodxb.com & codeexpolibya.com.",
          ],
        },
        {
          title: "Technical Director",
          company: "Mutant",
          period: "Apr 2022 – Present · 4 yrs 3 mos",
          location: "United Arab Emirates",
          bullets: [
            "Full-stack technical direction across web, mobile, and AI products.",
            "Architected scalable multi-tenant platforms and AI-integrated workflows.",
          ],
        },
        {
          title: "Head of Marketing",
          company: "VLCC International LLC — MEA",
          period: "2018 – 2020 · 2 yrs",
          location: "United Arab Emirates",
          bullets: ["Led regional marketing strategy across Middle East & Africa."],
        },
        {
          title: "Marketing Director",
          company: "V-TAC Innovative LED Lighting",
          period: "2017 – 2018 · 1 yr",
          location: "United Kingdom",
          bullets: ["Directed brand and go-to-market strategy for LED product lines."],
        },
        {
          title: "Marketing Consultant",
          company: "WTS Energy",
          period: "Jul 2016 – Apr 2017 · 10 mos",
          location: "Dubai, UAE",
          bullets: ["B2B marketing strategy and campaign execution for energy sector."],
        },
        {
          title: "Digital Marketing Consultant",
          company: "Sandpaper",
          period: "Jan 2016 – Jul 2016 · 7 mos",
          location: "Dubai, UAE",
          bullets: ["Digital strategy, SEO, and paid media campaigns."],
        },
        {
          title: "Digital Marketing Consultant",
          company: "FP7",
          period: "Aug 2015 – Jan 2016 · 6 mos",
          location: "Dubai, UAE",
          bullets: ["Integrated digital campaigns for regional brand clients."],
        },
        {
          title: "Digital Marketing Specialist",
          company: "Trafalgar Properties LLC",
          period: "Sep 2012 – Aug 2015 · 3 yrs",
          location: "Dubai, UAE",
          bullets: ["Led digital marketing for luxury real estate developer in Dubai."],
        },
        {
          title: "Senior Graphic Designer",
          company: "Quintessentially Creative",
          period: "Jan 2011 – Aug 2012 · 1 yr 8 mos",
          location: "Dubai, UAE",
          bullets: ["Brand identity, luxury print, and digital design."],
        },
      ];

      let page1Done = false;
      let lp2End = PAD + 4; // tracks bottom of left column on page 2

      for (const job of jobs) {
        const est = 4.5 + 4 + 4.5 + job.bullets.length * 5 + 10;
        if (ry + est > CONTENT_BOTTOM) {
          doc.addPage();
          if (!page1Done) {
            // ── LEFT COLUMN PAGE 2: Creative Pursuits + S-TASH ──────────
            page1Done = true;
            let lp2 = PAD + 4;

            lp2 = sectionLabel(doc, "Creative Pursuits", PAD, lp2, col2X - 3);
            B(doc, 8); rgb(doc, 20, 20, 20);
            doc.text("Lego Custom Builds", PAD, lp2); lp2 += 4.5;
            N(doc, 7.5); rgb(doc, 70, 70, 70);
            lp2 = wrapText(doc,
              "Avid Lego custom builder specialising in Ninjago mech designs and original MOC engineering. Builds: Arc Dragon Mech, Life Dragon Mech, Ras Rage Mech, Cole Asura Mech, Kai Demon Hunter Mech, Jay Raider Mech, Master Mech. Each build applies structural engineering, aesthetic design, and original concept development.",
              PAD, lp2, lcW, LINE_SM);
            lp2 += 8;

            lp2 = sectionLabel(doc, "Entrepreneurship", PAD, lp2, col2X - 3);
            B(doc, 8); rgb(doc, 20, 20, 20);
            doc.text("S-TASH — Small Business Owner", PAD, lp2); lp2 += 4.5;
            I(doc, 7); rgb(doc, 110, 110, 110);
            doc.textWithLink("s-tash.store", PAD, lp2, { url: "https://www.s-tash.store/" }); lp2 += 5;
            N(doc, 7.5); rgb(doc, 70, 70, 70);
            lp2 = wrapText(doc,
              "Founder of S-TASH, an independent e-commerce brand and creative collection. Responsible for product curation, brand identity, digital storefront, marketing strategy, and end-to-end fulfilment. Demonstrates applied creative entrepreneurship alongside technical and marketing expertise.",
              PAD, lp2, lcW, LINE_SM);

            lp2End = lp2;
          }
          ly = PAD + 4;
          ry = PAD + 4;
        }
        B(doc, 8.5); rgb(doc, 20, 20, 20); doc.text(job.title, col2X, ry); ry += 4.5;
        B(doc, 7.5); rgb(doc, 55, 55, 55); doc.text(job.company, col2X, ry);
        N(doc, 7); rgb(doc, 120, 120, 120);
        doc.text(`  ·  ${job.period}`, col2X + doc.getTextWidth(job.company), ry);
        ry += 4;
        I(doc, 7); rgb(doc, 150, 150, 150); doc.text(job.location, col2X, ry); ry += 4.5;
        N(doc, 7.5); rgb(doc, 65, 65, 65);
        for (const b of job.bullets) {
          doc.text("\u2013", col2X, ry);
          ry = wrapText(doc, b, col2X + 3.5, ry, rcW - 4, LINE_SM);
          ry += 1.2;
        }
        ry += 3;
        hRule(doc, ry, col2X, W - PAD, 0.15);
        ry += 5;
      }

      // ── FULL-WIDTH SECTIONS on page 2, below both columns ────────────
      // Only render if experience spilled to page 2 and there's space
      if (page1Done) {
        const fullW = W - PAD * 2;
        let fw = Math.max(ry, lp2End) + 10;

        // Full-width divider
        hRule(doc, fw - 2, PAD, W - PAD, 0.3);

        // Section: Digital Marketing Approach
        fw = sectionLabel(doc, "Digital Marketing Approach", PAD, fw, W - PAD);
        fw += 1;
        const dmCols: [string, string][] = [
          ["Strategy & Planning", "Data-led campaign architecture spanning paid, organic, and owned channels. Full-funnel planning from awareness to conversion with KPI frameworks tailored per market."],
          ["Brand & Content", "Platform-native content strategy across social, search, and CRM. Deep understanding of regional audience behaviour across GCC and MENA markets."],
          ["Performance & Analytics", "Media buying, A/B optimisation, attribution modelling, and ROI measurement. Platforms: Meta Ads, Google Ads, TikTok, Programmatic, and SEO."],
        ];
        const dmColW = (fullW - 8) / 3;
        for (let i = 0; i < dmCols.length; i++) {
          const [title, desc] = dmCols[i];
          const bx = PAD + i * (dmColW + 4);
          B(doc, 7.5); rgb(doc, 20, 20, 20); doc.text(title, bx, fw);
          N(doc, 7); rgb(doc, 70, 70, 70);
          wrapText(doc, desc, bx, fw + 4, dmColW - 2, LINE_SM);
        }
        // Estimate height of tallest column (~4 lines)
        fw += 4 + 4 * LINE_SM + 6;

        hRule(doc, fw - 2, PAD, W - PAD, 0.15);

        // Section: AI Development Solutions
        fw = sectionLabel(doc, "AI Development Solutions", PAD, fw, W - PAD);
        fw += 1;
        const aiCols: [string, string][] = [
          ["Architecture & Integration", "End-to-end AI solution design: LLM API integration, RAG pipelines, multi-agent orchestration, and vector database design for production-grade SaaS platforms."],
          ["Applied AI Products", "Shipping AI-powered features in healthcare, wellness, events, and e-commerce — from Gemini-driven clinical summaries to LSTM biometric readiness models."],
          ["AI Strategy & Consulting", "Translating business problems into AI roadmaps. Workshop facilitation, proof-of-concept development, and go-to-market planning for AI-native products."],
        ];
        for (let i = 0; i < aiCols.length; i++) {
          const [title, desc] = aiCols[i];
          const bx = PAD + i * (dmColW + 4);
          B(doc, 7.5); rgb(doc, 20, 20, 20); doc.text(title, bx, fw);
          N(doc, 7); rgb(doc, 70, 70, 70);
          wrapText(doc, desc, bx, fw + 4, dmColW - 2, LINE_SM);
        }
      }

      // ── PAGE 2 — TOOLS & ADOBE PROFICIENCY ─────────────────────────
      doc.addPage();
      let py = PAD + 6;

      // Section: Adobe Creative Suite
      py = sectionLabel(doc, "Adobe Creative Suite — Proficiency", PAD, py, W - PAD);
      py += 2;

      // Draw Adobe tool rows as coloured badge + bar
      const adobeTools: [string, string, number, string][] = [
        ["Ps", "Photoshop",        98, "#31A8FF"],
        ["Ai", "Illustrator",       97, "#FF9A00"],
        ["Id", "InDesign",          92, "#FF3366"],
        ["Pr", "Premiere Pro",      90, "#9999FF"],
        ["Ae", "After Effects",     85, "#9999FF"],
        ["Au", "Audition",          78, "#00E4BB"],
        ["Lr", "Lightroom",         95, "#31A8FF"],
        ["XD", "Adobe XD",          82, "#FF61F6"],
        ["Dw", "Dreamweaver",       70, "#4EB3CF"],
        ["Br", "Bridge",            88, "#8A8A8A"],
      ];

      const COL_W = (W - PAD * 2 - 6) / 2;
      const ROW_H = 9;
      const BAR_W = COL_W - 32;
      const BAR_H = 3;

      for (let i = 0; i < adobeTools.length; i++) {
        const [abbr, name, pct, color] = adobeTools[i];
        const col = i % 2;
        const row = Math.floor(i / 2);
        const bx = PAD + col * (COL_W + 6);
        const by = py + row * ROW_H;

        // Coloured badge
        fill(doc, ...hexToRgb(color));
        doc.roundedRect(bx, by - 4, 8, 6, 1, 1, "F");
        doc.setFont("helvetica", "bold"); doc.setFontSize(5);
        rgb(doc, 255, 255, 255);
        doc.text(abbr, bx + 4, by - 0.3, { align: "center" });

        // Tool name
        B(doc, 7.5); rgb(doc, 25, 25, 25);
        doc.text(name, bx + 10, by - 0.3);

        // Proficiency bar background
        fill(doc, 230, 230, 230);
        doc.roundedRect(bx + 10, by + 1.5, BAR_W, BAR_H, 1, 1, "F");
        // Proficiency bar fill
        fill(doc, ...hexToRgb(color));
        doc.roundedRect(bx + 10, by + 1.5, BAR_W * (pct / 100), BAR_H, 1, 1, "F");
        // Percentage label
        N(doc, 6); rgb(doc, 100, 100, 100);
        doc.text(`${pct}%`, bx + 10 + BAR_W + 2, by + 4);
      }
      py += Math.ceil(adobeTools.length / 2) * ROW_H + 8;

      // Section: Design & AI Tools
      py = sectionLabel(doc, "Design & AI Tools", PAD, py, W - PAD);
      py += 2;

      const otherTools: [string, number, string][] = [
        ["Figma",               95, "#F24E1E"],
        ["Framer",              75, "#0055FF"],
        ["Canva",               88, "#00C4CC"],
        ["ChatGPT / OpenAI",    92, "#10A37F"],
        ["Gemini AI",           90, "#8E75F0"],
        ["Midjourney",          85, "#000000"],
        ["Runway ML",           72, "#1A1A1A"],
        ["ElevenLabs",          70, "#FF6B35"],
        ["Notion AI",           88, "#000000"],
        ["GitHub Copilot",      92, "#6E40C9"],
      ];
      const OTHER_COL_W = (W - PAD * 2 - 6) / 2;
      const OTHER_BAR_W = OTHER_COL_W - 32;

      for (let i = 0; i < otherTools.length; i++) {
        const [name, pct, color] = otherTools[i];
        const col = i % 2;
        const row = Math.floor(i / 2);
        const bx = PAD + col * (OTHER_COL_W + 6);
        const by = py + row * ROW_H;

        // Coloured dot
        const dotClr = color === "#000000" ? [60, 60, 60] : hexToRgb(color);
        fill(doc, ...dotClr as [number, number, number]);
        doc.circle(bx + 2, by - 1.5, 2, "F");

        B(doc, 7.5); rgb(doc, 25, 25, 25);
        doc.text(name, bx + 6, by - 0.3);

        fill(doc, 230, 230, 230);
        doc.roundedRect(bx + 6, by + 1.5, OTHER_BAR_W, BAR_H, 1, 1, "F");
        fill(doc, ...dotClr as [number, number, number]);
        doc.roundedRect(bx + 6, by + 1.5, OTHER_BAR_W * (pct / 100), BAR_H, 1, 1, "F");
        N(doc, 6); rgb(doc, 100, 100, 100);
        doc.text(`${pct}%`, bx + 6 + OTHER_BAR_W + 2, by + 4);
      }
      py += Math.ceil(otherTools.length / 2) * ROW_H + 8;

      hRule(doc, py, PAD, W - PAD, 0.2);
      py += 10;

      // ── CONTINUE — PROJECTS & CREATIVE WORK ─────────────────────────
      // Flow continues after tools; each block guards its own page break.

      // Section: Key Projects
      if (py + 12 > CONTENT_BOTTOM) { doc.addPage(); py = PAD + 4; }
      py = sectionLabel(doc, "Key Projects & Ventures", PAD, py, W - PAD);
      py += 1;

      const ventures = [
        {
          name: "ALiice — Medical CRM + ERP",
          tag: "Healthcare · SaaS · Next.js · Supabase · Gemini AI",
          desc: "Multi-tenant healthcare platform unifying patient management, clinical workflows, AI-assisted diagnostics, billing, inventory, and ERP. Row-level security enforces complete tenant data isolation. Gemini powers clinical note summarisation, lab result analysis, and automated billing code extraction.",
        },
        {
          name: "Code DXB 2026",
          tag: "Conference · Dubai · Enterprise AI & Workforce Transformation",
          desc: "Dubai's premier enterprise AI conference. 300+ attendees, 48 speakers, 12 workshops. Full event platform built with Next.js, Supabase, Stripe ticketing, QR check-in, AI attendee networking matching, live Q&A, and post-event content hub.",
        },
        {
          name: "Bold and Beyond — Wellness Ecosystem",
          tag: "Hardware · SaaS · BLE Wearable · React Native · Gemini AI",
          desc: "Vertically integrated wellness platform: smart wearable + AI coaching + marketplace. BLE device streams HRV, SpO2, skin temperature, and movement. LSTM readiness model generates a 0–100 daily score. Gemini AI coach delivers personalised daily interventions grounded in 7-day biometric context.",
        },
      ];

      for (const v of ventures) {
        const est = 5 + 4 + 16 + 6;
        if (py + est > CONTENT_BOTTOM) { doc.addPage(); py = PAD + 4; }
        B(doc, 9.5); rgb(doc, 15, 15, 15); doc.text(v.name, PAD, py); py += 5;
        I(doc, 7.5); rgb(doc, 110, 110, 110); doc.text(v.tag, PAD, py); py += 5;
        N(doc, 8); rgb(doc, 55, 55, 55);
        py = wrapText(doc, v.desc, PAD, py, W - PAD * 2, LINE_MD);
        py += 7;
        hRule(doc, py - 4, PAD, W - PAD, 0.15);
      }

      // Section: Featured AI Projects — ensure header + at least one entry fit together
      py += 4;
      if (py + 30 > CONTENT_BOTTOM) { doc.addPage(); py = PAD + 4; }
      py = sectionLabel(doc, "Featured AI Projects", PAD, py, W - PAD);
      py += 1;

      const aiProjects = [
        {
          name: "Autonomous Vehicle AI",
          tag: "Computer Vision · Simulation · Python · TensorFlow",
          desc: "End-to-end autonomous driving pipeline with real-time object detection, lane following, and obstacle avoidance. Deployed on edge hardware with a live simulation dashboard.",
        },
        {
          name: "AI Virtual Assistant",
          tag: "Conversational AI · Gemini API · Next.js · WebSocket",
          desc: "Context-aware AI assistant with intent recognition, entity extraction, and persistent memory. Built for enterprise customer service deployments with real-time streaming responses.",
        },
        {
          name: "Predictive Maintenance AI",
          tag: "Time Series · LSTM · Python · Industrial IoT",
          desc: "Anomaly detection system for industrial equipment. LSTM model trained on sensor telemetry predicts failure 72 hours in advance with 94% recall, reducing unplanned downtime.",
        },
      ];

      const aiExamples = [
        {
          name: "Sentiment Analysis Engine",
          tag: "NLP · TextBlob · SpaCy · Gemini API",
          desc: "Classifies social media posts (Twitter/Reddit) as positive, negative, or neutral. Used for brand perception monitoring and public opinion tracking at scale.",
        },
        {
          name: "Customer Support Chatbot",
          tag: "Rasa / Dialogflow · Next.js · Gemini API · WebSocket",
          desc: "AI conversation layer for customer service with intent recognition, entity extraction, and contextual response generation. Handles escalation routing to human agents.",
        },
        {
          name: "Image Classification System",
          tag: "Computer Vision · TensorFlow · Keras · ResNet / VGG",
          desc: "Transfer learning pipeline for medical, animal, and plant image classification. Fine-tuned ResNet achieving 96% top-5 accuracy on custom datasets.",
        },
      ];

      for (const p of [...aiProjects, ...aiExamples]) {
        const est = 5 + 4 + 12 + 6;
        if (py + est > CONTENT_BOTTOM) { doc.addPage(); py = PAD + 4; }
        B(doc, 8.5); rgb(doc, 15, 15, 15); doc.text(p.name, PAD, py); py += 4.5;
        I(doc, 7); rgb(doc, 110, 110, 110); doc.text(p.tag, PAD, py); py += 4.5;
        N(doc, 7.8); rgb(doc, 55, 55, 55);
        py = wrapText(doc, p.desc, PAD, py, W - PAD * 2, LINE_SM);
        py += 5;
        hRule(doc, py - 3, PAD, W - PAD, 0.12);
      }

      // Section: Brand Marketing & Creative Direction
      py += 3;
      if (py + 10 > CONTENT_BOTTOM) { doc.addPage(); py = PAD + 4; }
      py = sectionLabel(doc, "Brand Marketing & Creative Direction", PAD, py, W - PAD);
      py += 1;

      const brandWork = [
        {
          brand: "Lipton — Ramadan: #AMinuteOfGoodness",
          role: "Creative Director & Concept Architect",
          aim: "Humanise the Lipton brand during Ramadan by anchoring it in shared goodness rather than consumption. Designed for emotional resonance with MENA audiences during the most culturally significant period of the year.",
          result: "Measurable brand sentiment uplift across GCC markets. The hashtag became a community-driven extension with organic amplification beyond paid media.",
        },
        {
          brand: "McDonald's — McArabia: True To Tradition",
          role: "Director & Concept Developer",
          aim: "Position the McArabia as a proud cultural statement rather than a localisation compromise — celebrating the product as authentically regional.",
          result: "Significant increase in McArabia order intent among 18–35 demographics. The spot elevated the product from menu item to cultural touchstone.",
        },
        {
          brand: "Total — Quartz TV Spot",
          role: "Director & Brand Strategist",
          aim: "Reframe Total Quartz engine oil from a functional commodity to a performance brand — speaking to driver pride rather than technical specifications.",
          result: "Strong recall scores in post-campaign testing. The cinematic treatment became a benchmark for subsequent Total Quartz creative in the region.",
        },
      ];

      for (const b of brandWork) {
        const est = 5 + 4 + 20 + 8;
        if (py + est > CONTENT_BOTTOM) { doc.addPage(); py = PAD + 4; }
        B(doc, 9); rgb(doc, 15, 15, 15); doc.text(b.brand, PAD, py); py += 4.5;
        I(doc, 7.5); rgb(doc, 100, 100, 100); doc.text(`Role: ${b.role}`, PAD, py); py += 5;
        B(doc, 7.5); rgb(doc, 60, 60, 60); doc.text("Aim:", PAD, py);
        N(doc, 7.5); rgb(doc, 65, 65, 65);
        py = wrapText(doc, b.aim, PAD + 10, py, W - PAD * 2 - 10, LINE_SM);
        py += 2;
        B(doc, 7.5); rgb(doc, 60, 60, 60); doc.text("Result:", PAD, py);
        N(doc, 7.5); rgb(doc, 65, 65, 65);
        py = wrapText(doc, b.result, PAD + 14, py, W - PAD * 2 - 14, LINE_SM);
        py += 6;
        hRule(doc, py - 3, PAD, W - PAD, 0.15);
      }

      // Creative Pursuits + S-TASH only appear in the left column of page 2 (above).
      // Skip re-rendering them here to avoid duplication.

      // ── RENDER FOOTERS ───────────────────────────────────────────────
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        renderFooter(doc, i, totalPages);
      }

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
