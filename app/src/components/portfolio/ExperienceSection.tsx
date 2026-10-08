import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EXPERIENCE } from "@/data/portfolio";
import { Reveal } from "./motion/Reveal";

const ExperienceSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="py-24">
      <div className="container grid gap-12 px-4 lg:grid-cols-[.55fr_1.45fr]">
        <Reveal direction="left">
          <p className="section-kicker">04 / Experience</p>
          <h2 className="mt-4 text-4xl font-bold">Learning through building and teaching.</h2>
        </Reveal>

        <div ref={timelineRef} className="relative pl-8">
          {/* timeline that draws itself while scrolling */}
          <div aria-hidden="true" className="absolute left-0 top-0 h-full w-0.5 bg-border" />
          <motion.div aria-hidden="true" style={{ scaleY }} className="absolute left-0 top-0 h-full w-0.5 origin-top bg-primary" />

          <div className="divide-y divide-border border-y border-border">
            {EXPERIENCE.map((entry, index) => (
              <motion.article
                key={`${entry.role}-${entry.date}`}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: Math.min(index * 0.05, 0.2), duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 8 }}
                className="relative grid gap-3 py-7 sm:grid-cols-[170px_1fr]"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute top-8 h-3 w-3 rounded-full bg-primary ring-4 ring-background"
                  style={{ left: -38 }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.2 }}
                />
                <p className="text-sm font-semibold text-primary">{entry.date}</p>
                <div>
                  <h3 className="text-lg font-bold">{entry.role}</h3>
                  <p className="mt-1 text-sm font-medium">{entry.company}</p>
                  <p className="mt-3 leading-7 text-muted-foreground">{entry.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
