"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/reusable/SectionWrapper";
import PlaceholderImage from "@/components/reusable/PlaceholderImage";
import FadeIn from "@/components/reusable/FadeIn";
import ParallaxLayer from "@/components/reusable/ParallaxLayer";
import ParticleField from "@/components/reusable/ParticleField";
import { IMAGES } from "@/lib/placeholders";

const ruins = [
  {
    title: "The School",
    kicker: "Abandoned classroom",
    text: "Chalk dust, empty desks, and a door that remembers every child who ever passed through.",
    image: IMAGES.ruinsSchool,
  },
  {
    title: "The Park",
    kicker: "A rusted orbit",
    text: "The music stopped decades ago, but the echo of laughter still circles the Ferris wheel.",
    image: IMAGES.ruinsPark,
  },
  {
    title: "The Gate",
    kicker: "Threshold of memory",
    text: "Every ruin holds a story waiting to be released, if someone is brave enough to close it.",
    image: IMAGES.ruinsGate,
  },
];

export default function RuinsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.55]);

  return (
    <SectionWrapper id="ruins" mood="void" className="py-24 md:py-32">
      <motion.div
        ref={ref}
        style={{ opacity: atmosphereOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(141,200,232,0.14),transparent_34rem),radial-gradient(circle_at_20%_80%,rgba(238,143,88,0.1),transparent_30rem)]"
      />
      <ParticleField count={55} color="245, 239, 228" speed={0.06} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="lg:sticky lg:top-20 lg:h-fit">
            <motion.div style={{ y: titleY }}>
              <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[var(--cinema-gold)]">Worldbuilding</p>
              <h2 className="font-cinema text-6xl font-light leading-[0.82] tracking-[-0.075em] text-[var(--cinema-paper)] md:text-8xl lg:text-9xl">
                Places that refuse to be forgotten.
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-7 text-[var(--cinema-paper)]/58">
                Each location is designed like a wounded memory: beautiful, empty, and almost alive.
              </p>
            </motion.div>
          </aside>

          <div className="space-y-10 md:space-y-16">
            {ruins.map((ruin, index) => (
              <FadeIn key={ruin.title} direction={index % 2 === 0 ? "left" : "right"}>
                <article className="group grid gap-6 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl md:grid-cols-[0.95fr_1.05fr] md:p-5">
                  <ParallaxLayer speed={0.12} className={index % 2 === 1 ? "md:order-2" : ""}>
                    <PlaceholderImage
                      src={ruin.image}
                      alt={ruin.title}
                      width={900}
                      height={640}
                      overlay="heavy"
                      rounded
                      className="aspect-[4/3] w-full transition duration-700 group-hover:scale-[1.015]"
                    />
                  </ParallaxLayer>

                  <div className="flex flex-col justify-end p-4 md:p-8">
                    <div className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-[var(--cinema-gold)]">
                      <span>{(index + 1).toString().padStart(2, "0")}</span>
                      <span className="h-px w-12 bg-[var(--cinema-gold)]/50" />
                      <span>{ruin.kicker}</span>
                    </div>
                    <h3 className="font-cinema text-5xl font-light tracking-[-0.055em] text-[var(--cinema-paper)] md:text-7xl">
                      {ruin.title}
                    </h3>
                    <p className="mt-6 max-w-md text-sm leading-7 text-[var(--cinema-paper)]/62 md:text-base">
                      {ruin.text}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
