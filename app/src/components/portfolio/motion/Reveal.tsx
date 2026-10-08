import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale";

const OFFSETS: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: -64 },
  right: { x: 64 },
  scale: { scale: 0.85 },
};

type RevealProps = HTMLMotionProps<"div"> & { direction?: Direction; delay?: number; duration?: number };

/** Fades and slides its content in when it scrolls into view. */
export const Reveal = ({ direction = "up", delay = 0, duration = 0.8, children, ...props }: RevealProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
