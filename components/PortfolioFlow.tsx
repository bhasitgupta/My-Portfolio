"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import TrueFocus from "@/components/ui/TrueFocus";

// Dynamic imports — disable SSR for WebGL/canvas components
const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });
const ProfileCard = dynamic(() => import("@/components/ui/ProfileCard"), { ssr: false });

// ─────────────────────────────────────────────────────────
//  Centered container used in every section
// ─────────────────────────────────────────────────────────
function C({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        gap: "2rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Divider({ color }: { color: string }) {
  return <hr style={{ border: "none", borderTop: `1px solid ${color}`, width: "100%" }} />;
}

function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "0.68rem",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </span>
  );
}

function BigTitle({ children, color = "inherit" }: { children: React.ReactNode; color?: string }) {
  return (
    <h2
      style={{
        fontFamily: "Outfit, sans-serif",
        fontSize: "clamp(3rem, 9vw, 9rem)",
        fontWeight: 900,
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </h2>
  );
}

// Bouncing scroll-down hint shown at bottom of each section
function ScrollHint({ color = "rgba(255,255,255,0.35)" }: { color?: string }) {
  return (
    <div
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "0.35rem", marginTop: "auto", paddingTop: "2rem",
        animation: "scrollBounce 2s ease-in-out infinite",
        cursor: "default", userSelect: "none",
      }}
    >
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color, textTransform: "uppercase" }}>scroll</span>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}


//  01 Hero   — deep navy / dark
//  02 About  — warm cream / light
//  03 Skills — slate-teal dark
//  04 Work   — midnight purple
//  05 Contact— charcoal-black

const contact = [
  { n: "01", l: "LinkedIn — /in/bhasitgupta ↗", h: "https://www.linkedin.com/in/bhasitgupta" },
  { n: "02", l: "GitHub — @bhasitgupta ↗", h: "https://github.com/bhasitgupta" },
  { n: "03", l: "Twitter / X — @Bhasit1009 ↗", h: "https://twitter.com/Bhasit1009" },
  { n: "04", l: "Discord — mr_bhasit ↗", h: "https://discord.com/users/mr_bhasit" },
  { n: "05", l: "Email — bhasitgupta@gmail.com ↗", h: "https://mail.google.com/mail/?view=cm&fs=1&to=bhasitgupta@gmail.com" },
  { n: "06", l: "Phone — +91 7974169120 ↗", h: "tel:+917974169120" },
];

export function PortfolioFlow() {
  return (
    <FlowArt aria-label="Bhasit Gupta Portfolio">

      {/* ═══════════════════════════════════════════════════
          01 HERO — Beams background + ProfileCard
      ═══════════════════════════════════════════════════ */}
      <FlowSection aria-label="Hero" style={{ background: "#0d1117", color: "#e8e4f0", position: "relative" }}>
        {/* Beams animated background — absolute fill */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.85 }}>
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={10}
            lightColor="#a78bfa"
            speed={1.8}
            noiseIntensity={1.5}
            scale={0.18}
            rotation={0}
          />
        </div>

        {/* Content over beams */}
        <C style={{ position: "relative", zIndex: 1 }}>
          <Tag color="#a78bfa">01 — Developer &amp; Creator</Tag>
          <Divider color="rgba(255,255,255,0.08)" />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>
            {/* Left — TrueFocus name + description + CTAs */}
            <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <TrueFocus
                sentence="BHASIT GUPTA"
                separator=" "
                manualMode={false}
                blurAmount={4}
                borderColor="#7c6af7"
                glowColor="rgba(124,106,247,0.7)"
                animationDuration={0.7}
                pauseBetweenAnimations={1.5}
                wordStyle={{ color: "#e8e4f0", fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.88 }}
              />
              <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.35rem)", lineHeight: 1.8, maxWidth: "44ch", color: "rgba(232,228,240,0.6)" }}>
                AI/ML Developer &amp; Full Stack Engineer. I don&apos;t wait for the future — I build it.
              </p>
            </div>

            {/* Right — 3D holographic ProfileCard with real photo */}
            <div style={{ flex: "0 0 auto" }}>
              <ProfileCard
                avatarUrl="/photo-1.png"
                name="Bhasit Gupta"
                title="AI/ML Developer"
                handle="Bhasit Gupta"
                status="Available for work"
                contactText="Contact"
                showUserInfo={true}
                enableTilt={true}
                behindGlowEnabled={true}
                behindGlowColor="rgba(124,106,247,0.55)"
                innerGradient="linear-gradient(145deg,#7c6af740 0%,#4fc9fa28 100%)"
                onContactClick={() => window.location.href = 'mailto:bhasitgupta@gmail.com'}
              />
            </div>
          </div>
          <ScrollHint color="rgba(255,255,255,0.3)" />
        </C>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          02 ABOUT — Warm Cream Light  #f5f0e8
      ═══════════════════════════════════════════════════ */}
      <FlowSection aria-label="About" style={{ background: "#f5f0e8", color: "#111118" }}>
        <C>
          <Tag color="#5b4fe8">02 — About Me</Tag>
          <Divider color="rgba(0,0,0,0.09)" />

          {/* Headline + Photo + Bio — all in one tight row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>

            {/* Left — headline, tagline, bio, quote, stats */}
            <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <BigTitle color="#111118">
                I BUILD<br />
                <span style={{ color: "#5b4fe8" }}>CLEAN.</span>
              </BigTitle>

              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(0.72rem, 1vw, 0.85rem)", color: "#5b4fe8", letterSpacing: "0.04em", lineHeight: 1.6 }}>
                AI + Full Stack + Design —<br />crafting scalable products for the next generation of the web.
              </p>

              <p style={{ fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)", lineHeight: 1.85, color: "rgba(17,17,24,0.7)", maxWidth: "58ch" }}>
                Hey, I&apos;m <strong style={{ color: "#111118" }}>Bhasit</strong> — an AI/ML Engineer, Full-Stack Developer, and Creative Designer building powerful digital experiences that combine intelligence, performance, and design.
              </p>

              <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.97rem)", lineHeight: 1.85, color: "rgba(17,17,24,0.55)", maxWidth: "58ch" }}>
                I work on AI-powered products, scalable backend systems, modern web apps, and intuitive UIs. From machine learning and automation to full-stack development and Web3 — I explore technologies that shape the future.
              </p>

              <blockquote style={{ borderLeft: "3px solid #5b4fe8", paddingLeft: "1.25rem", fontFamily: "Outfit, sans-serif", fontStyle: "italic", fontSize: "clamp(0.88rem, 1.2vw, 1rem)", color: "rgba(17,17,24,0.45)", lineHeight: 1.7, margin: 0 }}>
                &ldquo;I don&apos;t just build projects — I build ideas that can shape the future.&rdquo;
              </blockquote>

              <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", paddingTop: "0.25rem" }}>
                {[["10+", "Projects Shipped"], ["5+", "Certifications"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "Outfit,sans-serif", fontSize: "2.2rem", fontWeight: 900, color: "#5b4fe8", lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: "0.68rem", fontFamily: "JetBrains Mono,monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(17,17,24,0.4)", marginTop: "0.3rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Photo */}
            <div style={{ width: 370, height: 490, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photo-2.png"
                alt="Bhasit Gupta"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", mixBlendMode: "multiply" }}
              />
            </div>
          </div>

        </C>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          03 SKILLS — Slate Teal Dark  #0a1628
      ═══════════════════════════════════════════════════ */}
      <FlowSection aria-label="Skills" style={{ background: "#1a0000", color: "#f5dada" }}>
        <C>
          <Tag color="#ff6b6b">03 — The Toolkit</Tag>
          <Divider color="rgba(255,255,255,0.06)" />

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <BigTitle color="#f5dada">
              TECH<br />
              <span style={{ color: "#ff6b6b" }}>STACK</span>
            </BigTitle>

            {/* Photo 4 — screen blend on dark red */}
            <div style={{ width: 260, height: 340, flexShrink: 0, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photo-4.png"
                alt="Bhasit Gupta"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", mixBlendMode: "screen" }}
              />
            </div>
          </div>

          <Divider color="rgba(255,255,255,0.06)" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2.5rem" }}>
            {[
              { cat: "Frontend", items: "React · Next.js · TypeScript · Tailwind · Three.js" },
              { cat: "Backend", items: "Python · FastAPI · Node.js · REST · GraphQL" },
              { cat: "Database", items: "PostgreSQL · MongoDB · Redis · Supabase" },
              { cat: "DevOps", items: "Git · Docker · Linux · Vercel · Railway" },
            ].map(({ cat, items }) => (
              <div key={cat}>
                <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#ff6b6b", marginBottom: "0.75rem" }}>{cat}</p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "rgba(245,218,218,0.6)" }}>{items}</p>
              </div>
            ))}
          </div>
        </C>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          04 WORK — Midnight Purple  #120a2a
      ═══════════════════════════════════════════════════ */}
      <FlowSection aria-label="Projects" style={{ background: "#120a2a", color: "#e8e0ff" }}>
        <C>
          <Tag color="#a78bfa">04 — Selected Work</Tag>
          <Divider color="rgba(255,255,255,0.06)" />

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <BigTitle color="#e8e0ff">
              REAL<br />WORK<br />
              <span style={{ color: "#a78bfa" }}>SHIPS.</span>
            </BigTitle>

            {/* Photo 3 — no blend, original colors */}
            <div style={{ width: 220, height: 290, flexShrink: 0, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photo-3.png"
                alt="Bhasit Gupta"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
              />
            </div>
          </div>

          <Divider color="rgba(255,255,255,0.06)" />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
            {[
              { n: "01", title: "Draftdeckai", desc: "Open-source AI document platform. Transforms natural language ideas into polished resumes, presentations, and CVs.", link: "https://github.com/bhasitgupta/Draftdeckai" },
              { n: "02", title: "Glitchless", desc: "High-density enterprise SaaS platform with a highly polished, futuristic Next.js interface and dashboard.", link: "https://github.com/bhasitgupta/Glitchless" },
              { n: "03", title: "AI Anxiety Detector", desc: "Machine learning model built with Python to analyze and detect anxiety patterns using artificial intelligence.", link: "https://github.com/bhasitgupta/Bhasit-Gupta-Ai-Anxiety-Detector" },
            ].map(({ n, title, desc, link }) => (
              <div key={title} style={{ flex: "1 1 240px" }}>
                <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.65rem", color: "#a78bfa", letterSpacing: "0.2em", marginBottom: "0.6rem" }}>{n}</p>
                <p style={{ fontFamily: "Outfit,sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#e8e0ff", marginBottom: "0.6rem" }}>{title}</p>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(232,224,255,0.55)", marginBottom: "0.8rem" }}>{desc}</p>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.72rem", color: "#a78bfa", textDecoration: "none", letterSpacing: "0.05em" }}>
                  View on GitHub ↗
                </a>
              </div>
            ))}
          </div>
        </C>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          05 CONTACT — Charcoal-Black  #0d0d12
      ═══════════════════════════════════════════════════ */}
      <FlowSection aria-label="Contact" style={{ background: "#0d0d12", color: "#eeeae4" }}>
        <C>
          <Tag color="#7c6af7">05 — Let&apos;s Work Together</Tag>
          <Divider color="rgba(255,255,255,0.06)" />

          <BigTitle color="#eeeae4">
            LET&apos;S<br />
            <span style={{ background: "linear-gradient(135deg,#7c6af7,#4fc9fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              BUILD.
            </span>
          </BigTitle>

          <Divider color="rgba(255,255,255,0.06)" />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {contact.map(({ n, l, h }) => (
              <a
                key={n}
                href={h}
                target={h.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "1.25rem",
                  padding: "1.1rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none", color: "rgba(238,234,228,0.6)",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)",
                  fontFamily: "Outfit, sans-serif", fontWeight: 600,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#7c6af7")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(238,234,228,0.6)")}
              >
                <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.65rem", color: "#7c6af7", letterSpacing: "0.2em", flexShrink: 0 }}>{n} //</span>
                {l}
              </a>
            ))}
          </div>

          <Divider color="rgba(255,255,255,0.04)" />

          <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.7rem", color: "rgba(238,234,228,0.25)", letterSpacing: "0.12em" }}>
            © 2026 BHASIT GUPTA — DESIGNED &amp; BUILT WITH ♥
          </p>
        </C>
      </FlowSection>

    </FlowArt>
  );
}
