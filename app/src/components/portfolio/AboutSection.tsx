import { motion, useReducedMotion } from "framer-motion";
import { LANGUAGES, STATS } from "@/data/portfolio";
import { AnimatedCounter } from "./motion/AnimatedCounter";

const AboutSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden border-b border-border py-24">
      <motion.div
        className="about-orbit"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative grid gap-12 px-4 lg:grid-cols-12 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="lg:col-span-7"
        >
          <p className="section-kicker">01 / About</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Curious by nature.<br /><span className="text-primary">Practical by design.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-muted-foreground">
            Passionate about web and mobile development as well as UI/UX design, I combine technical skills with teaching experience and a strong sense of responsibility. I work independently, collaborate comfortably, and learn quickly.
          </p>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 120, damping: 14 }}
                whileHover={reduceMotion ? undefined : { y: -6, scale: 1.04 }}
                className="rounded-lg border border-border bg-card p-4 text-center shadow-sm"
              >
                <p className="text-3xl font-extrabold text-primary"><AnimatedCounter value={stat.value} /></p>
                <p className="mt-1 text-xs font-semibold uppercase text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, rotate: -3, y: 30 }}
          whileInView={{ opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ type: "spring", stiffness: 90 }}
          className="language-panel border border-border bg-card p-7 shadow-md lg:col-span-5"
        >
          <p className="text-center text-sm font-bold uppercase text-muted-foreground">Languages</p>
          <div className="mt-7 flex flex-wrap justify-center gap-5">
            {LANGUAGES.map((language, index) => (
              <motion.div
                key={language.code}
                className="language-orb"
                animate={reduceMotion ? undefined : { y: [0, index % 2 ? 8 : -8, 0] }}
                transition={{ duration: 3.8 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={reduceMotion ? undefined : { scale: 1.12, rotate: index % 2 ? 5 : -5 }}
              >
                <span className="text-xl font-extrabold text-primary">{language.code}</span>
                <span className="mt-0.5 text-[10px] font-bold uppercase text-muted-foreground">{language.level}</span>
                <span className="sr-only">{language.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default AboutSection;
