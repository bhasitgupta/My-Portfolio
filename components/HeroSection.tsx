"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const roles = ["AI/ML Developer", "Full Stack Engineer", "Open Source Contributor", "Problem Solver"];

function TypeWriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = roles[idx];
    const t = setTimeout(() => {
      if (!del && text.length < word.length) setText(word.slice(0, text.length + 1));
      else if (!del) setTimeout(() => setDel(true), 1800);
      else if (text.length > 0) setText(text.slice(0, -1));
      else { setDel(false); setIdx((i) => (i + 1) % roles.length); }
    }, del ? 35 : 75);
    return () => clearTimeout(t);
  }, [text, del, idx]);

  return (
    <span style={{ color: "var(--accent)" }}>
      {text}
      <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
    </span>
  );
}

export function HeroSection() {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "7rem", paddingBottom: "4rem" }}>
      <div className="wrap w-full">

        {/* HERO — two column */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4rem", flexWrap: "wrap" }}>

          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "1.8rem" }}
          >
            {/* Status badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
              <span className="label" style={{ margin: 0 }}>Available for work</span>
            </div>

            {/* Name */}
            <div>
              <h1 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(3.5rem, 9vw, 6.5rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "var(--text)"
              }}>
                BHASIT<br />
                <span className="accent-text">GUPTA</span>
              </h1>
            </div>

            {/* Role typing */}
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.05rem", color: "var(--text-2)", minHeight: "1.6rem" }}>
              <TypeWriter />
            </p>

            {/* Quote */}
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--text-2)", maxWidth: "44ch" }}>
              I don&apos;t wait for the future — I build it. Every line of code is a step toward a world where intelligence has no ceiling.
            </p>

            {/* Tech pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {["Python", "React", "Next.js", "FastAPI", "TensorFlow", "TypeScript", "PyTorch"].map((t) => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button className="btn btn-filled" onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}>
                View Work
              </button>
              <button className="btn btn-ghost" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
                Contact Me
              </button>
            </div>
          </motion.div>

          {/* RIGHT PHOTO — photo-1: turtleneck arms crossed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: "0 0 auto" }}
          >
            <div style={{
              position: "relative",
              width: 300,
              height: 390,
              borderRadius: 22,
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.25)"
            }}>
              <Image
                src="/photo-1.png"
                alt="Bhasit Gupta"
                fill
                className="object-cover object-top"
                priority
                sizes="300px"
              />
              {/* Bottom fade so photo blends into bg */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
                background: "linear-gradient(to bottom, transparent, var(--bg))"
              }} />
            </div>
          </motion.div>

        </div>

        {/* Scroll cue */}
        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="scroll-cue-anim"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", fontSize: "1.4rem" }}
            aria-label="Scroll down"
          >
            ↓
          </button>
        </div>
      </div>
    </section>
  );
}
