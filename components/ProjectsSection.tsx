"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    num: "01",
    title: "AI Content Generator",
    problem: "Manually creating SEO-optimized content at scale was time-consuming and inconsistent across different topics and tones.",
    solution: "Built a GPT-powered platform that generates structured, SEO-ready content with tone control. FastAPI backend + React frontend with real-time streaming.",
    tags: ["Python", "FastAPI", "React", "OpenAI", "PostgreSQL"],
    github: "https://github.com/bhasitgupta",
  },
  {
    num: "02",
    title: "Neural Style Transfer",
    problem: "Applying artistic styles to images in real-time required GPU-intensive computation that was inaccessible to most users.",
    solution: "Engineered a PyTorch CNN pipeline for real-time artistic style transfer with a clean web interface. GPU-accelerated processing with progressive rendering.",
    tags: ["PyTorch", "Python", "React", "CNN", "Computer Vision"],
    github: "https://github.com/bhasitgupta",
  },
  {
    num: "03",
    title: "Sentiment Analyzer",
    problem: "Real-time social media sentiment analysis lacked accuracy for regional languages and domain-specific contexts.",
    solution: "Built a BERT-based NLP pipeline achieving 94% accuracy on multilingual datasets. Live dashboard with trend visualization and alert system.",
    tags: ["BERT", "HuggingFace", "FastAPI", "React", "MongoDB"],
    github: "https://github.com/bhasitgupta",
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" ref={ref} className="sect">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
        >
          {/* Header with photo-3 */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <span className="label">Selected Work</span>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800, lineHeight: 1.05,
                letterSpacing: "-0.025em", color: "var(--text)",
                marginTop: "1rem"
              }}>
                Real-world engineering.<br />
                <span className="accent-text">Systems that scale.</span>
              </h2>
            </div>

            {/* Photo 3 — suit white shirt */}
            <div style={{
              position: "relative", width: 140, height: 175, flexShrink: 0,
              borderRadius: 14, overflow: "hidden",
              border: "1px solid var(--border)"
            }}>
              <Image src="/photo-3.png" alt="Bhasit Gupta" fill className="object-cover object-top" sizes="140px" />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to bottom, transparent, var(--bg))" }} />
            </div>
          </div>

          {/* Project list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                style={{
                  padding: "2.5rem 0",
                  borderBottom: "1px solid var(--border)",
                  display: "flex", flexDirection: "column", gap: "1.25rem",
                }}
              >
                {/* Number + title */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.2em" }}>
                    {p.num}
                  </span>
                  <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
                    {p.title}
                  </h3>
                </div>

                {/* Problem / Solution */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="md:grid-cols-2">
                  <div>
                    <p style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                      The Problem
                    </p>
                    <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--text-2)" }}>{p.problem}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                      The Solution
                    </p>
                    <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--text-2)" }}>{p.solution}</p>
                  </div>
                </div>

                {/* Tags + link */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {p.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                  </div>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.78rem", color: "var(--accent)", textDecoration: "none", letterSpacing: "0.05em" }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    View on GitHub ↗
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All projects link */}
          <div style={{ textAlign: "center", paddingTop: "1rem" }}>
            <a href="https://github.com/bhasitgupta" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View All Projects on GitHub ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
