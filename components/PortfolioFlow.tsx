"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import TrueFocus from "@/components/ui/TrueFocus";
import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons/GithubIcon";

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
  { n: "01", icon: <LinkedinIcon size={28} />, href: "https://linkedin.com/in/bhasitgupta" },
  { n: "02", icon: <GithubIcon size={28} />, href: "https://github.com/bhasitgupta" },
  { n: "03", icon: <TwitterIcon size={28} />, href: "https://x.com/Bhasit1009" },
  { n: "04", icon: <Mail size={28} />, href: "mailto:bhasitgupta@gmail.com", text: "bhasitgupta@gmail.com" },
  { n: "05", icon: <Phone size={28} />, href: "tel:+917974169120", text: "+91 7974169120" },
];

export function PortfolioFlow() {
  return (
    <FlowArt aria-label="Bhasit Gupta Portfolio">

      {/* ═══════════════════════════════════════════════════
          01 HERO — Editorial Monochrome Awwwards Style
      ═══════════════════════════════════════════════════ */}
      <FlowSection aria-label="Hero" style={{ background: "#f5f5f3", color: "#111", position: "relative", overflow: "hidden", minHeight: "100vh" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", background: "#f5f5f3" }}>
          
          {/* Horizontal Navbar - Top */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            style={{ 
              position: "absolute", 
              top: "clamp(1.5rem, 4vw, 3rem)", 
              left: "clamp(1.5rem, 4vw, 3rem)", 
              right: "clamp(1.5rem, 4vw, 3rem)", 
              zIndex: 10, 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500
            }}
          >
            <div style={{ flex: 1 }}>© Bhasit Gupta</div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <a href="#about" style={{ textDecoration: "none", color: "inherit", transition: "opacity 0.3s" }}>About</a>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <a href="#projects" style={{ textDecoration: "none", color: "inherit", transition: "opacity 0.3s" }}>Projects</a>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <a href="#contact" style={{ textDecoration: "none", color: "inherit", transition: "opacity 0.3s" }}>Contact</a>
            </div>
          </motion.nav>

          {/* Social Links - Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            style={{ position: "absolute", bottom: "clamp(1.5rem, 4vw, 3rem)", left: "clamp(1.5rem, 4vw, 3rem)", zIndex: 10, display: "flex", flexDirection: "column", gap: "0.25rem", fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 500 }}
          >
            <a href="https://linkedin.com/in/bhasitgupta" style={{ textDecoration: "none", color: "inherit" }}>LinkedIn</a>
            <a href="https://x.com/Bhasit1009" style={{ textDecoration: "none", color: "inherit" }}>Twitter / X</a>
            <a href="https://instagram.com/guptabhasit" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>Instagram</a>
            <a href="https://github.com/bhasitgupta" style={{ textDecoration: "none", color: "inherit" }}>GitHub</a>
          </motion.div>

          {/* Role Text - Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            style={{ position: "absolute", bottom: "clamp(1.5rem, 4vw, 3rem)", right: "clamp(1.5rem, 4vw, 3rem)", zIndex: 10, textAlign: "right", fontFamily: "Outfit, sans-serif", fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            // AI/ML Engineer<br/>
            Full Stack Developer<br/>
            Creative Technologist
          </motion.div>

          {/* Parallax Image & Typography */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            
            {/* LAYER 3: "Bhasit" IN FRONT of the image with Difference Blending */}
            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                position: "absolute", 
                zIndex: 3,
                fontFamily: "'Helvetica Neue', 'Neue Haas Grotesk', 'SF Pro Display', Helvetica, sans-serif",
                fontSize: "clamp(6rem, 18vw, 24rem)", 
                fontWeight: 900, 
                lineHeight: 0.85, 
                letterSpacing: "-0.06em",
                color: "#f5f5f3",
                mixBlendMode: "difference",
                whiteSpace: "nowrap",
                top: "15%",
                left: "-2%",
                margin: 0
              }}
            >
              Bhasit
            </motion.h1>

            {/* LAYER 2: Portrait Image (Grounded) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "absolute", zIndex: 2, inset: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", paddingLeft: "5%" }}
            >
              {/* Subtle ambient shadow behind the portrait for grounding */}
              <div style={{ position: "absolute", bottom: "-2%", left: "50%", transform: "translateX(-45%)", width: "50vw", height: "15vh", background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)", filter: "blur(20px)", zIndex: -1, pointerEvents: "none" }} />
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/ee.png" 
                alt="Bhasit Gupta" 
                style={{ 
                  height: "95vh", 
                  width: "auto",
                  objectFit: "cover",
                  objectPosition: "bottom center",
                  mixBlendMode: "multiply",
                  pointerEvents: "none",
                  WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  transform: "translateY(5%)" // Push it slightly lower to ground it
                }} 
              />
            </motion.div>

            {/* LAYER 3: "Gupta" IN FRONT of the image with Difference Blending */}
            <motion.h1 
              initial={{ x: 100, y: 50, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                position: "absolute", 
                zIndex: 3,
                fontFamily: "'Helvetica Neue', 'Neue Haas Grotesk', 'SF Pro Display', Helvetica, sans-serif",
                fontSize: "clamp(6rem, 18vw, 24rem)", 
                fontWeight: 900, 
                lineHeight: 0.85, 
                letterSpacing: "-0.06em",
                color: "#f5f5f3", // Difference blend with #f5f5f3 background yields pure black #000. Over dark image yields light text.
                mixBlendMode: "difference",
                whiteSpace: "nowrap",
                bottom: "15%",
                right: "-2%",
                margin: 0
              }}
            >
              Gupta
            </motion.h1>

          </div>
        </div>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          02 ABOUT — Dark Matte with Warm Radial Glow
      ═══════════════════════════════════════════════════ */}
      <FlowSection id="about" aria-label="About" style={{ background: "#080808", color: "#F3F1EC", position: "relative", overflow: "hidden" }}>
        {/* Cinematic Ambient Glows */}
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(204,91,67,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(204,91,67,0.04) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
        
        <C style={{ position: "relative", zIndex: 1 }}>
          <Tag color="#a89b93">02 — About Me</Tag>
          <Divider color="rgba(255,255,255,0.05)" />

          {/* Headline + Photo + Bio — all in one tight row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>

            {/* Left — headline, tagline, bio, quote, stats */}
            <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <BigTitle color="#F3F1EC">
                I BUILD<br />
                <span style={{ color: "#cc5b43" }}>CLEAN.</span>
              </BigTitle>

              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(0.72rem, 1vw, 0.85rem)", color: "#cc5b43", letterSpacing: "0.04em", lineHeight: 1.6 }}>
                AI + Full Stack + Design —<br />crafting scalable products for the next generation of the web.
              </p>

              <p style={{ fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)", lineHeight: 1.85, color: "rgba(243,241,236,0.75)", maxWidth: "58ch" }}>
                Hey, I&apos;m <strong style={{ color: "#F3F1EC" }}>Bhasit</strong> — an AI/ML Engineer, Full-Stack Developer, and Creative Designer building powerful digital experiences that combine intelligence, performance, and design.
              </p>

              <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.97rem)", lineHeight: 1.85, color: "rgba(243,241,236,0.6)", maxWidth: "58ch" }}>
                I work on AI-powered products, scalable backend systems, modern web apps, and intuitive UIs. From machine learning and automation to full-stack development and Web3 — I explore technologies that shape the future.
              </p>

              <blockquote style={{ borderLeft: "2px solid #cc5b43", paddingLeft: "1.25rem", fontFamily: "Outfit, sans-serif", fontStyle: "italic", fontSize: "clamp(0.88rem, 1.2vw, 1rem)", color: "rgba(243,241,236,0.5)", lineHeight: 1.7, margin: 0 }}>
                &ldquo;I don&apos;t just build projects — I build ideas that can shape the future.&rdquo;
              </blockquote>

              <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", paddingTop: "0.25rem" }}>
                {[["5+", "Certifications"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "Outfit,sans-serif", fontSize: "2.2rem", fontWeight: 900, color: "#F3F1EC", lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: "0.68rem", fontFamily: "JetBrains Mono,monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(243,241,236,0.5)", marginTop: "0.3rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Photo (Grounded) */}
            <div style={{ width: 400, height: 600, flexShrink: 0, position: "relative" }}>
              {/* Cinematic back-lighting behind portrait */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(204,91,67,0.1) 0%, transparent 60%)", filter: "blur(40px)", zIndex: 0, pointerEvents: "none" }} />
              {/* Subtle floor shadow */}
              <div style={{ position: "absolute", bottom: "-5%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "15%", background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)", filter: "blur(15px)", zIndex: 0, pointerEvents: "none" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photo-2.png"
                alt="Bhasit Gupta"
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  objectPosition: "top center", 
                  display: "block", 
                  mixBlendMode: "multiply",
                  WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  position: "relative",
                  zIndex: 1
                }}
              />
            </div>
          </div>

        </C>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          03 SKILLS — Deep Black & Burnt Orange
      ═══════════════════════════════════════════════════ */}
      <FlowSection aria-label="Skills" style={{ background: "#050505", color: "#F3F1EC", position: "relative", overflow: "hidden" }}>
        {/* Systems Grid & Glow */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vw", height: "80vw", background: "radial-gradient(circle, rgba(224,107,83,0.05) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
        
        <C style={{ position: "relative", zIndex: 1 }}>
          <Tag color="#e06b53">03 — The Toolkit</Tag>
          <Divider color="rgba(255,255,255,0.05)" />

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <BigTitle color="#F3F1EC">
              TECH<br />
              <span style={{ color: "#e06b53" }}>STACK</span>
            </BigTitle>
          </div>

          <Divider color="rgba(255,255,255,0.05)" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2.5rem" }}>
            {[
              { cat: "Frontend", items: "React · Next.js · TypeScript · Tailwind" },
              { cat: "Backend", items: "Python · FastAPI · Node.js · REST" },
              { cat: "Database", items: "PostgreSQL · MongoDB · Supabase" },
              { cat: "DevOps", items: "Git · Docker · Linux · Vercel" },
            ].map(({ cat, items }) => (
              <div key={cat}>
                <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#e06b53", marginBottom: "0.75rem" }}>{cat}</p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "rgba(243,241,236,0.6)" }}>{items}</p>
              </div>
            ))}
          </div>
        </C>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          04 WORK — Dark Background & Deep Crimson
      ═══════════════════════════════════════════════════ */}
      <FlowSection id="projects" aria-label="Projects" style={{ background: "#0a0a0c", color: "#F3F1EC", position: "relative", overflow: "hidden" }}>
        {/* Atmospheric Glows */}
        <div style={{ position: "absolute", top: "0", right: "0", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(184,81,65,0.04) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "0", left: "0", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(184,81,65,0.03) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
        
        <C style={{ position: "relative", zIndex: 1 }}>
          <Tag color="#b85141">04 — Selected Work</Tag>
          <Divider color="rgba(255,255,255,0.05)" />

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <BigTitle color="#F3F1EC">
              REAL<br />WORK<br />
              <span style={{ color: "#b85141" }}>SHIPS.</span>
            </BigTitle>
          </div>

          <Divider color="rgba(255,255,255,0.05)" />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>
            {[
              { n: "01", title: "Batman", desc: "Enterprise Next.js dashboard platform featuring a highly polished, high-density futuristic UI/UX.", link: "https://github.com/bhasitgupta/Batman" },
              { n: "02", title: "Glitchless", desc: "High-performance enterprise SaaS application featuring advanced AI workflows and seamless, futuristic UI/UX.", link: "https://github.com/bhasitgupta/Glitchless" },
              { n: "03", title: "AI Anxiety Detector", desc: "Machine learning model built with Python to analyze and detect anxiety patterns using artificial intelligence.", link: "https://github.com/bhasitgupta/Bhasit-Gupta-Ai-Anxiety-Detector" },
            ].map(({ n, title, desc, link }) => (
              <a 
                key={title} 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  flex: "1 1 240px", 
                  padding: "2rem", 
                  background: "rgba(255,255,255,0.02)", 
                  borderRadius: "16px", 
                  border: "1px solid rgba(255,255,255,0.05)", 
                  transition: "all 0.4s ease", 
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(184,81,65,0.3)";
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(184,81,65,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.65rem", color: "#b85141", letterSpacing: "0.2em", marginBottom: "0.8rem" }}>{n}</p>
                <p style={{ fontFamily: "Outfit,sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#F3F1EC", marginBottom: "0.8rem" }}>{title}</p>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(243,241,236,0.6)", marginBottom: "1.5rem", flex: 1 }}>{desc}</p>
                <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.72rem", color: "#b85141", letterSpacing: "0.05em", marginTop: "auto" }}>
                  View on GitHub ↗
                </span>
              </a>
            ))}
          </div>
        </C>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          05 CONTACT — Matte Black w/ Coral Glow
      ═══════════════════════════════════════════════════ */}
      <FlowSection id="contact" aria-label="Contact" style={{ background: "#050505", color: "#F3F1EC", position: "relative", overflow: "hidden" }}>
        {/* Soft Warm Coral Accent Glow */}
        <div style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: "100vw", height: "50vw", background: "radial-gradient(ellipse, rgba(214,97,73,0.06) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
        
        <C style={{ position: "relative", zIndex: 1 }}>
          <Tag color="#a89b93">05 — Let&apos;s Work Together</Tag>
          <Divider color="rgba(255,255,255,0.05)" />

          <BigTitle color="#F3F1EC">
            LET&apos;S BUILD<br />
            <span style={{ color: "#d66149" }}>
              TOGETHER.
            </span>
          </BigTitle>

          <Divider color="rgba(255,255,255,0.05)" />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "1rem" }}>
            
            {/* Row 1: Primary Contacts */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {contact.filter(c => c.text).map(({ n, icon, href, text }) => (
                <a
                  key={n}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                    width: text ? "auto" : "70px", 
                    height: "70px",
                    padding: text ? "0 2rem" : "0",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "35px",
                    color: "#a89b93",
                    fontFamily: "Outfit, sans-serif",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                    textDecoration: "none"
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.backgroundColor = "rgba(214,97,73,0.08)"; 
                    e.currentTarget.style.borderColor = "rgba(214,97,73,0.4)"; 
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.color = "#F3F1EC";
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; 
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; 
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.color = "#a89b93";
                  }}
                >
                  {icon}
                  {text && <span>{text}</span>}
                </a>
              ))}
            </div>

            {/* Row 2: Social Links */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {contact.filter(c => !c.text).map(({ n, icon, href, text }) => (
                <a
                  key={n}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                    width: text ? "auto" : "70px", 
                    height: "70px",
                    padding: text ? "0 2rem" : "0",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "35px",
                    color: "#a89b93",
                    fontFamily: "Outfit, sans-serif",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                    textDecoration: "none"
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.backgroundColor = "rgba(214,97,73,0.08)"; 
                    e.currentTarget.style.borderColor = "rgba(214,97,73,0.4)"; 
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.color = "#F3F1EC";
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; 
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; 
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.color = "#a89b93";
                  }}
                >
                  {icon}
                  {text && <span>{text}</span>}
                </a>
              ))}
            </div>
          </div>

          <Divider color="rgba(255,255,255,0.04)" />

          <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.7rem", color: "rgba(243,241,236,0.3)", letterSpacing: "0.12em" }}>
            © 2026 BHASIT GUPTA — DESIGNED &amp; BUILT WITH ♥
          </p>
        </C>
      </FlowSection>

    </FlowArt>
  );
}
