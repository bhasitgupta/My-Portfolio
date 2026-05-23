"use client";
import { useEffect, useRef, useState } from "react";

// ─── HOVER SOUND UTILITY ─────────────────────────────────────────────────────
let _globalAc: AudioContext | null = null;
export function playHoverTick() {
  try {
    if (!_globalAc) {
      _globalAc = new AudioContext();
    }
    const ac = _globalAc;
    if (ac.state === "suspended") {
        ac.resume();
    }
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    g.gain.setValueAtTime(0, ac.currentTime);
    g.gain.linearRampToValueAtTime(0.025, ac.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.12);
    osc.connect(g); g.connect(ac.destination);
    osc.start(); osc.stop(ac.currentTime + 0.15);
  } catch {}
}

// ─── MUSIC PLAYER COMPONENT ──────────────────────────────────────────────────
export function MusicPlayer({ autoPlay }: { autoPlay?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/background.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    if (autoPlay) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [autoPlay]);

  const toggle = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      }
    }
  };

  return (
    <button
      onClick={toggle}
      className={`music-btn ${!playing ? "off" : ""}`}
      aria-label="Toggle ambient music"
      title={playing ? "Mute ambient" : "Play ambient"}
    >
      <div className="bars">
        <div className="bar a" />
        <div className="bar b" />
        <div className="bar c" />
        <div className="bar d" />
      </div>
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
        {playing ? "MUTE ♪" : "♪ PLAY"}
      </span>
    </button>
  );
}
