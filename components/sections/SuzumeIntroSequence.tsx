"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useStore } from "@/store/useStore";
import OpeningScene from "@/components/sections/OpeningScene";
import WhoIsSuzume from "@/components/sections/WhoIsSuzume";

const INTRO_VIDEO_SRC = "/videos/suzume-hero-video.mp4";

export default function SuzumeIntroSequence() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const latestProgressRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const syncVideoToScroll = useCallback((progress: number) => {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    const targetTime = Math.min(video.duration - 0.05, Math.max(0, video.duration * progress));

    if (Math.abs(video.currentTime - targetTime) < 0.035) {
      return;
    }

    try {
      video.currentTime = targetTime;
    } catch {
      // Browsers can reject early seeks before enough metadata is buffered.
      // The next scroll tick or loadedmetadata event will retry with the same progress.
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    latestProgressRef.current = progress;

    if (shouldReduceMotion) {
      return;
    }

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      syncVideoToScroll(progress);
      frameRef.current = null;
    });
  });

  return (
    <section ref={containerRef} className="relative bg-[var(--cinema-void)]">
      <div className="sticky top-0 z-0 h-screen overflow-hidden bg-[#92d9ff]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#9fe1ff] via-[#d4f2ff] to-[#fff0ce]" />
        <motion.video
          ref={videoRef}
          src={useStore((s) => s.introBlobUrl) || INTRO_VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-100 [filter:saturate(1.22)_brightness(1.12)_contrast(0.96)]"
          initial={{ scale: 1.035 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
          onLoadedMetadata={() => syncVideoToScroll(latestProgressRef.current)}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.16)_0%,transparent_34%,rgba(120,190,230,0.16)_100%)]" />
        <div className="absolute inset-0 opacity-55 mix-blend-screen [background:linear-gradient(118deg,transparent_0%,rgba(255,255,255,0.34)_31%,transparent_43%,rgba(169,229,255,0.26)_57%,transparent_72%)]" />
        <div className="absolute left-1/2 top-1/2 h-[72vh] w-[42vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/12 blur-4xl" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/22 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-t from-[#f8f0df]/38 to-transparent" />
      </div>

      <div className="relative z-10 -mt-[100vh]">
        <OpeningScene sharedBackdrop />
        <WhoIsSuzume sharedBackdrop />
      </div>
    </section>
  );
}
