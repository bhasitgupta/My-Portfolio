"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const LOG_MESSAGES = [
  "INITIALIZING NEURAL ENGINE...",
  "BYPASSING SECURITY PROTOCOLS...",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING CORE MODULES...",
  "RENDERING HOLOGRAPHIC INTERFACE...",
  "CALIBRATING AI MODELS...",
  "SYNCHRONIZING DATABASES...",
  "BOOTING PORTFOLIO OS v2.4.1...",
];

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    // Terminal log simulator
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < LOG_MESSAGES.length) {
        setLogs((prev) => [...prev.slice(-4), LOG_MESSAGES[logIndex]]);
        logIndex++;
      }
    }, 400);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onComplete();
        },
      });

      // 1. Initial AI Core pulse & fade in
      tl.fromTo(
        coreRef.current,
        { scale: 0.5, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
      );

      // 2. Text fade in
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=1"
      );

      // 3. Progress 0 -> 100
      const progressObj = { value: 0 };
      tl.to(
        progressObj,
        {
          value: 100,
          duration: 3.5, // 3.5 seconds of cinematic loading
          ease: "expo.inOut",
          onUpdate: () => {
            setProgress(Math.round(progressObj.value));
          },
        },
        "-=0.5"
      );

      // 4. Glitch / System Online text
      tl.to({}, { duration: 0.2 }); // small pause at 100%

      // 5. Huge Cinematic Glow Burst & transition
      tl.to(burstRef.current, {
        scale: 50,
        opacity: 1,
        duration: 0.8,
        ease: "power4.in",
      });

      // 6. Fade entire loader out gracefully to reveal site
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => {
      clearInterval(logInterval);
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#030305", // Deep cyber black
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "JetBrains Mono, monospace",
      }}
    >
      {/* Dynamic Background Grid / Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(124, 106, 247, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 106, 247, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "center center",
          opacity: 0.3,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(3,3,5,0) 50%, rgba(3,3,5,1) 100%)",
          zIndex: 1,
        }}
      />

      {/* Glow Burst Element (Initially hidden, expands at the end) */}
      <div
        ref={burstRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100px",
          height: "100px",
          transform: "translate(-50%, -50%) scale(0)",
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(124,106,247,0.8) 40%, rgba(3,3,5,0) 80%)",
          borderRadius: "50%",
          opacity: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <div style={{ zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0 2rem" }}>
        
        {/* Terminal Logs (Top Left) */}
        <div style={{ position: "absolute", top: "2rem", left: "2rem", maxWidth: "400px", zIndex: 3 }}>
          {logs.map((log, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.65rem",
                color: i === logs.length - 1 ? "#4fc9fa" : "rgba(79, 201, 250, 0.4)",
                letterSpacing: "0.15em",
                marginBottom: "0.5rem",
                textShadow: i === logs.length - 1 ? "0 0 8px rgba(79, 201, 250, 0.6)" : "none",
                animation: "fadeSlideIn 0.3s ease-out forwards",
              }}
            >
              {`> ${log}`}
            </div>
          ))}
        </div>

        {/* Center Holographic AI Core */}
        <div ref={coreRef} style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "300px", height: "300px" }}>
          
          {/* Rotating Rings */}
          <div className="spin-slow" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(79, 201, 250, 0.15)", borderTopColor: "#4fc9fa", boxShadow: "0 0 20px rgba(79, 201, 250, 0.2)" }} />
          <div className="spin-reverse-fast" style={{ position: "absolute", inset: "20px", borderRadius: "50%", border: "2px dashed rgba(124, 106, 247, 0.3)", borderBottomColor: "#7c6af7" }} />
          <div className="spin-slow" style={{ position: "absolute", inset: "45px", borderRadius: "50%", border: "1px dotted rgba(255, 107, 107, 0.4)", borderLeftColor: "#ff6b6b" }} />
          
          {/* Glowing Center Percentage */}
          <div
            ref={percentRef}
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "4.5rem",
              fontWeight: 900,
              color: "#fff",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(79, 201, 250, 0.4)",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            {progress}
            <span style={{ fontSize: "1.5rem", color: "#4fc9fa", marginLeft: "2px" }}>%</span>
          </div>
        </div>

        {/* Bottom Status Text */}
        <div ref={textRef} style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "0.85rem", letterSpacing: "0.3em", color: "#e8e0ff", textTransform: "uppercase" }}>
            {progress === 100 ? (
              <span style={{ color: "#4fc9fa", textShadow: "0 0 10px #4fc9fa" }}>AI SYSTEM ONLINE</span>
            ) : (
              "BOOTING SEQUENCE"
            )}
          </div>
          
          {/* High-tech Progress Bar */}
          <div style={{ width: "240px", height: "2px", background: "rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${progress}%`,
                background: "linear-gradient(90deg, #7c6af7, #4fc9fa)",
                boxShadow: "0 0 10px rgba(79, 201, 250, 0.8)",
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spin-slow {
          animation: spin 12s linear infinite;
        }
        .spin-reverse-fast {
          animation: spin-reverse 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}} />
    </div>
  );
}
