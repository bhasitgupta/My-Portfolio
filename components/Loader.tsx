"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const LOGS = [
  "INITIALIZING SYSTEM...",
  "LOADING NEURAL NETWORK...",
  "CONNECTING AI MODULES...",
  "RENDERING EXPERIENCE...",
  "STARTING PORTFOLIO OS"
];

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGSVGElement>(null);
  const ring2Ref = useRef<SVGSVGElement>(null);
  const ring3Ref = useRef<SVGSVGElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onComplete();
        },
      });

      // 0. Setup initial states (Pitch black)
      gsap.set(coreRef.current, { scale: 0, opacity: 0 });
      gsap.set([ring1Ref.current, ring2Ref.current, ring3Ref.current], { scale: 0.5, opacity: 0, rotation: 0 });
      gsap.set(logsRef.current, { opacity: 0, y: 10 });
      gsap.set(particlesRef.current, { opacity: 0 });

      // Continuous infinite rotations for holographic rings
      gsap.to(ring1Ref.current, { rotation: 360, duration: 10, repeat: -1, ease: "linear" });
      gsap.to(ring2Ref.current, { rotation: -360, duration: 15, repeat: -1, ease: "linear" });
      gsap.to(ring3Ref.current, { rotation: 360, duration: 20, repeat: -1, ease: "linear" });

      // PHASE 1: Tiny glowing AI core appears
      tl.to(coreRef.current, { scale: 0.2, opacity: 1, duration: 1.5, ease: "power2.inOut" })
        .to(coreRef.current, { scale: 0.25, duration: 0.8, yoyo: true, repeat: 1, ease: "sine.inOut" }) // Pulse

      // PHASE 2: Reactor expansion & Grid fade in
      tl.to(particlesRef.current, { opacity: 1, duration: 1 }, "-=0.5")
        .to(coreRef.current, { scale: 1, duration: 1.2, ease: "expo.out" }, "-=0.5")
        .to([ring1Ref.current, ring2Ref.current, ring3Ref.current], { scale: 1, opacity: 1, duration: 1.5, stagger: 0.1, ease: "back.out(1.5)" }, "-=1.0")
        .to(logsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");

      // Cycle logs
      const logInterval = setInterval(() => {
        setLogIndex(prev => (prev < LOGS.length - 1 ? prev + 1 : prev));
      }, 700);

      // Progress 0 -> 100 smoothly
      const progressObj = { value: 0 };
      tl.to(
        progressObj,
        {
          value: 100,
          duration: 3.5, 
          ease: "power2.inOut",
          onUpdate: () => {
            setProgress(Math.round(progressObj.value));
          },
        },
        "-=0.5"
      );

      // Clean up log interval at the end of progress
      tl.add(() => clearInterval(logInterval));

      // PHASE 3: 100% Transition (Massive cinematic glow pulse)
      tl.to({}, { duration: 0.3 }) // short pause
        .to(logsRef.current, { opacity: 0, duration: 0.2, y: -10 })
        .to([ring1Ref.current, ring2Ref.current, ring3Ref.current], { scale: 1.5, opacity: 0, duration: 0.8, stagger: 0.05, ease: "power3.in" }, "-=0.2")
        .to(percentRef.current, { scale: 1.2, opacity: 0, filter: "blur(10px)", duration: 0.6, ease: "power2.in" }, "-=0.6")
        .to(burstRef.current, { scale: 40, opacity: 1, duration: 1.2, ease: "power4.in" }, "-=0.4")
        .to(containerRef.current, { opacity: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.2");

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
        backgroundColor: "#020204", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {/* Dynamic Background Grid & Scanlines */}
      <div
        ref={particlesRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(124, 106, 247, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 106, 247, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "center center",
          zIndex: 0,
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 0%, #020204 80%)" }} />
      </div>

      {/* Glow Burst Element */}
      <div
        ref={burstRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "150px",
          height: "150px",
          transform: "translate(-50%, -50%) scale(0)",
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(124,106,247,0.9) 30%, rgba(79,201,250,0.5) 60%, rgba(2,2,4,0) 100%)",
          borderRadius: "50%",
          opacity: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <div style={{ zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", position: "relative" }}>
        
        {/* Holographic AI Reactor */}
        <div ref={coreRef} style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "350px", height: "350px" }}>
          
          {/* Outer Ring */}
          <svg ref={ring1Ref} width="350" height="350" style={{ position: "absolute", inset: 0 }}>
            <circle cx="175" cy="175" r="160" fill="none" stroke="rgba(124,106,247,0.15)" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="175" cy="175" r="160" fill="none" stroke="rgba(79,201,250,0.5)" strokeWidth="2" strokeDasharray="50 800" strokeLinecap="round" />
          </svg>

          {/* Middle Ring */}
          <svg ref={ring2Ref} width="280" height="280" style={{ position: "absolute", inset: "35px" }}>
            <circle cx="140" cy="140" r="130" fill="none" stroke="rgba(79,201,250,0.1)" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx="140" cy="140" r="130" fill="none" stroke="#7c6af7" strokeWidth="2" strokeDasharray="100 600" strokeLinecap="round" />
          </svg>

          {/* Inner Ring (Progress) */}
          <svg ref={ring3Ref} width="220" height="220" style={{ position: "absolute", inset: "65px", transform: "rotate(-90deg)" }}>
            <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            <circle 
              cx="110" cy="110" r="100" fill="none" 
              stroke="url(#aiGrad)" 
              strokeWidth="2" 
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={(2 * Math.PI * 100) - (progress / 100) * (2 * Math.PI * 100)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
            <defs>
              <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c6af7" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#4fc9fa" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Glowing Center Percentage */}
          <div
            ref={percentRef}
            style={{
              fontSize: "4.5rem",
              fontWeight: 200,
              letterSpacing: "-0.05em",
              color: "#fff",
              display: "flex",
              alignItems: "baseline",
              textShadow: "0 0 20px rgba(124,106,247,0.5)",
              position: "relative",
            }}
          >
            {progress}
            <span style={{ fontSize: "1.2rem", fontWeight: 400, color: "rgba(255,255,255,0.3)", marginLeft: "4px" }}>%</span>
          </div>
        </div>

        {/* Terminal Logs */}
        <div 
          ref={logsRef}
          style={{ 
            position: "absolute", 
            bottom: "15%", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, rgba(124,106,247,0.5))", marginBottom: "1rem" }} />
          <p 
            key={logIndex} 
            style={{ 
              fontFamily: "JetBrains Mono, monospace", 
              fontSize: "0.7rem", 
              color: "rgba(79,201,250,0.8)", 
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              animation: "glitchIn 0.3s ease-out forwards",
            }}
          >
            {LOGS[logIndex]}
          </p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes glitchIn {
          0% { opacity: 0; transform: scale(0.95) translateY(5px); filter: blur(4px); }
          50% { opacity: 1; transform: scale(1.02) translateY(-2px); filter: blur(0px); text-shadow: 2px 0 0 rgba(255,0,0,0.5), -2px 0 0 rgba(0,255,255,0.5); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); text-shadow: none; }
        }
      `}} />
    </div>
  );
}
