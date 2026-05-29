"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/hooks/useLenis";
import { useStore } from "@/store/useStore";
import PagePreloader from "@/components/reusable/PagePreloader";
import SuzumeIntroSequence from "@/components/sections/SuzumeIntroSequence";
import ChairSection from "@/components/sections/ChairSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useLenis();
  const heroBlobUrl = useStore((s) => s.heroBlobUrl);
  const introBlobUrl = useStore((s) => s.introBlobUrl);

  return (
    <>
      {(!heroBlobUrl || !introBlobUrl) && <PagePreloader />}
      <main className="relative bg-[var(--cinema-void)]">
        <SuzumeIntroSequence />
        <ChairSection />
      </main>
    </>
  );
}
