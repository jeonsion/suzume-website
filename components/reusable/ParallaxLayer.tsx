"use client";

import { useParallax } from "@/hooks/useParallax";
import type { ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
}: ParallaxLayerProps) {
  const ref = useParallax<HTMLDivElement>({ speed });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
