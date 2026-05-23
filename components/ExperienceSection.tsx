"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Code, Star, BookOpen, Users, Trophy } from "lucide-react";

const timeline = [
  {
    year: "2026",
    title: "GSSoC 2026 — Selected Contributor",
    org: "Girl Script Summer of Code",
    type: "Open Source",
    icon: Code,
    color: "#00f5ff",
    desc: "Selected as a contributor for GSSoC 2026, one of India's largest open-source programs. Contributing to multiple repositories and collaborating with global developers.",
    tags: ["Open Source", "GitHub", "Collaboration"],
    highlight: true,
  },
  {
    year: "2025",
    title: "Cisco Certifications",
    org: "Cisco Networking Academy",
    type: "Certification",
    icon: Award,
    color: "#8b5cf6",
    desc: "Earned multiple Cisco certifications covering networking fundamentals, cybersecurity essentials, and Python programming fundamentals.",
    tags: ["Networking", "Cybersecurity", "Python"],
    highlight: false,
  },
  {
    year: "2025",
    title: "AI/ML Projects Portfolio",
    org: "Self-Directed Learning",
    type: "Achievement",
    icon: Star,
    color: "#ec4899",
    desc: "Built a comprehensive portfolio of AI/ML projects including NLP applications, computer vision systems, and generative AI tools using PyTorch and TensorFlow.",
    tags: ["AI", "ML", "PyTorch", "TensorFlow"],
    highlight: false,
  },
  {
    year: "2024",
    title: "Hackathon Wins",
    org: "Various Hackathons",
    type: "Competition",
    icon: Trophy,
    color: "#f59e0b",
    desc: "Participated in multiple hackathons, delivering MVPs in 24-48 hours. Achieved podium placements with innovative AI-powered solutions.",
    tags: ["Hackathon", "MVP", "Problem Solving"],
    highlight: false,
  },
  {
    year: "2024",
    title: "Full Stack Development Journey",
    org: "Self-Directed",
    type: "Learning",
    icon: BookOpen,
    color: "#10b981",
    desc: "Mastered the full MERN + Python stack. Built production-grade applications with authentication, databases, APIs, and deployment on Vercel and Railway.",
    tags: ["React", "Node.js", "Python", "FastAPI"],
    highlight: false,
  },
  {
    year: "2023",
    title: "Open Source Journey Begins",
    org: "GitHub",
    type: "Milestone",
    icon: Users,
    color: "#f43f5e",
    desc: "Made first open-source contributions, started building in public, and joined the developer community. First pull request merged!",
    tags: ["Git", "Collaboration", "Community"],
    highlight: false,
  },
];

const counters = [
  { value: "10+", label: "Projects Built", icon: Code, color: "#00f5ff" },
  { value: "5+", label: "Certifications", icon: Award, color: "#8b5cf6" },
  { value: "2026", label: "GSSoC Year", icon: Star, color: "#ec4899" },
  { value: "∞", label: "Lines of Code", icon: Trophy, color: "#f59e0b" },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#000000]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-[0.4em] mb-4 block">
            [ EXPERIENCE ]
          </span>
          <h2
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-white">THE</span>{" "}
            <span className="gradient-text-2">JOURNEY</span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
        </motion.div>

        {/* Counter row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {counters.map(({ value, label, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass-card p-6 text-center group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div
                className="text-3xl font-black mb-1"
                style={{ fontFamily: "Orbitron, sans-serif", color }}
              >
                {value}
              </div>
              <div className="text-xs text-white/40 tracking-wider">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 via-purple-500/50 to-transparent transform -translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
                  className={`relative flex md:items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`md:w-5/12 ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                    <div
                      className={`glass-card p-6 group spotlight ${item.highlight ? "border-cyan-400/30" : ""}`}
                    >
                      {item.highlight && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-cyan-400/20 text-cyan-400 font-mono">
                            ★ LATEST
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                        >
                          <Icon size={16} style={{ color: item.color }} />
                        </div>
                        <div>
                          <div className="text-xs font-mono" style={{ color: item.color }}>
                            {item.year} • {item.type}
                          </div>
                          <h3 className="text-white font-semibold text-sm leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-white/50 mb-1 font-medium">{item.org}</p>
                      <p className="text-sm text-white/60 leading-relaxed mb-3">{item.desc}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}20` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div
                      className="w-4 h-4 rounded-full border-2 z-10"
                      style={{
                        background: item.color,
                        borderColor: item.color,
                        boxShadow: `0 0 15px ${item.color}80`,
                      }}
                    />
                  </div>

                  {/* Year label */}
                  <div className={`hidden md:flex md:w-5/12 ${isLeft ? "md:pl-10" : "md:pr-10 md:justify-end"}`}>
                    <div
                      className="text-4xl font-black opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ fontFamily: "Orbitron, sans-serif", color: item.color }}
                    >
                      {item.year}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
