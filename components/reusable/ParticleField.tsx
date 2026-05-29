"use client";

import { useEffect, useRef, useMemo } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  count?: number;
  className?: string;
  color?: string;
  speed?: number;
}

export default function ParticleField({
  count = 60,
  className = "",
  color = "255, 255, 255",
  speed = 0.3,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particles = useMemo(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * speed,
        vy: -(Math.random() * speed + 0.1),
        opacity: Math.random() * 0.6 + 0.1,
        life: Math.random() * 300,
        maxLife: 200 + Math.random() * 300,
      });
    }
    return arr;
  }, [count, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particlesCopy = particles.map((p) => ({ ...p }));

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesCopy) {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        let alpha = p.opacity;
        if (p.life > p.maxLife * 0.7) {
          alpha = p.opacity * (1 - (p.life - p.maxLife * 0.7) / (p.maxLife * 0.3));
        }

        if (p.life >= p.maxLife) {
          p.x = Math.random() * 100;
          p.y = 105;
          p.life = 0;
          p.maxLife = 200 + Math.random() * 300;
        }

        const px = (p.x / 100) * canvas.width;
        const py = (p.y / 100) * canvas.height;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [particles, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
