"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

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
        { scale: 0.8, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
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

      <div style={{ zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
        
        {/* Center Sleek Progress Ring */}
        <div ref={coreRef} style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "320px", height: "320px" }}>
          
          <svg width="320" height="320" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
            <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle 
              cx="160" cy="160" r="150" fill="none" 
              stroke="url(#progressGrad)" 
              strokeWidth="2" 
              strokeDasharray={2 * Math.PI * 150}
              strokeDashoffset={(2 * Math.PI * 150) - (progress / 100) * (2 * Math.PI * 150)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c6af7" />
                <stop offset="100%" stopColor="#4fc9fa" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Glowing Center Percentage */}
          <div
            ref={percentRef}
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "5rem",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "#fff",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            {progress}
            <span style={{ fontSize: "1.5rem", fontWeight: 400, color: "rgba(255,255,255,0.4)", marginLeft: "4px" }}>%</span>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
