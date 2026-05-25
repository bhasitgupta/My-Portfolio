"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // passive: true prevents scroll jank
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      role="banner"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? "1rem 0" : "1.5rem 0",
        // Use CSS variable for background — theme-aware
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <a
          href="#hero"
          aria-label="Bhasit Gupta — back to top"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.85rem", fontWeight: 700,
            letterSpacing: "0.3em", textTransform: "uppercase",
            // Use CSS variable — theme-aware
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          BG
        </a>

        {/* Nav links */}
        <nav
          aria-label="Primary navigation"
          style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
        >
          {[
            { label: "About", id: "About" },
            { label: "Skills", id: "Skills" },
            { label: "Work", id: "Projects" },
            { label: "Contact", id: "Contact" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() =>
                document.querySelector(`[aria-label="${l.id}"]`)?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label={`Navigate to ${l.label} section`}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.72rem", letterSpacing: "0.15em",
                textTransform: "uppercase", background: "none",
                border: "none", cursor: "pointer",
                // Use CSS variable — theme-aware
                color: "var(--text-2)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={toggle}
            style={{
              width: 34, height: 34, borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center",
              border: "1px solid var(--border)",
              background: "transparent", cursor: "pointer",
              color: "var(--text-2)", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
            }}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume PDF in new tab"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.72rem", letterSpacing: "0.15em",
              textTransform: "uppercase", padding: "0.5rem 1.2rem",
              borderRadius: 100, border: "1px solid var(--border)",
              color: "var(--text)", textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            Resume ↗
          </a>
        </div>
      </div>
    </header>
  );
}
