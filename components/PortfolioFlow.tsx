"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { Mail, Phone, Sun, Moon } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons/GithubIcon";
import { useTheme } from "@/components/ThemeProvider";

// Dynamically import Three.js scene to avoid Next.js SSR WebGL errors
const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
});

// Centered container used in every section
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
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(3rem, 9vw, 9rem)",
        fontWeight: 500,
        lineHeight: 1.0,
        letterSpacing: "-0.01em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </h2>
  );
}

const contact = [
  { n: "01", icon: <LinkedinIcon size={28} />, href: "https://linkedin.com/in/bhasitgupta" },
  { n: "02", icon: <GithubIcon size={28} />, href: "https://github.com/bhasitgupta" },
  { n: "03", icon: <TwitterIcon size={28} />, href: "https://x.com/Bhasit1009" },
  { n: "04", icon: <Mail size={28} />, href: "https://mail.google.com/mail/?view=cm&fs=1&to=bhasitgupta@gmail.com", text: "bhasitgupta@gmail.com" },
  { n: "05", icon: <Phone size={28} />, href: "tel:+917974169120", text: "+91 7974169120" },
];

export function PortfolioFlow() {
  const { theme, toggle } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Refs for GSAP ScrollTrigger Intro Section
  const introContainerRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec2StackRef = useRef<HTMLDivElement>(null);
  const mapBarRef = useRef<HTMLDivElement>(null);
  const mapleRef = useRef<HTMLImageElement>(null);
  const potRef = useRef<HTMLImageElement>(null);
  const mossRef = useRef<HTMLImageElement>(null);
  const bambooRef = useRef<HTMLImageElement>(null);

  // Japandi Wabi-Sabi Loader Progress Effect
  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 2400; // Smooth 2.4s elegant loading sequence
    const intervalTime = 24;
    const step = end / (duration / intervalTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setProgress(100);
        clearInterval(timer);
        
        setTimeout(() => {
          gsap.to(".loading-screen", {
            opacity: 0,
            y: "-100%",
            duration: 1.4,
            ease: "power4.inOut",
            onComplete: () => {
              setLoading(false);
              // Force window scroll back to very top so user sees Curated Journey first
              window.scrollTo(0, 0);
              ScrollTrigger.refresh();
            },
          });
        }, 350);
      } else {
        setProgress(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // GSAP ScrollTrigger Intro Animation
  useEffect(() => {
    if (!introContainerRef.current) return;

    // Register ScrollTrigger safely
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create pinned ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introContainerRef.current,
          start: "top top",
          end: "+=350%", // Pins for 3.5x viewport height of scroll progress
          pin: true,
          scrub: 1.2, // Smooth scrubbing
          invalidateOnRefresh: true,
        }
      });

      // 1. Section 1 header splits apart vertically, and fades out. Description fades down and out.
      tl.to(line1Ref.current, { yPercent: -100, opacity: 0, duration: 1.2, ease: "power2.inOut" }, 0);
      tl.to(line2Ref.current, { yPercent: 100, opacity: 0, duration: 1.2, ease: "power2.inOut" }, 0);
      tl.to(headerContainerRef.current, { y: 100, opacity: 0, duration: 1.2, ease: "power2.inOut" }, 0);
      tl.to(descRef.current, { y: 100, opacity: 0, duration: 1.0, ease: "power2.inOut" }, 0);
      tl.to(mapleRef.current, { y: -60, opacity: 0, duration: 1.0, ease: "power2.inOut" }, 0);

      // 2. Section 2 ("BREATH", "BODY", "MIND", "SOUND") typographic vertical stack sequence
      const words = sec2Ref.current?.querySelectorAll(".sec2-word");
      if (words && words.length > 0 && sec2StackRef.current) {
        // Initial state of stack is y: "120vh"
        tl.fromTo(sec2StackRef.current, 
          { y: "120vh" }, 
          { y: "37.5vh", duration: 1.5, ease: "power2.out" }, 
          0.8
        );
        tl.to(words[0], { opacity: 1, duration: 1.5, ease: "power2.out" }, 0.8);

        // Step 1: Translate stack to 12.5vh. BREATH fades to 0.15, BODY fades to 1.0
        tl.to(sec2StackRef.current, { y: "12.5vh", duration: 1.5, ease: "power2.inOut" }, 2.3);
        tl.to(words[0], { opacity: 0.15, duration: 1.5, ease: "power2.inOut" }, 2.3);
        tl.to(words[1], { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 2.3);

        // Step 2: Translate stack to -12.5vh. BODY fades to 0.15, MIND fades to 1.0
        tl.to(sec2StackRef.current, { y: "-12.5vh", duration: 1.5, ease: "power2.inOut" }, 3.8);
        tl.to(words[1], { opacity: 0.15, duration: 1.5, ease: "power2.inOut" }, 3.8);
        tl.to(words[2], { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 3.8);

        // Step 3: Translate stack to -37.5vh. MIND fades to 0.15, SOUND fades to 1.0
        tl.to(sec2StackRef.current, { y: "-37.5vh", duration: 1.5, ease: "power2.inOut" }, 5.3);
        tl.to(words[2], { opacity: 0.15, duration: 1.5, ease: "power2.inOut" }, 5.3);
        tl.to(words[3], { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 5.3);

        // Exiting Phase: Translate stack to -120vh. SOUND fades to 0.15
        tl.to(sec2StackRef.current, { y: "-120vh", duration: 1.5, ease: "power2.in" }, 6.8);
        tl.to(words[3], { opacity: 0.15, duration: 1.5, ease: "power2.in" }, 6.8);
      }

      // 3. Fade in map bar as Section 2 finishes exiting (integrated into main timeline)
      if (mapBarRef.current) {
        tl.to(mapBarRef.current, { 
          opacity: 1, 
          duration: 1.5, 
          ease: "power2.out",
          onStart: () => {
            if (mapBarRef.current) mapBarRef.current.style.pointerEvents = "auto";
          },
          onReverseComplete: () => {
            if (mapBarRef.current) mapBarRef.current.style.pointerEvents = "none";
          }
        }, 6.8); // Starts fading in as the final word SOUND begins its exit
      }

      // 4. Class-based scroll reveals for headings, subheadings, paragraphs, details, and cards
      const revealTitles = document.querySelectorAll(".reveal-title");
      revealTitles.forEach((el) => {
        gsap.fromTo(el,
          { y: 25, filter: "blur(4px)", opacity: 0 },
          {
            y: 0,
            filter: "blur(0px)",
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      const revealTexts = document.querySelectorAll(".reveal-text");
      revealTexts.forEach((el) => {
        gsap.fromTo(el,
          { y: 15, opacity: 0 }, // Pruned filter: blur to eliminate heavy body-text glyph rasterization cost
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      const revealDetails = document.querySelectorAll(".reveal-detail");
      revealDetails.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      const revealCards = document.querySelectorAll(".reveal-card");
      revealCards.forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // 5. Scroll-linked parallax for greenery assets
      if (potRef.current) {
        gsap.fromTo(potRef.current,
          { y: 0 },
          {
            y: 60,
            ease: "none",
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }

      if (mossRef.current) {
        gsap.fromTo(mossRef.current,
          { y: -30 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }

      if (bambooRef.current) {
        gsap.fromTo(bambooRef.current,
          { y: -40 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: "#skills",
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }
    }, introContainerRef);

    return () => ctx.revert();
  }, []);

  // Track active section for the vertical map bar navigation
  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when section is centered in the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── Japandi / Wabi-Sabi Elegant Loading Screen ─── */}
      {loading && (
        <div 
          className="loading-screen"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            color: "var(--text)",
            transition: "background-color 0.3s"
          }}
        >
          {/* Subtle warm sun glow in background */}
          <div 
            style={{ 
              position: "absolute", 
              width: "50vw", 
              height: "50vw", 
              background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", 
              pointerEvents: "none" 
            }} 
          />
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", zIndex: 1, textAlign: "center" }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem", letterSpacing: "0.38em", color: "var(--text-2)", opacity: 0.8 }}>
              BHASIT GUPTA — PORTFOLIO
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", zIndex: 1 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(5rem, 10vw, 7.5rem)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.03em" }}>
              {String(progress).padStart(3, "0")}
            </span>
            <div style={{ width: "220px", height: "1px", background: "var(--border)", position: "relative", overflow: "hidden" }}>
              <div 
                style={{ 
                  height: "100%", 
                  background: "var(--accent)", 
                  width: `${progress}%`,
                  transition: "width 0.08s ease-out"
                }} 
              />
            </div>
          </div>

          <div style={{ textAlign: "center", maxWidth: "440px", padding: "0 2rem", zIndex: 1 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)", color: "var(--text-2)", lineHeight: 1.65, margin: 0 }}>
              &ldquo;Find beauty in imperfection, and stillness in motion.&rdquo;
            </p>
            <span style={{ display: "block", marginTop: "0.75rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.22em", color: "var(--accent)", opacity: 0.5 }}>
              禅 — SHIN-ON (HEART SOUND)
            </span>
          </div>
        </div>
      )}

      {/* Shoji-inspired Vertical Background Grid Lines */}
      <div 
        style={{ 
          position: "fixed", 
          top: 0, 
          left: "50%", 
          transform: "translateX(-50%)", 
          width: "100%", 
          maxWidth: "1060px", 
          height: "100vh", 
          display: "flex", 
          justifyContent: "space-between", 
          pointerEvents: "none", 
          zIndex: 0, 
          padding: "0 2.5rem" 
        }}
      >
        <div style={{ width: "1px", height: "100%", background: "var(--border)", opacity: 0.45 }} />
        <div style={{ width: "1px", height: "100%", background: "var(--border)", opacity: 0.45 }} />
        <div style={{ width: "1px", height: "100%", background: "var(--border)", opacity: 0.45 }} />
        <div style={{ width: "1px", height: "100%", background: "var(--border)", opacity: 0.45 }} />
      </div>

      {/* 3D Three.js Zen Stone Stack Canvas (Fixed background for entire site) */}
      <div className="hero-canvas-container">
        <HeroScene />
      </div>

      <FlowArt aria-label="Bhasit Gupta Portfolio">

        {/* ═══════════════════════════════════════════════════
            GSAP SCROLLTRIGGER INTRO BLOCK (Embark & Transition)
        ═══════════════════════════════════════════════════ */}
        <div 
          ref={introContainerRef} 
          style={{ 
            position: "relative", 
            width: "100%", 
            minHeight: "100vh", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            overflow: "hidden",
            zIndex: 10
          }}
        >
          {/* Section 1: LARGE HEADER + 2-COLUMN DESCRIPTION */}
          <div 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              textAlign: "center", 
              width: "100%", 
              maxWidth: "980px", 
              margin: "0 auto", 
              padding: "0 2rem",
              position: "absolute",
              inset: 0,
              zIndex: 10
            }}
          >
            {/* Hanging Momiji Green Maple Branch - top-right */}
            <img 
              ref={mapleRef}
              src="/greenery/maple.png" 
              alt="" 
              style={{ 
                position: "absolute", 
                top: 0, 
                right: 0, 
                width: "clamp(200px, 35vw, 360px)", 
                height: "auto", 
                pointerEvents: "none", 
                zIndex: 12,
                opacity: 0.65, // Translucent washi paper aesthetic
                mixBlendMode: "normal", // Flawless natural blending on clean transparent PNG
                maskImage: "radial-gradient(circle at 55% 45%, black 60%, transparent 95%)",
                WebkitMaskImage: "radial-gradient(circle at 55% 45%, black 60%, transparent 95%)", // Feathers edges beautifully
                willChange: "transform"
              }} 
            />
            <div 
              ref={headerContainerRef}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
            >
              <div style={{ overflow: "hidden" }}>
                <h2 
                  ref={line1Ref} 
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif", 
                    fontSize: "clamp(2rem, 5vw, 4.5rem)", 
                    fontWeight: 500, 
                    textTransform: "uppercase", 
                    letterSpacing: "0.22em", 
                    margin: 0,
                    lineHeight: 1.1,
                    color: "var(--text)"
                  }}
                >
                  EMBARK ON A
                </h2>
              </div>
              <div style={{ overflow: "hidden" }}>
                <h2 
                  ref={line2Ref} 
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif", 
                    fontSize: "clamp(2.5rem, 6.5vw, 6.2rem)", 
                    fontWeight: 700, 
                    textTransform: "uppercase", 
                    letterSpacing: "0.15em", 
                    margin: 0,
                    lineHeight: 1.1,
                    color: "var(--accent)" 
                  }}
                >
                  CURATED JOURNEY
                </h2>
              </div>
            </div>

            <div 
              ref={descRef} 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                gap: "clamp(2rem, 4vw, 5rem)", 
                maxWidth: "840px", 
                marginTop: "4rem", 
                width: "100%", 
                textAlign: "left" 
              }}
            >
              <p style={{ fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)", color: "var(--text-2)", lineHeight: 1.85, margin: 0 }}>
                Welcome to the digital atelier of Bhasit Gupta—a creative portfolio built to showcase the harmony of advanced machine intelligence and polished full-stack craftsmanship. Here, complex algorithms meet wabi-sabi design.
              </p>
              <p style={{ fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)", color: "var(--text-2)", lineHeight: 1.85, margin: 0 }}>
                Explore a curated showcase of deep neural networks, robust system architecture, and interactive frontend experiences. As you scroll, discover real-world products engineered for performance, scale, and clarity.
              </p>
            </div>
          </div>

          {/* Section 2: BREATH, BODY, MIND, SOUND Reveal */}
          <div 
            ref={sec2Ref} 
            style={{ 
              position: "absolute",
              inset: 0,
              zIndex: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <div 
              ref={sec2StackRef} 
              style={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center", 
                justifyContent: "center",
                width: "100%",
                willChange: "transform"
              }}
            >
              {["BREATH", "BODY", "MIND", "SOUND"].map((word) => (
                <div 
                  key={word} 
                  className="sec2-word" 
                  style={{ 
                    fontFamily: "Outfit, sans-serif", 
                    fontSize: "clamp(4rem, 11vw, 10rem)", 
                    fontWeight: 700, 
                    letterSpacing: "0.08em", 
                    opacity: 0.15, 
                    color: "var(--text)",
                    height: "25vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* ═══════════════════════════════════════════════════
          PERSISTENT LEFT-HAND MAP BAR (Borderless Navigation)
      ═══════════════════════════════════════════════════ */}
      <div 
        ref={mapBarRef}
        style={{ 
          position: "fixed", 
          left: "clamp(1.25rem, 3.5vw, 2.5rem)", 
          top: "50%", 
          transform: "translateY(-50%)", 
          zIndex: 100, 
          display: "flex", 
          flexDirection: "column", 
          gap: "1.6rem", 
          fontFamily: "JetBrains Mono, monospace", 
          fontSize: "0.75rem", 
          letterSpacing: "0.15em",
          pointerEvents: "none",
          opacity: 0
        }}
      >
        {[
          { num: "01", name: "HOME", href: "#hero" },
          { num: "02", name: "ABOUT", href: "#about" },
          { num: "03", name: "STACK", href: "#skills" },
          { num: "04", name: "WORK", href: "#projects" },
          { num: "05", name: "CONTACT", href: "#contact" }
        ].map((item) => {
          const id = item.href.slice(1);
          const isActive = activeSection === id || (activeSection === "skills" && id === "skills");
          
          return (
            <a 
              key={item.href}
              href={item.href} 
              style={{ 
                textDecoration: "none", 
                color: "var(--text)", 
                opacity: isActive ? 1 : 0.25,
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                transition: "opacity 0.25s, color 0.25s" 
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.opacity = "0.75"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.opacity = "0.25"; }}
            >
              <span style={{ fontSize: "0.62rem", opacity: isActive ? 0.8 : 0.5, color: isActive ? "var(--accent)" : "inherit" }}>{item.num}</span>
              <span style={{ fontWeight: isActive ? 700 : 500 }}>{item.name}</span>
            </a>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════
          01 HERO — Editorial Monochrome Awwwards Style
      ═══════════════════════════════════════════════════ */}
      <FlowSection id="hero" aria-label="Hero" style={{ background: "transparent", color: "var(--text)", position: "relative", overflow: "hidden", minHeight: "100vh" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          
          {/* Soft Golden Skylight Beam Overlay */}
          <div 
            style={{ 
              position: "absolute", 
              top: 0, 
              left: "15%", 
              width: "70vw", 
              height: "100vh", 
              background: "radial-gradient(ellipse at 50% 0%, var(--spotlight) 0%, transparent 75%)", 
              pointerEvents: "none", 
              zIndex: 1 
            }} 
          />

          {/* Vermilion Sun Glow Overlay (Rising Sun Motif) */}
          <div 
            style={{ 
              position: "absolute", 
              top: "40%", 
              left: "65%", 
              width: "45vw", 
              height: "45vw", 
              borderRadius: "50%",
              background: "radial-gradient(circle, var(--sun-glow) 0%, transparent 68%)", 
              pointerEvents: "none", 
              zIndex: 1 
            }} 
          />

          <img 
            ref={potRef}
            src="/greenery/pot.png" 
            alt="" 
            style={{ 
              position: "absolute", 
              top: "20%", 
              left: "clamp(4rem, 10vw, 8rem)", 
              width: "clamp(130px, 18vw, 200px)", 
              height: "auto", 
              pointerEvents: "none", 
              zIndex: 4, // Foreground layer placement
              opacity: 0.9,
              mixBlendMode: "normal", // Flawless natural blending on clean transparent PNG
              maskImage: "linear-gradient(to bottom, black 65%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 98%)", // Soft transition to transparent at bottom
              willChange: "transform"
            }} 
          />

          {/* 3D Zen Stone Stack is rendered at the fixed root level for scroll effects */}

          {/* Horizontal Navbar - Top */}
          <nav 
            style={{ 
              position: "absolute", 
              top: "clamp(1.5rem, 4vw, 3rem)", 
              left: "clamp(1.5rem, 4vw, 3rem)", 
              right: "clamp(1.5rem, 4vw, 3rem)", 
              zIndex: 50, // Raised to sit proudly above stacking containers
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              pointerEvents: "auto" // Ensure it captures all clicks
            }}
          >
            <div style={{ flex: 1, paddingLeft: "clamp(3.5rem, 8vw, 6.5rem)" }}>© Bhasit Gupta</div>
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <button 
                onClick={toggle} 
                style={{ 
                  background: "none", 
                  cursor: "pointer", 
                  color: "inherit", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  padding: "0.5rem",
                  borderRadius: "100px",
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 0 10px var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </nav>

          {/* Social Links - Bottom Left */}
          <div 
            style={{ 
              position: "absolute", 
              bottom: "clamp(1.5rem, 4vw, 3rem)", 
              left: "clamp(1.25rem, 3.5vw, 2.5rem)", // Matches persistent map bar left coordinate
              zIndex: 50, // Raised to stack above overlay columns
              display: "flex", 
              gap: "1.5rem", 
              fontFamily: "Inter, sans-serif", 
              fontSize: "0.85rem", 
              fontWeight: 500,
              pointerEvents: "auto" // Capture all cursor events
            }}
          >
            <a 
              href="https://linkedin.com/in/bhasitgupta" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                textDecoration: "none", 
                color: "var(--text-2)", 
                opacity: 0.6, 
                transition: "opacity 0.2s, color 0.2s" 
              }} 
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.color = "var(--accent)";
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.6";
                e.currentTarget.style.color = "var(--text-2)";
              }}
            >
              LinkedIn
            </a>
            <a 
              href="https://x.com/Bhasit1009" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                textDecoration: "none", 
                color: "var(--text-2)", 
                opacity: 0.6, 
                transition: "opacity 0.2s, color 0.2s" 
              }} 
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.color = "var(--accent)";
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.6";
                e.currentTarget.style.color = "var(--text-2)";
              }}
            >
              Twitter
            </a>
            <a 
              href="https://github.com/bhasitgupta" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                textDecoration: "none", 
                color: "var(--text-2)", 
                opacity: 0.6, 
                transition: "opacity 0.2s, color 0.2s" 
              }} 
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.color = "var(--accent)";
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.6";
                e.currentTarget.style.color = "var(--text-2)";
              }}
            >
              GitHub
            </a>
          </div>

          {/* Role Text - Bottom Right */}
          <div 
            style={{ position: "absolute", bottom: "clamp(1.5rem, 4vw, 3rem)", right: "clamp(1.5rem, 4vw, 3rem)", zIndex: 10, textAlign: "right", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.01em", color: "var(--text-2)" }}
          >
            AI/ML Engineer<br/>
            Full Stack Developer<br/>
            Creative Technologist
          </div>

          {/* Typographic Columns */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "clamp(2rem, 8vw, 8rem)", overflow: "hidden", pointerEvents: "none" }}>
            
            <div style={{ display: "flex", flexDirection: "row", gap: "2.5rem", alignItems: "flex-start", zIndex: 3 }}>
              
              {/* Bhasit Column Group */}
              <div style={{ display: "flex", flexDirection: "row", gap: "0.8rem", alignItems: "center" }}>
                <div 
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)",
                    fontWeight: 300,
                    color: "var(--text-3)",
                    opacity: 0.35,
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                    letterSpacing: "0.4em",
                    marginRight: "0.25rem"
                  }}
                >
                  バシット・グプタ
                </div>
                <h1 
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(5rem, 11vw, 13rem)", 
                    fontWeight: 400, 
                    lineHeight: 0.8, 
                    letterSpacing: "-0.01em",
                    color: "var(--text)",
                    writingMode: "vertical-rl",
                    margin: 0,
                    whiteSpace: "nowrap"
                  }}
                >
                  Bhasit
                </h1>
              </div>
              
              {/* Gupta Column Group */}
              <div style={{ display: "flex", flexDirection: "row", gap: "0.8rem", alignItems: "center", marginTop: "clamp(4rem, 10vw, 9rem)" }}>
                <div 
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)",
                    fontWeight: 300,
                    color: "var(--text-3)",
                    opacity: 0.35,
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                    letterSpacing: "0.4em",
                    marginRight: "0.25rem"
                  }}
                >
                  技術とデザイン
                </div>
                <h1 
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(5rem, 11vw, 13rem)", 
                    fontWeight: 400, 
                    lineHeight: 0.8, 
                    letterSpacing: "-0.01em",
                    color: "var(--text-2)",
                    writingMode: "vertical-rl",
                    margin: 0,
                    whiteSpace: "nowrap"
                  }}
                >
                  Gupta
                </h1>
              </div>

            </div>

          </div>
        </div>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          02 ABOUT — Dark Matte with Warm Radial Glow
      ═══════════════════════════════════════════════════ */}
      <FlowSection id="about" aria-label="About" style={{ background: "transparent", color: "var(--text)", position: "relative", overflow: "hidden" }}>
        {/* Cinematic Ambient Glows */}
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        
        <img 
          ref={mossRef}
          src="/greenery/moss.png" 
          alt="" 
          style={{ 
            position: "absolute", 
            bottom: "2rem", 
            left: "clamp(22rem, 36vw, 26rem)", 
            width: "clamp(180px, 25vw, 260px)", 
            height: "auto", 
            pointerEvents: "none", 
            zIndex: 4, // Higher foreground placement sits in front of card overlapping beautifully
            opacity: 0.9,
            mixBlendMode: "normal", // Flawless natural blending on clean transparent PNG
            maskImage: "radial-gradient(circle at center, black 70%, transparent 98%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 70%, transparent 98%)", // Gently softens organic mist edges
            willChange: "transform"
          }} 
        />
        
        <C style={{ position: "relative", zIndex: 3 }}>
          {/* Opaque Wabi-Sabi Panel wrapping the About contents */}
          <div 
            className="card"
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "1.5rem", 
              width: "100%", 
              maxWidth: "840px", 
              padding: "clamp(1.75rem, 5vw, 3.5rem)"
            }}
          >
            <div className="reveal-detail">
              <Tag color="var(--text-2)">02 — About Me</Tag>
            </div>
            <div className="reveal-detail">
              <Divider color="var(--border)" />
            </div>

            {/* Headline + Bio — Top Row: Title on Left, Portrait Image beside it on Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "100%" }}>
              
              {/* Row 1: Side-by-side header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2.5rem", flexWrap: "wrap", width: "100%" }}>
                
                {/* Left: Title only to ensure perfect vertical center alignment */}
                <div className="reveal-title" style={{ flex: "1 1 auto" }}>
                  <BigTitle color="var(--text)">
                    I BUILD<br />
                    <span style={{ color: "var(--accent)" }}>CLEAN.</span>
                  </BigTitle>
                </div>

                {/* Right: Portrait Image directly beside the title */}
                <div 
                  className="reveal-card" 
                  style={{ 
                    flex: "0 0 170px",
                    maxWidth: "170px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "3 / 4",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--glass-specular)",
                    background: "var(--surface)",
                    backdropFilter: "blur(12px)",
                    transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    willChange: "transform"
                  }}
                  className="hover-card-zoom"
                  >
                    <img 
                      src="/bhasit-about.png" 
                      alt="Bhasit Gupta" 
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                        opacity: 0.95,
                        filter: theme === "dark" ? "contrast(1.02) brightness(0.92)" : "none"
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "18px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      pointerEvents: "none"
                    }} />
                  </div>
                </div>

              </div>

              {/* Tagline below the side-by-side header row */}
              <div className="reveal-text" style={{ marginTop: "-0.5rem" }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(0.72rem, 1vw, 0.85rem)", color: "var(--accent)", letterSpacing: "0.04em", lineHeight: 1.6 }}>
                  AI + Full Stack + Design —<br />crafting scalable products for the next generation of the web.
                </p>
              </div>

              {/* Row 2: Full-width copy flowing underneath */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", width: "100%" }}>
                <div className="reveal-text">
                  <p style={{ fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)", lineHeight: 1.85, color: "var(--text-2)", maxWidth: "58ch" }}>
                    Hey, I&apos;m <strong style={{ color: "var(--text)" }}>Bhasit</strong> — an AI/ML Engineer, Full-Stack Developer, and Creative Designer building powerful digital experiences that combine intelligence, performance, and design.
                  </p>
                </div>

                <div className="reveal-text">
                  <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.97rem)", lineHeight: 1.85, color: "var(--text-2)", opacity: 0.8, maxWidth: "58ch" }}>
                    I work on AI-powered products, scalable backend systems, modern web apps, and intuitive UIs. From machine learning and automation to full-stack development and Web3 — I explore technologies that shape the future.
                  </p>
                </div>

                <div className="reveal-text">
                  <blockquote style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1.25rem", fontFamily: "Outfit, sans-serif", fontStyle: "italic", fontSize: "clamp(0.88rem, 1.2vw, 1rem)", color: "var(--text-2)", opacity: 0.7, lineHeight: 1.7, margin: 0 }}>
                    &ldquo;I don&apos;t just build projects — I build ideas that can shape the future.&rdquo;
                  </blockquote>
                </div>

                <div className="reveal-detail" style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
                  {[["5+", "Certifications"]].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "Outfit,sans-serif", fontSize: "2.2rem", fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: "0.68rem", fontFamily: "JetBrains Mono,monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-2)", opacity: 0.7, marginTop: "0.3rem" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </C>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          03 SKILLS — Deep Black & Burnt Orange
      ═══════════════════════════════════════════════════ */}
      <FlowSection id="skills" aria-label="Skills" style={{ background: "transparent", color: "var(--text)", position: "relative", overflow: "hidden" }}>
        {/* Systems Glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vw", height: "80vw", background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        
        <img 
          ref={bambooRef}
          src="/greenery/bamboo.png" 
          alt="" 
          style={{ 
            position: "absolute", 
            top: "25%", 
            right: "clamp(2rem, 4vw, 4rem)", 
            width: "clamp(150px, 20vw, 220px)", 
            height: "auto", 
            pointerEvents: "none", 
            zIndex: 4, // Placed proudly on top of card
            opacity: 0.85,
            mixBlendMode: "normal", // Flawless natural blending on clean transparent PNG
            maskImage: "linear-gradient(to bottom, black 70%, transparent 96%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 96%)", // Beautifully feathers stalk fadeout
            willChange: "transform"
          }} 
        />
        
        <C style={{ position: "relative", zIndex: 3 }}>
          {/* Opaque Wabi-Sabi Panel wrapping the Skills contents */}
          <div 
            className="card"
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "1.5rem", 
              width: "100%", 
              maxWidth: "840px", 
              padding: "clamp(1.75rem, 5vw, 3.5rem)"
            }}
          >
            <div className="reveal-detail">
              <Tag color="var(--accent)">03 — The Toolkit</Tag>
            </div>
            <div className="reveal-detail">
              <Divider color="var(--border)" />
            </div>

            <div className="reveal-title" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
              <BigTitle color="var(--text)">
                TECH<br />
                <span style={{ color: "var(--accent)" }}>STACK</span>
              </BigTitle>
            </div>

            <div className="reveal-detail">
              <Divider color="var(--border)" />
            </div>

            <div className="reveal-text" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2.5rem" }}>
              {[
                { cat: "Frontend", items: "React · Next.js · TypeScript · Tailwind" },
                { cat: "Backend", items: "Python · FastAPI · Node.js · REST" },
                { cat: "Database", items: "PostgreSQL · MongoDB · Supabase" },
                { cat: "DevOps", items: "Git · Docker · Linux · Vercel" },
              ].map(({ cat, items }) => (
                <div key={cat}>
                  <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>{cat}</p>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "var(--text-2)" }}>{items}</p>
                </div>
              ))}
            </div>
          </div>
        </C>
      </FlowSection>

      {/* ═══════════════════════════════════════════════════
          04 WORK — Dark Background & Deep Crimson
      ═══════════════════════════════════════════════════ */}
      <FlowSection id="projects" aria-label="Projects" style={{ background: "transparent", color: "var(--text)", position: "relative", overflow: "hidden" }}>
        {/* Atmospheric Glows */}
        <div style={{ position: "absolute", top: "0", right: "0", width: "60vw", height: "60vw", background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "0", left: "0", width: "60vw", height: "60vw", background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        
        <C style={{ position: "relative", zIndex: 3 }}>
          <div className="reveal-detail">
            <Tag color="var(--accent)">04 — Selected Work</Tag>
          </div>
          <div className="reveal-detail">
            <Divider color="var(--border)" />
          </div>

          <div className="reveal-title" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <BigTitle color="var(--text)">
              REAL<br />WORK<br />
              <span style={{ color: "var(--accent)" }}>SHIPS.</span>
            </BigTitle>
          </div>

          <div className="reveal-detail">
            <Divider color="var(--border)" />
          </div>

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
                className="card reveal-card"
                style={{ 
                  flex: "1 1 240px", 
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.2em", marginBottom: "0.8rem" }}>{n}</p>
                <p style={{ fontFamily: "Outfit,sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--text)", marginBottom: "0.8rem" }}>{title}</p>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--text-2)", marginBottom: "1.5rem", flex: 1 }}>{desc}</p>
                <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.72rem", color: "var(--accent)", letterSpacing: "0.05em", marginTop: "auto" }}>
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
      <FlowSection id="contact" aria-label="Contact" style={{ background: "transparent", color: "var(--text)", position: "relative", overflow: "hidden" }}>
        {/* Soft Warm Coral Accent Glow */}
        <div style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: "100vw", height: "50vw", background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        
        <C style={{ position: "relative", zIndex: 3 }}>
          {/* Opaque Wabi-Sabi Panel wrapping the Contact contents */}
          <div 
            className="card"
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "1.5rem", 
              width: "100%", 
              maxWidth: "840px", 
              padding: "clamp(1.75rem, 5vw, 3.5rem)"
            }}
          >
            <div className="reveal-detail">
              <Tag color="var(--text-2)">05 — Let&apos;s Work Together</Tag>
            </div>
            <div className="reveal-detail">
              <Divider color="var(--border)" />
            </div>

            <div className="reveal-title">
              <BigTitle color="var(--text)">
                LET&apos;S BUILD<br />
                <span style={{ color: "var(--accent)" }}>
                  TOGETHER.
                </span>
              </BigTitle>
            </div>

            <div className="reveal-detail">
              <Divider color="var(--border)" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "1rem" }}>
              
              {/* Row 1: Primary Contacts */}
              <div className="reveal-text" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {contact.filter(c => c.text).map(({ n, icon, href, text }) => (
                  <a
                    key={n}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.75rem",
                      width: text ? "auto" : "70px", 
                      height: "70px",
                      padding: text ? "0 2rem" : "0",
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "1.1rem",
                      textDecoration: "none"
                    }}
                  >
                    {icon}
                    {text && <span>{text}</span>}
                  </a>
                ))}
              </div>

              {/* Row 2: Social Links */}
              <div className="reveal-detail" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {contact.filter(c => !c.text).map(({ n, icon, href, text }) => (
                  <a
                    key={n}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.75rem",
                      width: text ? "auto" : "70px", 
                      height: "70px",
                      padding: text ? "0 2rem" : "0",
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "1.1rem",
                      textDecoration: "none"
                    }}
                  >
                    {icon}
                    {text && <span>{text}</span>}
                  </a>
                ))}
              </div>
            </div>

            <div className="reveal-detail">
              <Divider color="var(--border)" />
            </div>

            <div className="reveal-detail">
              <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.12em" }}>
                © 2026 BHASIT GUPTA — DESIGNED &amp; BUILT WITH ♥
              </p>
            </div>
          </div>
        </C>
      </FlowSection>
    </FlowArt>

    {/* Floating Serenity Theme Control Pill-Bar (Bottom-Right) */}
    <div 
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        padding: "0.35rem",
        borderRadius: "100px",
        background: "var(--surface)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--border)",
        boxShadow: "var(--glass-specular)",
        transition: "all 0.3s ease",
        willChange: "transform"
      }}
    >
      <button
        onClick={() => { if (theme !== "light") toggle(); }}
        style={{
          background: theme === "light" ? (theme === "light" ? "rgba(42, 43, 45, 0.1)" : "rgba(255, 255, 255, 0.45)") : "transparent",
          cursor: "pointer",
          border: "none",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: theme === "light" ? "0 2px 10px rgba(0,0,0,0.05)" : "none"
        }}
        aria-label="Light Mode"
      >
        <Sun size={16} />
      </button>
      <button
        onClick={() => { if (theme !== "dark") toggle(); }}
        style={{
          background: theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "transparent",
          cursor: "pointer",
          border: "none",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: theme === "dark" ? "0 2px 10px rgba(0,0,0,0.15)" : "none"
        }}
        aria-label="Dark Mode"
      >
        <Moon size={16} />
      </button>
    </div>
    </>
  );
}
