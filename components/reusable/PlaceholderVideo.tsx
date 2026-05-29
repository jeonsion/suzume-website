"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d14] via-[#1a1a2e]/80 to-[#0d0d14]" />

      {!hasError && (
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity }}
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
          onError={() => setHasError(true)}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </motion.video>
      )}
    </div>
  );
}
