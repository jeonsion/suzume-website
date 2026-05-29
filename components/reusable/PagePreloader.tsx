"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";

const HERO_URLS = ["/videos/hero.webm", "/videos/hero.mp4"];
const INTRO_URL = "/videos/suzume-hero-video.mp4";

async function fetchWithProgress(
  url: string,
  onProgress: (loaded: number, total: number) => void,
): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  const contentLength = +(response.headers.get("Content-Length") || 0);
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("ReadableStream not supported");
  }

  let received = 0;
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      received += value.length;
      onProgress(received, contentLength || received);
    }
  }

  return new Blob(chunks as unknown as BlobPart[]);
}

async function fetchHero(
  onProgress: (loaded: number, total: number) => void,
): Promise<Blob> {
  for (const url of HERO_URLS) {
    try {
      return await fetchWithProgress(url, onProgress);
    } catch {
      // try next fallback
    }
  }
  throw new Error("All hero video sources failed");
}

export default function PagePreloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const setHeroBlobUrl = useStore((s) => s.setHeroBlobUrl);
  const setIntroBlobUrl = useStore((s) => s.setIntroBlobUrl);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      let heroLoaded = 0;
      let heroTotal = 1;
      let introLoaded = 0;
      let introTotal = 1;

      const updateProgress = () => {
        const heroP = heroTotal > 0 ? heroLoaded / heroTotal : 0;
        const introP = introTotal > 0 ? introLoaded / introTotal : 0;
        const totalP = Math.min(100, Math.round(((heroP + introP) / 2) * 100));
        if (!cancelled) setProgress(totalP);
      };

      const heroPromise = fetchHero((loaded, total) => {
        heroLoaded = loaded;
        heroTotal = total || 1;
        updateProgress();
      });

      const introPromise = fetchWithProgress(INTRO_URL, (loaded, total) => {
        introLoaded = loaded;
        introTotal = total || 1;
        updateProgress();
      });

      try {
        const [heroBlob, introBlob] = await Promise.all([heroPromise, introPromise]);
        if (cancelled) return;

        const heroUrl = URL.createObjectURL(heroBlob);
        const introUrl = URL.createObjectURL(introBlob);

        setHeroBlobUrl(heroUrl);
        setIntroBlobUrl(introUrl);
        setProgress(100);
        setDone(true);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Preloader failed:", err);
        // Graceful fallback: still show content with original URLs
        setDone(true);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [setHeroBlobUrl, setIntroBlobUrl]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--cinema-void)]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-cinema text-[15vw] font-light leading-none tracking-[-0.08em] text-white md:text-[10vw] lg:text-[8vw]"
          >
            Suzume
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 w-[72vw] max-w-md"
          >
            <div className="flex justify-between text-[11px] uppercase tracking-[0.28em] text-white/60">
              <span>Loading experience</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-[var(--cinema-gold)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
