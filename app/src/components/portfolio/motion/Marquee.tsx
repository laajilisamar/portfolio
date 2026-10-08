import { motion, useReducedMotion } from "framer-motion";

type MarqueeProps = { items: string[] };

/** Endless scrolling ribbon. */
export const Marquee = ({ items }: MarqueeProps) => {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground" aria-hidden="true">
      <motion.div
        className="flex w-max whitespace-nowrap text-lg font-semibold"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10 pr-10">
            {item}
            <span className="text-primary-foreground/60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
