"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/reusable/SectionWrapper";
import FadeIn from "@/components/reusable/FadeIn";
import ParticleField from "@/components/reusable/ParticleField";

export default function FinalScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.9, 1, 1.08]);
  const glowY = useTransform(scrollYProgress, [0, 1], [120, -140]);

  return (
    <SectionWrapper id="final" className="flex min-h-screen items-center justify-center py-24" mood="paper">
      <motion.div
        ref={ref}
        style={{ y: glowY }}
        className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cinema-sky)]/22 blur-4xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(211,170,87,0.18),transparent_30rem)]" />
      <ParticleField count={34} color="12, 17, 24" speed={0.05} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center md:px-10">
        <FadeIn>
          <p className="mb-8 text-xs uppercase tracking-[0.36em] text-[var(--cinema-flame)]">The final frame</p>
        </FadeIn>

        <motion.h2
          style={{ scale: titleScale }}
          className="font-cinema text-balance text-6xl font-light leading-[0.82] tracking-[-0.08em] text-[var(--cinema-ink)] md:text-8xl lg:text-[10rem]"
        >
          Close the door.
          <br /> Keep the light.
        </motion.h2>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-base leading-8 text-[var(--cinema-ink)]/62 md:text-lg">
            A landing page should feel like a trailer: enough atmosphere to pull you in, enough restraint to make you scroll.
          </p>
        </FadeIn>

        <FadeIn delay={0.32}>
          <div className="mx-auto mt-12 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#opening"
              className="rounded-full bg-[var(--cinema-ink)] px-7 py-4 text-[11px] uppercase tracking-[0.2em] text-[var(--cinema-paper)] transition hover:bg-[var(--cinema-gold)] hover:text-[var(--cinema-void)]"
            >
              Replay opening
            </a>
            <a
              href="#journey"
              className="rounded-full border border-[var(--cinema-ink)]/15 px-7 py-4 text-[11px] uppercase tracking-[0.2em] text-[var(--cinema-ink)] transition hover:border-[var(--cinema-flame)] hover:text-[var(--cinema-flame)]"
            >
              View journey
            </a>
          </div>
        </FadeIn>

        <div className="mt-20 border-t border-[var(--cinema-ink)]/10 pt-8 text-[10px] uppercase tracking-[0.32em] text-[var(--cinema-ink)]/38">
          Suzume — cinematic web concept
        </div>
      </div>
    </SectionWrapper>
  );
}
