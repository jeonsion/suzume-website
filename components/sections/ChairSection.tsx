"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/reusable/FadeIn";

const scenes = [
  {
    id: 1,
    video: "/videos/suzume-1-1.mp4",
    title: "The Door Opens",
    description: "A single rusted door stands in the ruins of a warm-springs town, exhaling something old and hungry.",
  },
  {
    id: 2,
    video: "/videos/suzume-2-1.mp4",
    title: "Follow the Cat",
    description: "Daijin appears — small, cryptic, leading them from Kyushu toward doors that should stay shut.",
  },
  {
    id: 3,
    video: "/videos/suzume-3-1.mp4",
    title: "School at Dusk",
    description: "An abandoned campus at twilight. The keystone shifts. The worm rises behind the door.",
  },
  {
    id: 4,
    video: "/videos/suzume-4-1.mp4",
    title: "Kobe by Night",
    description: "Amusement-park lights blur in the rain. Another door. Another tremor beneath the city.",
  },
  {
    id: 5,
    video: "/videos/suzume-5-1.mp4",
    title: "The Last Key",
    description: "Tokyo holds the largest gate. What sleeps behind it threatens everything she has left.",
  },
  {
    id: 6,
    video: "/videos/suzume-6-1.mp4",
    title: "Tohoku Remembers",
    description: "The frozen pasture where time stopped. Here, grief and love share the same address.",
  },
  {
    id: 7,
    video: "/videos/suzume-7-1.mp4",
    title: "Closing the Wound",
    description: "The final latch. The choice to live. Morning light across a door that will never open again.",
  },
];

const CARD_WIDTH = 380;
const CARD_GAP = 20;

function VideoCard({
  video,
  title,
  description,
}: {
  video: string;
  title: string;
  description: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isVisible) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isVisible]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 select-none"
      style={{ width: CARD_WIDTH }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-black/40">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ willChange: "transform" }}
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="mt-5">
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--cinema-gold)]">
          Scene {String(scenes.findIndex((s) => s.title === title) + 1).padStart(2, "0")}
        </p>
        <h3 className="font-cinema text-xl font-light tracking-[-0.02em] text-[var(--cinema-paper)]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--cinema-paper)]/55">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function ChairSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chair"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/suzume_door_night.png"
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--cinema-void)]/80 via-[var(--cinema-void)]/40 to-[var(--cinema-void)]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,var(--cinema-void)_90%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 pt-24 pb-16 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mx-auto w-full max-w-7xl">
          <FadeIn>
            <div className="mb-6 h-px w-24 bg-[var(--cinema-gold)]" />
            <p className="mb-4 text-xs uppercase tracking-[0.34em] text-[var(--cinema-gold)]">
              Seven Scenes
            </p>
            <h2 className="font-cinema text-balance text-5xl font-light leading-[0.88] tracking-[-0.055em] text-[var(--cinema-paper)] md:text-7xl lg:text-8xl">
              Every Door
              <br />
              Has a Memory
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-md text-base leading-7 text-[var(--cinema-paper)]/55">
              Scroll to travel through the moments that shaped the journey — each
              threshold crossed, each worm sealed, each life touched.
            </p>
          </FadeIn>
        </div>

        {/* Video slider — scroll-driven horizontal */}
        <div className="relative mt-16 -mx-6 md:-mx-10 lg:-mx-16">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[var(--cinema-void)] to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[var(--cinema-void)] to-transparent md:w-20" />

          <div ref={trackRef} className="flex gap-5 px-6 pb-4 md:px-10 lg:px-16">
            {scenes.map((scene) => (
              <VideoCard key={scene.id} {...scene} />
            ))}
          </div>

          {/* Scroll hint */}
          <FadeIn delay={0.4}>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--cinema-muted)]/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <span>Scroll to explore</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
