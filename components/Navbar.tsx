"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? "1rem 0" : "1.5rem 0",
        background: scrolled ? "rgba(13,13,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.85rem", fontWeight: 700,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#eeeae4",
          }}
        >
          BG
        </span>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {[
            { label: "About", id: "About" },
            { label: "Skills", id: "Skills" },
            { label: "Work", id: "Projects" },
            { label: "Contact", id: "Contact" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => document.querySelector(`[aria-label="${l.id}"]`)?.scrollIntoView({ behavior: "smooth" })}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.72rem", letterSpacing: "0.15em",
                textTransform: "uppercase", background: "none",
                border: "none", cursor: "pointer", color: "rgba(238,234,228,0.55)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#eeeae4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(238,234,228,0.55)")}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={toggle}
            style={{
              width: 34, height: 34, borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent", cursor: "pointer",
              color: "rgba(238,234,228,0.6)", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#a78bfa"; (e.currentTarget as HTMLElement).style.color = "#a78bfa"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "rgba(238,234,228,0.6)"; }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.72rem", letterSpacing: "0.15em",
              textTransform: "uppercase", padding: "0.5rem 1.2rem",
              borderRadius: 100, border: "1px solid rgba(167,139,250,0.4)",
              color: "#a78bfa", textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.12)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Resume ↗
          </a>
        </div>
      </div>
    </header>
  );
}
