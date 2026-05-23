"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const toolkit = [
  {
    cat: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    cat: "Backend",
    items: ["Python", "FastAPI", "Node.js", "REST APIs", "GraphQL"],
  },
  {
    cat: "AI / ML",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "HuggingFace", "OpenCV", "NLP"],
  },
  {
    cat: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Firebase"],
  },
  {
    cat: "DevOps & Tools",
    items: ["Git", "Docker", "Linux", "Vercel", "Railway", "CI/CD"],
  },
  {
    cat: "Certified",
    items: ["Cisco Networking", "Cybersecurity Essentials", "Python Programming"],
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="sect">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
        >
          <div>
            <span className="label">The Toolkit</span>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-0.025em", color: "var(--text)",
              marginTop: "1rem"
            }}>
              Tech I work with.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {toolkit.map(({ cat, items }, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="card"
              >
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: "var(--accent)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>
                  {cat}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.65rem" }}>—</span>
                      <span style={{ fontSize: "0.92rem", color: "var(--text-2)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
