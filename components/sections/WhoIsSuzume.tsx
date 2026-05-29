"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/reusable/SectionWrapper";

interface WhoIsSuzumeProps {
  sharedBackdrop?: boolean;
}

type ParagraphStyle = CSSProperties & {
  "--paragraph-progress": MotionValue<number>;
  "--word-total": number;
};

type WordStyle = CSSProperties & {
  "--word-index": number;
};

const leftParagraphs = [
  "Suzume Iwato is a seventeen-year-old student from Miyazaki, Kyushu.",
  "She lives with her aunt and moves through ordinary school days with a quiet sense of responsibility.",
  "Her life feels familiar at first, but there is a restlessness in her that keeps pulling her toward the unknown.",
];

const rightParagraphs = [
  "Suzume is curious, impulsive, and brave in the small moments before bravery has a name.",
  "She follows what she cannot fully explain and chooses to act before anyone gives her permission.",
  "Her journey is shaped by memory, loss, and the decision to close the door herself.",
];

function ProseParagraph({
  paragraph,
  progress,
  order,
}: {
  paragraph: string;
  progress: MotionValue<number>;
  order: number;
}) {
  const paragraphProgress = useTransform(
    progress,
    [0.02 + order * 0.11, 0.26 + order * 0.11],
    [0, 1],
  );

  const words = paragraph.split(" ");

  return (
    <motion.p
      aria-label={paragraph}
      style={
        {
          "--paragraph-progress": paragraphProgress,
          "--word-total": words.length,
        } as ParagraphStyle
      }
      className="profile-prose-reveal font-cinema text-[clamp(1.35rem,2.1vw,2.75rem)] font-light leading-[1.16] tracking-[-0.035em] [text-wrap:pretty] [text-shadow:0_8px_32px_rgba(18,77,112,0.35)]"
    >
      {words.map((word, wordIndex) => {
        const isFirstWord = wordIndex === 0;
        const firstLetter = word.slice(0, 1);
        const rest = word.slice(1);

        return (
          <span key={`${word}-${wordIndex}`} aria-hidden="true">
            <span
              className="profile-prose-word"
              style={{ "--word-index": wordIndex } as WordStyle}
            >
              {isFirstWord ? (
                <>
                  <span className="profile-prose-initial">{firstLetter}</span>
                  {rest}
                </>
              ) : (
                word
              )}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </motion.p>
  );
}

function ProseColumn({
  eyebrow,
  paragraphs,
  side,
  progress,
  offset,
}: {
  eyebrow: string;
  paragraphs: string[];
  side: "left" | "right";
  progress: MotionValue<number>;
  offset: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -28 : 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-18%" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`relative max-w-[29rem] ${side === "right" ? "md:justify-self-end md:text-right" : "md:text-left"}`}
    >
      <p className="mb-9 text-[0.68rem] font-semibold uppercase tracking-[0.44em] text-[#ffe08b]/88 [text-shadow:0_2px_18px_rgba(20,75,110,0.52)]">
        {eyebrow}
      </p>

      <div className="space-y-10">
        {paragraphs.map((paragraph, index) => (
          <ProseParagraph
            key={paragraph}
            paragraph={paragraph}
            progress={progress}
            order={index + offset}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function WhoIsSuzume({ sharedBackdrop = false }: WhoIsSuzumeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 34%"],
  });

  const textProgress = useTransform(scrollYProgress, [0, 0.42, 1], [0, 1, 1]);
  const leftY = useTransform(textProgress, [0, 1], [42, -18]);
  const rightY = useTransform(textProgress, [0, 1], [-30, 18]);
  const titleY = useTransform(textProgress, [0, 1], [22, -12]);
  const washOpacity = useTransform(textProgress, [0, 0.7, 1], [0.14, 0.38, 0.32]);
  const lineScale = useTransform(textProgress, [0.08, 0.68], [0.08, 1]);

  return (
    <SectionWrapper
      id="who-is-suzume"
      mood={sharedBackdrop ? "transparent" : "void"}
      className="min-h-[650vh]"
    >
      <div ref={ref} className="absolute inset-0" />
      {!sharedBackdrop && (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#dff6ff_0%,#f8efd5_48%,#bdeaff_100%)]" />
      )}

      <motion.div
        style={{ opacity: washOpacity }}
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(24,104,145,0.17)_44%,rgba(10,53,83,0.46)_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-white/18 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-t from-[#6cc9e8]/24 to-transparent" />

      <div className="sticky top-0 z-20 mx-auto grid min-h-screen w-full max-w-[92rem] grid-cols-1 content-center gap-12 px-6 py-20 md:grid-cols-[minmax(0,1fr)_minmax(15rem,22vw)_minmax(0,1fr)] md:gap-10 md:px-10 lg:px-16">
        <motion.div style={{ y: leftY }} className="md:col-start-1 md:self-center">
          <ProseColumn
            eyebrow="Origin"
            paragraphs={leftParagraphs}
            side="left"
            progress={textProgress}
            offset={0}
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ y: titleY }}
          className="pointer-events-none order-first flex min-h-44 flex-col items-center justify-center text-center md:order-none md:col-start-2 md:min-h-[34rem]"
        >
          <motion.div
            style={{ scaleY: lineScale }}
            className="hidden h-36 w-px origin-top bg-gradient-to-b from-transparent via-white/55 to-transparent md:block"
          />
          <p className="mt-6 text-[0.65rem] font-semibold uppercase tracking-[0.48em] text-white/74 [text-shadow:0_2px_18px_rgba(20,75,110,0.42)]">
            Character Study
          </p>
          <h2 className="font-cinema mt-3 text-[clamp(4rem,8vw,9rem)] font-light leading-[0.72] tracking-[-0.08em] text-white/95 [text-shadow:0_8px_44px_rgba(18,77,112,0.46)]">
            Suzume
          </h2>
          <p className="mt-5 max-w-[15rem] text-xs uppercase leading-relaxed tracking-[0.28em] text-white/70 [text-wrap:balance]">
            Motion, memory, and choice.
          </p>
        </motion.div>

        <motion.div style={{ y: rightY }} className="md:col-start-3 md:self-center">
          <ProseColumn
            eyebrow="Character"
            paragraphs={rightParagraphs}
            side="right"
            progress={textProgress}
            offset={0}
          />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
