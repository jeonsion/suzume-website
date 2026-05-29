"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/reusable/SectionWrapper";
import PlaceholderImage from "@/components/reusable/PlaceholderImage";
import { IMAGES } from "@/lib/placeholders";

gsap.registerPlugin(ScrollTrigger);

interface Location {
  title: string;
  subtitle: string;
  image: string;
}

const locations: Location[] = [
  { title: "Kyushu", subtitle: "Where the first door appeared", image: IMAGES.locationKyushu },
  { title: "Shikoku", subtitle: "Roads bending toward the sea", image: IMAGES.locationShikoku },
  { title: "Kobe", subtitle: "Harbor lights and a running shadow", image: IMAGES.locationKobe },
  { title: "Tokyo", subtitle: "The door beneath the city", image: IMAGES.locationTokyo },
  { title: "Tohoku", subtitle: "The memory that waits at the end", image: IMAGES.locationTohoku },
];

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - container.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${track.scrollWidth - container.offsetWidth}`,
        scrub: 0.9,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <SectionWrapper id="journey" className="overflow-hidden" mood="void">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--cinema-paper)_0%,#dcecf4_18%,var(--cinema-void)_72%)]" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[var(--cinema-paper)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[var(--cinema-void)] to-transparent" />

      <div className="absolute left-6 top-8 z-20 md:left-10 lg:left-16">
        <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-[var(--cinema-ink)]/55">Act II</p>
        <h2 className="font-cinema text-5xl font-light leading-none tracking-[-0.06em] text-[var(--cinema-ink)] md:text-7xl">
          Five cities,
          <br /> one closing ritual.
        </h2>
      </div>

      <div ref={containerRef} className="relative z-10 h-screen overflow-hidden pt-28">
        <div ref={trackRef} className="flex h-full items-center gap-8 pl-[72vw] pr-[18vw] md:gap-10 md:pl-[54vw]">
          {locations.map((loc, i) => (
            <article key={loc.title} className="group flex-shrink-0 w-[72vw] md:w-[44vw] lg:w-[34vw]">
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/14 bg-white/[0.04] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-700 group-hover:-translate-y-3 group-hover:border-[var(--cinema-gold)]/45">
                <PlaceholderImage
                  src={loc.image}
                  alt={loc.title}
                  width={760}
                  height={520}
                  overlay="heavy"
                  rounded
                  className="aspect-[4/3] w-full"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-b-[1.7rem] bg-gradient-to-t from-black/90 via-black/45 to-transparent p-6 pt-20">
                  <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-[var(--cinema-gold)]">
                    <span>{(i + 1).toString().padStart(2, "0")}</span>
                    <span className="h-px w-10 bg-[var(--cinema-gold)]/60" />
                    <span>Location</span>
                  </div>
                  <h3 className="font-cinema text-5xl font-light tracking-[-0.05em] text-[var(--cinema-paper)] md:text-6xl">
                    {loc.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--cinema-paper)]/62">{loc.subtitle}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
