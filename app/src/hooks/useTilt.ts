import { useRef, type MouseEvent } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** 3D tilt that follows the pointer. Spread the result on a motion element. */
export const useTilt = (max = 6) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };

  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return { ref, style: { rotateX, rotateY, transformPerspective: 900 }, onMouseMove, onMouseLeave };
};
