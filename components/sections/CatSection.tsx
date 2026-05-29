"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/reusable/SectionWrapper";
import PlaceholderImage from "@/components/reusable/PlaceholderImage";
import FadeIn from "@/components/reusable/FadeIn";
import ParallaxLayer from "@/components/reusable/ParallaxLayer";
import { IMAGES } from "@/lib/placeholders";

export default function CatSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const posterY = useTransform(scrollYProgress, [0, 1], [90, -80]);
  const washX = useTransform(scrollYProgress, [0, 1], ["-10%", "8%"]);

  return (
    <SectionWrapper id="cat" mood="paper" className="py-24 md:py-32">
      <motion.div
        ref={ref}
        style={{ x: washX }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(141,200,232,0.35),transparent_28rem),radial-gradient(circle_at_15%_80%,rgba(211,170,87,0.22),transparent_24rem)]"
      />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#06070a_1px,transparent_1px),linear-gradient(#06070a_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <FadeIn>
              <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[var(--cinema-flame)]">The trickster</p>
              <h2 className="font-cinema text-balance text-6xl font-light leading-[0.86] tracking-[-0.065em] text-[var(--cinema-ink)] md:text-8xl lg:text-9xl">
                Follow the cat. Lose the map.
              </h2>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-10 max-w-2xl columns-1 gap-10 text-base leading-8 text-[var(--cinema-ink)]/68 md:columns-2">
                <p>
                  It appears without warning — a calico blur on rooftops, train platforms, and narrow roads by the sea.
                </p>
                <p className="mt-6 md:mt-0">
                  It never explains itself. Its presence is the question. The entire journey begins by choosing to follow.
                </p>
              </div>
            </FadeIn>
          </div>

          <motion.div style={{ y: posterY }} className="relative">
            <div className="absolute -inset-8 rotate-3 rounded-[3rem] bg-[var(--cinema-sky)]/25 blur-2xl" />
            <div className="cinema-card relative rounded-[3rem] border-black/10 bg-[var(--cinema-ink)] p-4 shadow-2xl md:p-5">
              <ParallaxLayer speed={0.18}>
                <PlaceholderImage
                  src={IMAGES.cat}
                  alt="Mysterious cat"
                  width={720}
                  height={920}
                  overlay="subtle"
                  rounded
                  className="aspect-[4/5] w-full"
                />
              </ParallaxLayer>
              <div className="mt-4 flex items-center justify-between px-2 pb-1 text-[10px] uppercase tracking-[0.24em] text-[var(--cinema-paper)]/55">
                <span>Daijin</span>
                <span>Messenger</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
