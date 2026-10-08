import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const SIZE = 420;

/** Soft pink light that follows the mouse (desktop only). */
export const CursorGlow = () => {
  const reduce = useReducedMotion();
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const sx = useSpring(x, { stiffness: 120, damping: 22 });
  const sy = useSpring(y, { stiffness: 120, damping: 22 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover)").matches) return;
    const move = (event: MouseEvent) => {
      x.set(event.clientX - SIZE / 2);
      y.set(event.clientY - SIZE / 2);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy, width: SIZE, height: SIZE }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden rounded-full bg-primary/10 blur-3xl [@media(hover:hover)]:block"
    />
  );
};
