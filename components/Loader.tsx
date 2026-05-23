"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const LOGS = [
  "SYSTEM BOOT: SEQUENCE START",
  "INITIALIZING INTERFACE...",
  "LOADING MODULES...",
  "CONNECTING NETWORK...",
  "RENDERING EXPERIENCE...",
  "SYSTEM READY"
];

export function Loader({ onComplete }: { onComplete: (audio: boolean) => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const choiceRef = useRef<boolean>(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const logsTextRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const techInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onComplete(choiceRef.current);
        },
      });
      tlRef.current = tl;

      // --- 1. INITIAL SETUP ---
      gsap.set(percentRef.current, { scale: 0.95, opacity: 0 });
      gsap.set(logsContainerRef.current, { opacity: 0, x: -10 });
      gsap.set(techInfoRef.current, { opacity: 0, x: 10 });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });

      // Fade in UI elements
      tl.to(percentRef.current, { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 0.2)
        .to(logsContainerRef.current, { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }, 0.5)
        .to(techInfoRef.current, { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }, 0.5);

      // --- 2. TEXT CYCLING ---
      const logInterval = setInterval(() => {
        gsap.to(logsTextRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            setLogIndex(prev => Math.min(prev + 1, LOGS.length - 1));
            gsap.fromTo(logsTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
          }
        });
      }, 900);

      // --- 3. PROGRESS ANIMATION (Continuous Simulation) ---
      const progressObj = { value: 0 };
      
      tl.to(progressObj, {
        value: 100, 
        duration: 3.5, 
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.floor(progressObj.value));
          gsap.set(progressBarRef.current, { scaleX: progressObj.value / 100 });
        }
      }, 0.5);

      // Clean up log interval
      tl.add(() => clearInterval(logInterval));

      // PAUSE FOR AUDIO PROMPT
      tl.add(() => {
        tl.pause();
        setShowPrompt(true);
      });

      // --- 4. FINAL REVEAL (Ultra-smooth Cinematic Dissolve) ---
      tl.to(logsContainerRef.current, { opacity: 0, x: -10, duration: 0.6, ease: "power2.inOut" }, "+=0.2")
        .to(techInfoRef.current, { opacity: 0, x: 10, duration: 0.6, ease: "power2.inOut" }, "-=0.6")
        .to(progressBarRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.4")
        .to(percentRef.current, { scale: 1.05, opacity: 0, filter: "blur(8px)", duration: 1.2, ease: "power2.inOut" }, "-=0.2")
        .to(containerRef.current, { opacity: 0, duration: 1.2, ease: "power2.inOut" }, "-=1.0");

    }, containerRef);

    return () => {
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
        backgroundColor: "#050505", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "Outfit, 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Cinematic Vignette & Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, transparent 0%, #000000 100%)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundPosition: "center center",
        zIndex: 0,
      }} />

      {/* Massive Outlined Percentage */}
      <div
        ref={percentRef}
        style={{
          fontSize: "clamp(10rem, 30vw, 25rem)",
          fontWeight: 200,
          color: "transparent",
          WebkitTextStroke: "2px rgba(255, 255, 255, 0.8)",
          lineHeight: 1,
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontVariantNumeric: "tabular-nums"
        }}
      >
        {progress}
      </div>

      {/* Bottom Left System Logs */}
      <div
        ref={logsContainerRef}
        style={{
          position: "absolute",
          bottom: "30px",
          left: "40px",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#ff5500", boxShadow: "0 0 8px #ff5500" }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", color: "#ffffff", fontWeight: 700, letterSpacing: "0.1em" }}>
            [ SYSTEM_LOG ]
          </span>
        </div>
        <p
          ref={logsTextRef}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.7rem",
            color: "rgba(255, 255, 255, 0.6)",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}
        >
          {LOGS[logIndex]}
        </p>
      </div>

      {/* Bottom Right Tech Info */}
      <div
        ref={techInfoRef}
        style={{
          position: "absolute",
          bottom: "30px",
          right: "40px",
          zIndex: 2,
          textAlign: "right",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.7rem",
          color: "rgba(255, 255, 255, 0.5)",
          lineHeight: 1.6,
          letterSpacing: "0.05em"
        }}
      >
        <div style={{ color: "#ffffff", fontWeight: 700 }}>ID: BHASIT_PF_V3</div>
        <div>BUILD: 2026.1.0</div>
      </div>

      {/* Bottom Orange Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          zIndex: 3
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#ff5500",
            boxShadow: "0 0 10px rgba(255, 85, 0, 0.5)",
          }}
        />
      </div>

      {/* INTERACTIVE AUDIO PROMPT */}
      {showPrompt && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(5, 5, 5, 0.95)",
          backdropFilter: "blur(10px)",
          fontFamily: "JetBrains Mono, monospace",
          color: "#fff",
        }}>
          <h2 style={{ color: "#ff5500", letterSpacing: "0.2em", marginBottom: "1rem", fontSize: "clamp(1rem, 2vw, 1.2rem)", fontWeight: 700, textAlign: "center" }}>
            SYSTEM ROOT DETECTED
          </h2>
          <h1 style={{ letterSpacing: "0.15em", marginBottom: "4rem", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 400, textAlign: "center" }}>
            INITIALIZE AUDIO EXPERIENCE?
          </h1>
          
          <div style={{ display: "flex", gap: "4rem" }}>
            <button 
              onClick={() => { onComplete(true); }}
              style={{ background: "transparent", border: "none", color: "#fff", fontFamily: "inherit", fontSize: "1.2rem", cursor: "pointer", letterSpacing: "0.2em", fontWeight: 700, outline: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#ff5500"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}
            >
              [ Y ] YES
            </button>
            <button 
              onClick={() => { onComplete(false); }}
              style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "inherit", fontSize: "1.2rem", cursor: "pointer", letterSpacing: "0.2em", fontWeight: 700, outline: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >
              [ N ] NO
            </button>
          </div>
          <p style={{ position: "absolute", bottom: "30%", fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}>
            CLICK Y OR N TO PROCEED
          </p>
        </div>
      )}

    </div>
  );
}
