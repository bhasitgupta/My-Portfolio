"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  const phases = [
    "INITIALIZING SYSTEM...",
    "LOADING NEURAL NETWORKS...",
    "CALIBRATING HOLOGRAPHICS...",
    "ENGAGING WARP DRIVE...",
    "SYSTEM READY",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 4 + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 50);

    const phaseInterval = setInterval(() => {
      setPhase((p) => Math.min(p + 1, phases.length - 1));
    }, 700);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Scanlines */}
          <div className="absolute inset-0 scanlines opacity-30" />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Hologram circle */}
            <div className="relative w-32 h-32">
              <div
                className="absolute inset-0 rounded-full border border-cyan-400 opacity-30"
                style={{ animation: "spin-slow 8s linear infinite" }}
              />
              <div
                className="absolute inset-2 rounded-full border border-purple-500 opacity-50"
                style={{ animation: "spin-reverse 6s linear infinite" }}
              />
              <div
                className="absolute inset-4 rounded-full border border-cyan-400 opacity-70"
                style={{ animation: "spin-slow 4s linear infinite" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-cyan-400 pulse-glow" />
              </div>
              {/* Orbiting dots */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: "-4px",
                    marginLeft: "-4px",
                    transform: `rotate(${i * 120}deg) translateX(60px)`,
                    animation: `spin-slow ${3 + i}s linear infinite`,
                    boxShadow: "0 0 8px #00f5ff",
                  }}
                />
              ))}
            </div>

            {/* Name */}
            <div className="text-center">
              <h1
                className="font-display text-3xl md:text-5xl font-bold gradient-text-2 tracking-widest mb-2"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                BHASIT GUPTA
              </h1>
              <p className="text-cyan-400 text-sm tracking-[0.3em] font-mono">
                AI/ML DEVELOPER • FULL STACK ENGINEER
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-80">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-cyan-400 font-mono tracking-widest">
                  {phases[phase]}
                </span>
                <span className="text-xs text-cyan-400 font-mono">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-px bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                  style={{ width: `${progress}%`, boxShadow: "0 0 10px #00f5ff" }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-cyan-400 opacity-60" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t border-r border-cyan-400 opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-cyan-400 opacity-60" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-cyan-400 opacity-60" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
