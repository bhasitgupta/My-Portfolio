"use client";
import { useState, useEffect } from "react";
import { PortfolioFlow } from "@/components/PortfolioFlow";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Loader } from "@/components/Loader";

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "portfolio">("loading");
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {phase === "loading" && (
        <Loader onComplete={(audio) => {
          setShouldPlayAudio(audio);
          setPhase("portfolio");
        }} />
      )}
      
      <div style={{ 
        opacity: phase === "portfolio" ? 1 : 0, 
        transition: "opacity 1s ease", 
        pointerEvents: phase === "portfolio" ? "auto" : "none",
        height: "100%", width: "100%"
      }}>
        {phase !== "loading" && <PortfolioFlow />}
        {phase !== "loading" && <MusicPlayer autoPlay={shouldPlayAudio} />}
      </div>
    </>
  );
}
