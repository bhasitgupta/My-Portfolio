"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="sect">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
        >
          <span className="label">The Architect</span>

          {/* Main content — text + photo-2 */}
          <div style={{ display: "flex", gap: "4rem", alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* Text */}
            <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800, lineHeight: 1.05,
                letterSpacing: "-0.025em", color: "var(--text)"
              }}>
                I build clean,{" "}
                <span className="accent-text">intelligent</span>{" "}
                systems.
              </h2>

              <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "var(--text-2)" }}>
                I&apos;m <strong style={{ color: "var(--text)", fontWeight: 600 }}>Bhasit Gupta</strong>, an AI/ML Developer and Full Stack Engineer from India. I enjoy turning complex problems into simple, reliable solutions — leveraging AI as a catalyst, not a crutch.
              </p>

              <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "var(--text-2)" }}>
                I hold <strong style={{ color: "var(--text)", fontWeight: 600 }}>Cisco Certifications</strong> in Networking and Cybersecurity. My background spans full-stack web development, machine learning pipelines, and open-source contribution.
              </p>

              <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "var(--text-2)" }}>
                Every system I build is designed to feel distinct, fast, and purposeful. Beyond code, I believe in digital craftsmanship — every interaction I create is intentional.
              </p>

              {/* Stats */}
              <div style={{ display: "flex", gap: "2.5rem", paddingTop: "0.5rem", flexWrap: "wrap" }}>
                {[
                  { n: "10+", l: "Projects Shipped" },
                  { n: "5+", l: "Certifications" },
                  { n: "3+", l: "Years Coding" },
                ].map(({ n, l }) => (
                  <div key={l}>
                    <div className="accent-text" style={{ fontFamily: "'Outfit',sans-serif", fontSize: "2.2rem", fontWeight: 900, lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-3)", marginTop: "0.3rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo 2 — blazer turtleneck */}
            <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
              <div style={{
                position: "relative", width: 240, height: 310,
                borderRadius: 18, overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.2)"
              }}>
                <Image src="/photo-2.png" alt="Bhasit Gupta" fill className="object-cover object-top" sizes="240px" />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to bottom, transparent, var(--bg))" }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
