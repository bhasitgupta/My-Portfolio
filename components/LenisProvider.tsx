"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Cinematic duration — feels premium
      duration: 1.4,

      // Ultra smooth easing (quartic out) — feels like Apple.com
      easing: (t: number) => 1 - Math.pow(1 - t, 4),

      // Smooth wheel
      smoothWheel: true,

      // Speed multipliers
      wheelMultiplier: 0.9,     // slightly slower = smoother feeling
      touchMultiplier: 1.5,

      infinite: false,
    });

    // Sync Lenis scroll position into GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker (perfect frame sync at any Hz)
    const rafFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafFn);
    };
  }, []);

  return <>{children}</>;
}
