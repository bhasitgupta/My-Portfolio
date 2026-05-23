"use client";
import { useState, useEffect } from "react";
import { PortfolioFlow } from "@/components/PortfolioFlow";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Loader } from "@/components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Scroll is locked by Loader internally; we just ensure it unlocks if unmounted unexpectedly
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <PortfolioFlow />
      <MusicPlayer />
    </>
  );
}
