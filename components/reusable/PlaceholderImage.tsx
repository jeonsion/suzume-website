"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  overlay?: "none" | "subtle" | "heavy";
  rounded?: boolean;
}

const overlayMap = {
  none: "",
  subtle: "after:absolute after:inset-0 after:bg-black/10 after:pointer-events-none",
  heavy: "after:absolute after:inset-0 after:bg-black/30 after:pointer-events-none",
};

export default function PlaceholderImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  overlay = "subtle",
  rounded = false,
}: PlaceholderImageProps) {
  const isVector = src.endsWith(".svg");

  return (
    <motion.div
      className={`relative overflow-hidden ${overlayMap[overlay]} ${rounded ? "rounded-2xl" : ""} ${className}`}
      initial={{ opacity: 0, scale: 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {isVector ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover"
        />
      )}
    </motion.div>
  );
}
