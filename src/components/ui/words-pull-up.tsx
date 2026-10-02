import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WordsPullUp({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={reduced ? false : { y: 28, opacity: 0 }}
            animate={reduced || isInView ? { y: 0, opacity: 1 } : {}}
            transition={reduced ? { duration: 0 } : { duration: 0.6, delay: i * 0.08, ease: EASE }}
            className={isLast ? "pull-word inline-block" : "pull-word pull-gap inline-block"}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}
