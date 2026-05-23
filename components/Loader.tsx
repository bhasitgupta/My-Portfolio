"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const LOGS = [
  "INITIALIZING SYSTEM",
  "CONNECTING INTERFACE",
  "RENDERING EXPERIENCE",
  "STARTING PORTFOLIO OS"
];

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringOuterRef = useRef<SVGSVGElement>(null);
  const ringInnerRef = useRef<SVGSVGElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onComplete();
        },
      });

      // --- 1. INITIAL SETUP ---
      gsap.set(coreRef.current, { scale: 0.9, opacity: 0 });
      gsap.set(bgRef.current, { opacity: 0 });
      gsap.set(logsRef.current, { opacity: 0, y: 5 });

      // Ambient rotations
      gsap.to(ringOuterRef.current, { rotation: 360, duration: 25, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
      gsap.to(ringInnerRef.current, { rotation: -360, duration: 35, repeat: -1, ease: "none", transformOrigin: "50% 50%" });

      // Fade in background and core
      tl.to(bgRef.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, 0)
        .to(coreRef.current, { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 0.5)
        .to(logsRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, 1);

      // --- 2. TEXT CYCLING ---
      const logInterval = setInterval(() => {
        gsap.to(logsRef.current, {
          opacity: 0,
          y: -5,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setLogIndex(prev => (prev + 1) % LOGS.length);
            gsap.fromTo(logsRef.current, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
          }
        });
      }, 1200);

      // --- 3. PROGRESS ANIMATION (Realistic Simulation) ---
      const progressObj = { value: 0 };
      
      tl.to(progressObj, {
        value: 25, duration: 1.2, ease: "power2.inOut",
        onUpdate: () => setProgress(Math.floor(progressObj.value))
      }, 1)
      .to(progressObj, { value: 25, duration: 0.3 }) // Slight pause
      .to(progressObj, {
        value: 60, duration: 1.5, ease: "power1.inOut",
        onUpdate: () => setProgress(Math.floor(progressObj.value))
      })
      .to(progressObj, { value: 60, duration: 0.4 }) // Pause
      .to(progressObj, {
        value: 85, duration: 1.2, ease: "power2.inOut",
        onUpdate: () => setProgress(Math.floor(progressObj.value))
      })
      .to(progressObj, { value: 85, duration: 0.2 }) // Pause
      .to(progressObj, {
        value: 100, duration: 0.9, ease: "power3.inOut",
        onUpdate: () => setProgress(Math.floor(progressObj.value))
      });

      // Clean up log interval once we hit 100%
      tl.add(() => clearInterval(logInterval));

      // --- 4. FINAL REVEAL (Ultra-smooth Cinematic Dissolve) ---
      tl.to(logsRef.current, { opacity: 0, y: -5, duration: 0.5, ease: "power2.inOut" }, "+=0.2")
        .to(ringOuterRef.current, { rotation: "+=45", opacity: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.2")
        .to(ringInnerRef.current, { rotation: "-=45", opacity: 0, duration: 1.5, ease: "power2.inOut" }, "-=1.5")
        .to(percentRef.current, { scale: 1.05, opacity: 0, filter: "blur(4px)", duration: 1, ease: "power2.inOut" }, "-=1.2")
        .to(containerRef.current, { opacity: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.5");

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
        backgroundColor: "#000000", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {/* Extremely subtle minimal background */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at center, rgba(124, 106, 247, 0.03) 0%, transparent 60%)",
          zIndex: 0,
        }}
      >
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: "center center",
        }} />
      </div>

      <div style={{ zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        
        {/* Loader Core */}
        <div ref={coreRef} style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "300px", height: "300px" }}>
          
          {/* Subtle Outer Rotating Dashed Ring */}
          <svg ref={ringOuterRef} width="300" height="300" style={{ position: "absolute", inset: 0 }}>
            <circle cx="150" cy="150" r="148" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="2 12" />
          </svg>

          {/* Thin Elegant Progress Track */}
          <svg width="240" height="240" style={{ position: "absolute", inset: "30px", transform: "rotate(-90deg)" }}>
            {/* Background Track */}
            <circle cx="120" cy="120" r="118" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            
            {/* Smooth Interpolated Progress */}
            <circle 
              cx="120" cy="120" r="118" fill="none" 
              stroke="url(#premiumGrad)" 
              strokeWidth="1.5" 
              strokeDasharray={2 * Math.PI * 118}
              strokeDashoffset={(2 * Math.PI * 118) - (progress / 100) * (2 * Math.PI * 118)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
            />
            <defs>
              <linearGradient id="premiumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4fc9fa" />
                <stop offset="50%" stopColor="#7c6af7" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Minimal Inner Rotating Ring */}
          <svg ref={ringInnerRef} width="210" height="210" style={{ position: "absolute", inset: "45px" }}>
            <circle cx="105" cy="105" r="104" fill="none" stroke="rgba(124,106,247,0.15)" strokeWidth="0.5" strokeDasharray="100 200" />
            <circle cx="105" cy="105" r="104" fill="none" stroke="rgba(79,201,250,0.15)" strokeWidth="0.5" strokeDasharray="40 300" strokeDashoffset="150" />
          </svg>

          {/* Percentage Counter */}
          <div
            ref={percentRef}
            style={{
              fontSize: "4rem",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              display: "flex",
              alignItems: "baseline",
              position: "relative",
            }}
          >
            {progress}
            <span style={{ fontSize: "1.2rem", fontWeight: 400, color: "rgba(255,255,255,0.25)", marginLeft: "6px" }}>%</span>
          </div>
        </div>

        {/* Minimal System Text */}
        <div 
          style={{ 
            position: "absolute", 
            bottom: "-40px", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center"
          }}
        >
          <p 
            ref={logsRef}
            style={{ 
              fontFamily: "JetBrains Mono, monospace", 
              fontSize: "0.65rem", 
              color: "rgba(255,255,255,0.4)", 
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: 0
            }}
          >
            {LOGS[logIndex]}
          </p>
        </div>

      </div>
    </div>
  );
}
