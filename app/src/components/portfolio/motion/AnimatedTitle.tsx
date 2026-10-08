import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROFILE } from "@/data/portfolio";

type LettersProps = { text: string; className?: string; delay: number; step?: number };

/** Letters spring up one after another. */
const Letters = ({ text, className, delay, step = 0.04 }: LettersProps) => {
  const reduce = useReducedMotion();
  let index = 0;

  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          {wordIndex > 0 && " "}
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                initial={reduce ? false : { opacity: 0, y: 60, rotate: 6 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 14, delay: delay + index++ * step }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
};

export const AnimatedTitle = ({ delay = 0 }: { delay?: number }) => (
  <h1 className="leading-[1.05]">
    <Letters
      text={PROFILE.name}
      delay={delay}
      className="block text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
    />
    <Letters
      text="A curious mind. A thoughtful"
      delay={delay + 0.5}
      step={0.02}
      className="mt-4 block text-2xl font-light sm:text-4xl"
    />
    <span className="relative mt-1 inline-block">
      <Letters
        text="developer."
        delay={delay + 1}
        className="block text-5xl font-extrabold tracking-tight text-primary sm:text-7xl lg:text-8xl"
      />
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-1 left-0 h-1.5 w-full origin-left rounded-full bg-primary/40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 1.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  </h1>
);
