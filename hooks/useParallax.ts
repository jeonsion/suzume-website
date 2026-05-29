"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseParallaxOptions {
  speed?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

export function useParallax<T extends HTMLElement>({
  speed = 0.5,
  start = "top bottom",
  end = "bottom top",
  scrub = true,
  markers = false,
}: UseParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.fromTo(
      el,
      { y: () => speed * 100 },
      {
        y: () => -speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          markers,
        },
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getById(el.dataset.parallaxId || "")?.kill();
    };
  }, [speed, start, end, scrub, markers]);

  return ref;
}
