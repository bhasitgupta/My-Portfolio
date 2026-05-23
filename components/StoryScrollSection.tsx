"use client";

import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

export function StoryScrollSection() {
  return (
    <FlowArt aria-label="Bhasit Gupta Portfolio Story">

      {/* 01 — About Me */}
      <FlowSection
        aria-label="About Bhasit Gupta"
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
          01 — About Me
        </p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div>
          <h2
            className="text-[clamp(3.5rem,10vw,12rem)] font-black leading-[0.85] uppercase tracking-tight"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Code.
            <br />
            <span style={{ color: "#00f5ff" }}>Build.</span>
            <br />
            Ship.
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <p className="mt-auto max-w-[55ch] text-[clamp(1rem,2.5vw,1.5rem)] font-normal leading-relaxed text-white/70">
          Hey, I&apos;m <strong className="text-white">Bhasit Gupta</strong> — an AI/ML Developer and Full Stack Engineer from India.
          I build intelligent systems that solve real problems. Selected for <span className="text-cyan-400 font-semibold">GSSoC 2026</span>.
          Cisco certified. Open-source contributor.
        </p>
      </FlowSection>

      {/* 02 — Skills */}
      <FlowSection
        aria-label="Technical Skills"
        style={{ backgroundColor: "#050510", color: "#ffffff" }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
          02 — Tech Stack
        </p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div>
          <h2
            className="text-[clamp(3.5rem,10vw,12rem)] font-black leading-[0.85] uppercase tracking-tight"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            My
            <br />
            <span style={{ color: "#8b5cf6" }}>Arsenal</span>
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-cyan-400">Frontend</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              React · Next.js · TypeScript · Tailwind CSS
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-purple-400">Backend</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              Python · FastAPI · Node.js · REST APIs
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-pink-400">AI / ML</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              TensorFlow · PyTorch · Scikit-learn · HuggingFace
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-400">Database</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              PostgreSQL · MongoDB · Redis · Supabase
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-400">DevOps</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              Git · Docker · Linux · Vercel · Railway
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-cyan-400">Certified</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              Cisco Networking · Cybersecurity Essentials · Python
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 03 — Projects */}
      <FlowSection
        aria-label="Projects"
        style={{ backgroundColor: "#030308", color: "#ffffff" }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-400">
          03 — Projects
        </p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div>
          <h2
            className="text-[clamp(3.5rem,10vw,12rem)] font-black leading-[0.85] uppercase tracking-tight"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            What
            <br />
            I&apos;ve
            <br />
            <span style={{ color: "#ec4899" }}>Built</span>
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-cyan-400">AI Content Generator</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              GPT-powered platform generating SEO-optimized content at scale. FastAPI + React.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-purple-400">Neural Style Transfer</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              Real-time artistic style transfer using PyTorch CNNs. GPU accelerated.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-pink-400">Sentiment Analyzer</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              BERT-based NLP pipeline for real-time social media sentiment analysis.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <p className="mt-auto max-w-[55ch] text-[clamp(1rem,2.5vw,1.5rem)] font-normal leading-relaxed text-white/60">
          10+ projects shipped. From hackathon MVPs built in 24 hours to production AI systems.
          Every line of code written with purpose.
        </p>
      </FlowSection>

      {/* 04 — Open Source Journey */}
      <FlowSection
        aria-label="Open Source Journey"
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          04 — Open Source
        </p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div>
          <h2
            className="text-[clamp(3.5rem,10vw,12rem)] font-black leading-[0.85] uppercase tracking-tight"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            GSSoC
            <br />
            <span style={{ color: "#10b981" }}>2026</span>
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-400">Selected</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              One of India&apos;s largest open-source programs. Contributing to real-world repositories.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-cyan-400">Global Collaboration</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              Working alongside developers from 50+ countries. Building in public, every day.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-purple-400">Impact</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
              PRs merged. Issues fixed. Documentation improved. Real contribution, real impact.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <p className="mt-auto max-w-[55ch] text-[clamp(1rem,2.5vw,1.5rem)] font-normal leading-relaxed text-white/60">
          Open source isn&apos;t just code — it&apos;s community. I&apos;m building my career one PR at a time.
        </p>
      </FlowSection>

      {/* 05 — Let's Connect */}
      <FlowSection
        aria-label="Let's Connect"
        style={{ backgroundColor: "#050510", color: "#ffffff" }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
          05 — Let&apos;s Connect
        </p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div>
          <h2
            className="text-[clamp(3.5rem,10vw,12rem)] font-black leading-[0.85] uppercase tracking-tight"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Ready
            <br />
            To
            <br />
            <span style={{ color: "#00f5ff" }}>Build?</span>
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <p className="mt-auto max-w-[55ch] text-[clamp(1rem,2.5vw,1.5rem)] font-normal leading-relaxed text-white/60">
          Open to internships, full-time roles, freelance projects, and open-source collaborations.
          Let&apos;s build something that matters.{" "}
          <a
            href="#contact"
            className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Reach out →
          </a>
        </p>
      </FlowSection>

    </FlowArt>
  );
}
