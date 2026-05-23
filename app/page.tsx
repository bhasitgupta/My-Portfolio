"use client";
import { useState, useEffect } from "react";
import { PortfolioFlow } from "@/components/PortfolioFlow";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Loader } from "@/components/Loader";

function SoundGateway({ onChoice }: { onChoice: (play: boolean) => void }) {
  const [fading, setFading] = useState(false);

  const handleChoice = (play: boolean) => {
    setFading(true);
    setTimeout(() => {
      onChoice(play);
    }, 800);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99998,
      backgroundColor: "#000",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      color: "#fff", fontFamily: "Outfit, sans-serif",
      opacity: fading ? 0 : 1, transition: "opacity 0.8s ease"
    }}>
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.2em", marginBottom: "3rem", textAlign: "center" }}>
        EXPERIENCE WITH SOUND?
      </h2>
      <div style={{ display: "flex", gap: "2rem" }}>
        <button 
          onClick={() => handleChoice(true)}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", padding: "1rem 3rem", fontSize: "1rem", letterSpacing: "0.1em",
            cursor: "pointer", transition: "all 0.3s ease", borderRadius: "4px"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#fff"; }}
        >
          YES
        </button>
        <button 
          onClick={() => handleChoice(false)}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", padding: "1rem 3rem", fontSize: "1rem", letterSpacing: "0.1em",
            cursor: "pointer", transition: "all 0.3s ease", borderRadius: "4px"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
        >
          NO
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "gateway" | "portfolio">("loading");
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {phase === "loading" && <Loader onComplete={() => setPhase("gateway")} />}
      
      {phase === "gateway" && (
        <SoundGateway 
          onChoice={(play) => {
            setAutoPlayMusic(play);
            setPhase("portfolio");
          }} 
        />
      )}

      <div style={{ 
        opacity: phase === "portfolio" ? 1 : 0, 
        transition: "opacity 1s ease", 
        pointerEvents: phase === "portfolio" ? "auto" : "none",
        height: "100%", width: "100%"
      }}>
        {phase !== "loading" && <PortfolioFlow />}
        {phase !== "loading" && <MusicPlayer autoPlay={autoPlayMusic} />}
      </div>
    </>
  );
}
