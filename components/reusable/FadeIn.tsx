"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const directionMap = {
  up: { from: { y: 40, opacity: 0 }, to: { y: 0, opacity: 1 } },
  down: { from: { y: -40, opacity: 0 }, to: { y: 0, opacity: 1 } },
  left: { from: { x: -40, opacity: 0 }, to: { x: 0, opacity: 1 } },
  right: { from: { x: 40, opacity: 0 }, to: { x: 0, opacity: 1 } },
};

export default function FadeIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 1,
  once = true,
}: FadeInProps) {
  const { from, to } = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={to}
      viewport={{ once, margin: "-5%" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
