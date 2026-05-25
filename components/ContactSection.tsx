"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const LINKS = [
  {
    num: "01",
    label: "LinkedIn",
    sub: "linkedin.com/in/bhasitgupta",
    href: "https://www.linkedin.com/in/bhasitgupta",
    icon: "in",
  },
  {
    num: "02",
    label: "GitHub",
    sub: "github.com/bhasitgupta",
    href: "https://github.com/bhasitgupta",
    icon: "gh",
  },
  {
    num: "03",
    label: "Twitter / X",
    sub: "@Bhasit1009",
    href: "https://twitter.com/Bhasit1009",
    icon: "𝕏",
  },
  {
    num: "04",
    label: "Discord",
    sub: "bhasitgupta",
    href: "https://discord.com/users/bhasitgupta",
    icon: "dc",
  },
  {
    num: "05",
    label: "Gmail",
    sub: "bhasitgupta@gmail.com",
    href: "mailto:bhasitgupta@gmail.com",
    icon: "@",
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("bhasitgupta@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="sect">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
        >
          <div>
            <span className="label">Let&apos;s Work Together</span>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-0.025em", color: "var(--text)",
              marginTop: "1rem", maxWidth: "18ch"
            }}>
              Currently available for work &amp; collaborations.
            </h2>
            <p style={{ marginTop: "1rem", fontSize: "1.05rem", color: "var(--text-2)", maxWidth: "44ch", lineHeight: 1.8 }}>
              Open to freelance projects, full-time roles, and open-source collaborations. Let&apos;s build something that matters.
            </p>

            {/* Copy email quick action */}
            <button
              onClick={copyEmail}
              style={{
                marginTop: "1.5rem",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "1.1rem", fontWeight: 600,
                color: "var(--accent)", background: "none", border: "none",
                cursor: "pointer", letterSpacing: "0.02em", padding: 0,
                textDecoration: "underline", textUnderlineOffset: "4px",
              }}
            >
              {copied ? "Copied! ✓" : "bhasitgupta@gmail.com ↗"}
            </button>
          </div>

          {/* Links list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") || l.href.startsWith("tel") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                style={{
                  display: "flex", alignItems: "center", gap: "1.5rem",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none", color: "var(--text)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text)"; }}
              >
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: "var(--text-3)", letterSpacing: "0.15em", width: "2rem", flexShrink: 0 }}>
                  {l.num}
                </span>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: "1.1rem", flex: 1 }}>
                  {l.label}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.8rem", color: "var(--text-2)" }}>
                  {l.sub}
                </span>
                <span style={{ color: "var(--text-3)" }}>↗</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
