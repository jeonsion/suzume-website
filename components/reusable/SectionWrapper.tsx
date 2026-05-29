"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  mood?: "void" | "ink" | "paper" | "blue" | "transparent";
}

const moodBg: Record<NonNullable<SectionWrapperProps["mood"]>, string> = {
  void: "bg-[var(--cinema-void)] text-[var(--cinema-paper)]",
  ink: "bg-[var(--cinema-ink)] text-[var(--cinema-paper)]",
  paper: "bg-[var(--cinema-paper)] text-[var(--cinema-ink)]",
  blue: "bg-[var(--cinema-blue)] text-[var(--cinema-paper)]",
  transparent: "bg-transparent text-[var(--cinema-paper)]",
};

export default function SectionWrapper({
  id,
  children,
  className = "",
  mood = "void",
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0.72, 1, 1, 0.86]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity }}
      className={`relative min-h-screen w-full overflow-hidden ${moodBg[mood]} ${className}`}
    >
      {children}
    </motion.section>
  );
}
