"use client";

import { motion } from "framer-motion";

interface DoorProps {
  open?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-16 h-28",
  md: "w-24 h-40",
  lg: "w-32 h-56",
};

export default function Door({ open = false, className = "", size = "md" }: DoorProps) {
  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      {/* Door frame */}
      <div className="absolute inset-0 border-2 border-[#8B6914]/60 rounded-t-sm pointer-events-none" />
      {/* Left door */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-[#8B6914]/20 border-r border-[#8B6914]/30 origin-left"
        animate={{ rotateY: open ? -50 : 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ backfaceVisibility: "hidden" }}
      />
      {/* Right door */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-[#8B6914]/20 border-l border-[#8B6914]/30 origin-right"
        animate={{ rotateY: open ? 50 : 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ backfaceVisibility: "hidden" }}
      />
      {/* Light from beyond */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#E8885A]/40 via-[#7CB7D9]/20 to-transparent pointer-events-none"
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
    </div>
  );
}
