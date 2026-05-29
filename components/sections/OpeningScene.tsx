"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroVideo from "@/components/reusable/PlaceholderVideo";

interface OpeningSceneProps {
  sharedBackdrop?: boolean;
}

export default function OpeningScene({ sharedBackdrop = false }: OpeningSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.8, 0]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const scrollToStory = () => {
    const target = document.getElementById("who-is-suzume");

    if (!target) {
      return;
    }

    const start = window.scrollY;
    const end = target.offsetTop;
    const distance = end - start;
    const duration = 3000;
    const startTime = performance.now();

    const twoStepProgress = (elapsed: number) => {
      if (elapsed < 0.5) {
        return elapsed;
      }

      return 0.5 + (elapsed - 0.5);
    };

    const step = (now: number) => {
      const elapsed = Math.min(1, (now - startTime) / duration);
      const progress = twoStepProgress(elapsed);
      window.scrollTo(0, start + distance * progress);

      if (elapsed < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section
      ref={containerRef}
      id="opening"
      className={`relative h-screen w-full overflow-hidden ${
        sharedBackdrop ? "bg-transparent" : "bg-[var(--cinema-void)]"
      }`}
    >
      {!sharedBackdrop && (
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <HeroVideo src="/videos/hero.mp4" webmSrc="/videos/hero.webm" opacity={1} />
        </motion.div>
      )}

      {!sharedBackdrop && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(6,7,10,0.1)_34%,rgba(6,7,10,0.82)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-[var(--cinema-void)] via-[var(--cinema-void)]/65 to-transparent" />
        </>
      )}

      <motion.header
        style={{ opacity: navOpacity }}
        className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 text-[11px] uppercase tracking-[0.28em] text-white/88 [text-shadow:0_1px_18px_rgba(28,72,104,0.55)] md:px-10"
      >
        <span>Suzume</span>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#who-is-suzume" className="transition hover:text-[var(--cinema-gold)]">Story</a>
          <a href="#journey" className="transition hover:text-[var(--cinema-gold)]">Journey</a>
          <a href="#ruins" className="transition hover:text-[var(--cinema-gold)]">World</a>
        </nav>
      </motion.header>

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="absolute inset-x-0 bottom-0 z-10 px-6 pb-12 md:px-10 md:pb-16 lg:px-16"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-5 text-xs uppercase tracking-[0.42em] text-[#ffe08b] [text-shadow:0_2px_18px_rgba(20,75,110,0.62)]"
          >
            A door opens. The sky remembers.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-cinema text-[18vw] font-light leading-[0.72] tracking-[-0.08em] text-white [text-shadow:0_6px_44px_rgba(18,77,112,0.5)] md:text-[15vw] lg:text-[12vw]"
          >
            Suzume
          </motion.h1>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={scrollToStory}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="group absolute bottom-8 right-6 z-30 inline-flex min-h-14 items-center gap-4 rounded-full border border-white/70 bg-white/92 py-2 pl-6 pr-2 text-[#102b40] shadow-[0_18px_54px_rgba(20,75,110,0.26),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl transition-colors duration-300 hover:border-[#102b40]/10 hover:bg-[#102b40] hover:text-white md:bottom-12 md:right-10 lg:right-16"
        aria-label="Play introduction and scroll to the story section"
      >
        <span className="font-cinema text-[1.18rem] font-medium uppercase leading-none tracking-[0.16em]">
          Play
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#102b40] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#102b40]">
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </motion.button>

    </section>
  );
}
