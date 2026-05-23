"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const terminalLines = [
  { type: "cmd", text: "$ whoami" },
  { type: "out", text: "bhasit_gupta // AI/ML Developer & Full Stack Engineer" },
  { type: "cmd", text: "$ cat skills.txt" },
  { type: "out", text: "Python | React | Next.js | FastAPI | PyTorch | TensorFlow" },
  { type: "cmd", text: "$ git log --oneline -5" },
  { type: "out", text: "a3f2e1b feat: neural style transfer v2" },
  { type: "out", text: "b12dc4e fix: fastapi auth middleware" },
  { type: "out", text: "c891ef0 feat: gsap scroll animations" },
  { type: "out", text: "d55a2f3 chore: update dependencies" },
  { type: "out", text: "e78bc90 feat: contact form API integration" },
  { type: "cmd", text: "$ echo $STATUS" },
  { type: "out", text: "AVAILABLE_FOR_OPPORTUNITIES=true" },
  { type: "cmd", text: "$ ls projects/" },
  { type: "out", text: "ai-content-gen/  neural-style/  devportal/  gssoc-tracker/" },
  { type: "cmd", text: "$ ./run_portfolio.sh" },
  { type: "out", text: "✓ Portfolio initialized. Welcome to my world." },
  { type: "cursor", text: "█" },
];

export function TerminalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [inView]);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#030308]" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-card overflow-hidden"
          style={{ borderColor: "rgba(0,245,255,0.1)" }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-white/30 font-mono">
              bhasit@portfolio:~$
            </span>
          </div>

          {/* Terminal content */}
          <div
            ref={containerRef}
            className="p-6 space-y-1 font-mono text-sm max-h-72 overflow-y-auto"
          >
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.3 }}
                className={
                  line.type === "cmd"
                    ? "text-cyan-400"
                    : line.type === "cursor"
                    ? "text-white animate-pulse"
                    : "text-white/50"
                }
              >
                {line.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
