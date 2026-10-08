import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PROFILE } from "@/data/portfolio";

const STORAGE_KEY = "intro-seen";
const DURATION_MS = 2300;

/** Seconds the hero should wait before animating (0 once the splash was already shown). */
export const getIntroDelay = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1" ? 0 : 1.9;
  } catch {
    return 1.9;
  }
};

/** Full-screen opening animation, shown once per browser session. */
export const IntroSplash = () => {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(() => getIntroDelay() > 0);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }, DURATION_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-primary text-primary-foreground"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.span
            className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary-foreground text-4xl font-extrabold text-primary shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
          >
            {PROFILE.initials}
          </motion.span>
          <div className="flex overflow-hidden text-2xl font-semibold tracking-wide" aria-label={PROFILE.name}>
            {Array.from(PROFILE.name).map((char, index) => (
              <motion.span
                key={index}
                aria-hidden="true"
                className="inline-block"
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="h-1 w-40 origin-left rounded-full bg-primary-foreground/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1.4, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
