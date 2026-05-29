"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";

interface HeroVideoProps {
  /** MP4 source (Safari fallback) */
  src: string;
  /** WebM source (preferred, smaller) */
  webmSrc?: string;
  className?: string;
  opacity?: number;
}

export default function HeroVideo({
  src,
  webmSrc,
  className = "",
  opacity = 1,
}: HeroVideoProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const heroBlobUrl = useStore((s) => s.heroBlobUrl);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d14] via-[#1a1a2e]/80 to-[#0d0d14]" />

      {/* Loading spinner */}
      <AnimatePresence>
        {!loaded && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[var(--cinema-gold)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {!hasError && (
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: loaded ? opacity : 0 }}
          initial={{ scale: 1.04 }}
          animate={{ scale: loaded ? 1 : 1.04 }}
          transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
          onError={() => setHasError(true)}
          onLoadedData={() => setLoaded(true)}
        >
          {heroBlobUrl ? (
            <source src={heroBlobUrl} type="video/webm" />
          ) : (
            <>
              {webmSrc && <source src={webmSrc} type="video/webm" />}
              <source src={src} type="video/mp4" />
            </>
          )}
        </motion.video>
      )}
    </div>
  );
}
