"use client";
import { useEffect, useRef, useState } from "react";

// ─── PREMIUM FUTURISTIC AMBIENT ENGINE ───────────────────────────────────────
// Layers: drone bass | chord pads | shimmer highs | glitch texture | digital pulse

function buildAmbient(ac: AudioContext): () => void {
  const master = ac.createGain();
  master.gain.setValueAtTime(0, ac.currentTime);
  master.gain.linearRampToValueAtTime(0.06, ac.currentTime + 4); // slow soothing fade-in, very low volume
  master.connect(ac.destination);

  // ── REVERB (large hall — space-tech atmosphere) ────────────────────────────
  const convolver = ac.createConvolver();
  const revLen = ac.sampleRate * 5;
  const revBuf = ac.createBuffer(2, revLen, ac.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = revBuf.getChannelData(c);
    for (let i = 0; i < revLen; i++)
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / revLen, 1.8);
  }
  convolver.buffer = revBuf;
  const revGain = ac.createGain();
  revGain.gain.value = 0.55;
  convolver.connect(revGain);
  revGain.connect(master);

  // ── DELAY (stereo slapback for depth) ─────────────────────────────────────
  const delay = ac.createDelay(2);
  delay.delayTime.value = 0.42;
  const delayFb = ac.createGain();
  delayFb.gain.value = 0.28;
  const delayGain = ac.createGain();
  delayGain.gain.value = 0.18;
  delay.connect(delayFb);
  delayFb.connect(delay);
  delay.connect(delayGain);
  delayGain.connect(master);

  const oscs: (OscillatorNode | AudioBufferSourceNode)[] = [];

  // ── LAYER 1: SUB-BASS DRONE (C2 — deep, grounded, calming) ────────────────
  const subFreqs = [65.41, 98.00]; // C2, G2
  subFreqs.forEach((f, i) => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    const lfo = ac.createOscillator();
    const lg = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    osc.detune.value = i * 3;
    lfo.frequency.value = 0.03 + i * 0.01;
    lg.gain.value = 2;
    lfo.connect(lg); lg.connect(g.gain);
    g.gain.value = 0.09;
    osc.connect(g); g.connect(master);
    lfo.start(); osc.start();
    oscs.push(osc, lfo);
  });

  // ── LAYER 2: SOOTHING CHORD PADS (Cmaj9 progression) ───────────────────────
  // Cmaj9: C3 E3 G3 B3 D4 — warm, relaxing vibe
  const padChord = [
    { f: 130.81, t: "sine"     as OscillatorType, g: 0.05, det:  0 }, // C3
    { f: 164.81, t: "triangle" as OscillatorType, g: 0.04, det:  3 }, // E3
    { f: 196.00, t: "sine"     as OscillatorType, g: 0.04, det: -3 }, // G3
    { f: 246.94, t: "sine"     as OscillatorType, g: 0.03, det:  5 }, // B3
    { f: 293.66, t: "triangle" as OscillatorType, g: 0.02, det: -5 }, // D4
  ];

  padChord.forEach(({ f, t, g, det }, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const pan = ac.createStereoPanner();
    const lfo = ac.createOscillator();
    const lg = ac.createGain();

    osc.type = t;
    osc.frequency.value = f;
    osc.detune.value = det;

    // Slow pitch shimmer
    lfo.frequency.value = 0.04 + i * 0.013;
    lg.gain.value = 1.5;
    lfo.connect(lg); lg.connect(gain.gain);

    // Stereo width
    pan.pan.value = (i % 2 === 0 ? 1 : -1) * (0.2 + i * 0.1);

    gain.gain.value = g;
    osc.connect(gain);
    gain.connect(pan);
    pan.connect(master);
    pan.connect(convolver);
    pan.connect(delay);

    lfo.start(); osc.start();
    oscs.push(osc, lfo);
  });

  // ── LAYER 3: HIGH SHIMMER (harmonics — AI/space shimmer) ──────────────────
  const shimmerFreqs = [587.33, 659.25, 783.99]; // D5, E5, G5
  shimmerFreqs.forEach((f, i) => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    const pan = ac.createStereoPanner();
    const ampLfo = ac.createOscillator();
    const ampLg = ac.createGain();

    osc.type = "sine";
    osc.frequency.value = f;
    osc.detune.value = (Math.random() - 0.5) * 6;

    // Amplitude shimmer — creates twinkling
    ampLfo.frequency.value = 0.18 + i * 0.07;
    ampLg.gain.value = 0.015;
    ampLfo.connect(ampLg); ampLg.connect(g.gain);
    g.gain.value = 0.018;

    pan.pan.value = (i - 1) * 0.6;
    osc.connect(g); g.connect(pan);
    pan.connect(convolver); pan.connect(master);

    ampLfo.start(); osc.start();
    oscs.push(osc, ampLfo);
  });

  // ── LAYER 4: ATMOSPHERIC NOISE TEXTURE (filtered white noise) ─────────────
  const noiseLen = ac.sampleRate * 3;
  const noiseBuf = ac.createBuffer(2, noiseLen, ac.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = noiseBuf.getChannelData(c);
    for (let i = 0; i < noiseLen; i++) d[i] = Math.random() * 2 - 1;
  }
  const noiseNode = ac.createBufferSource();
  noiseNode.buffer = noiseBuf;
  noiseNode.loop = true;

  // Bandpass filter around 800Hz — airy, not hissy
  const noiseFilter = ac.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 600; // warmer, lower hiss
  noiseFilter.Q.value = 0.5;
  const noiseGain = ac.createGain();
  noiseGain.gain.value = 0.006; // extremely subtle texture

  noiseNode.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(convolver);

  noiseNode.start();
  oscs.push(noiseNode);

  // ── LAYER 5: REMOVED (No digital pulse, keep it purely soothing) ──────────

  // ── LAYER 6: CHORD MODULATION (slow morph every 12s) ─────────────────────
  // Subtly drift pitch of pads to feel alive — not static
  // (handled by the per-oscillator LFOs above)

  return () => {
    master.gain.setTargetAtTime(0, ac.currentTime, 1.2);
    setTimeout(() => {
      oscs.forEach(o => { try { o.stop(); } catch {} });
      try { ac.close(); } catch {}
    }, 4000);
  };
}

// ─── HOVER SOUND UTILITY ─────────────────────────────────────────────────────
let _globalAc: AudioContext | null = null;
export function playHoverTick() {
  try {
    if (!_globalAc || _globalAc.state === "closed") return;
    const ac = _globalAc;
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
export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  // Attempt autoplay silently on mount
  useEffect(() => {
    const tryAuto = async () => {
      try {
        const ac = new AudioContext();
        _globalAc = ac;
        if (ac.state === "suspended") await ac.resume();
        ctxRef.current = ac;
        stopRef.current = buildAmbient(ac);
        setPlaying(true);
      } catch { /* browser blocked — user will click */ }
    };
    tryAuto();
    return () => { stopRef.current?.(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = async () => {
    if (playing) {
      stopRef.current?.();
      stopRef.current = null;
      ctxRef.current = null;
      _globalAc = null;
      setPlaying(false);
    } else {
      try {
        const ac = new AudioContext();
        _globalAc = ac;
        await ac.resume();
        ctxRef.current = ac;
        stopRef.current = buildAmbient(ac);
        setPlaying(true);
      } catch {}
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
