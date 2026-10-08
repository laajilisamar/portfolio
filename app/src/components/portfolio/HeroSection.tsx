import { useState, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Bot, Code2, Coffee, Download, Mail, MapPin, Monitor, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import developerWorkspace from "@/assets/developer-workspace.jpg";
import { CV_LINKS, PROFILE, ROLES } from "@/data/portfolio";
import { AnimatedTitle } from "./motion/AnimatedTitle";
import { getIntroDelay } from "./motion/IntroSplash";
import { Magnetic } from "./motion/Magnetic";
import { TypeWriter } from "./motion/TypeWriter";

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SCENE_SYMBOLS = [
  { Icon: Bot, position: "scene-robot", delay: 0 },
  { Icon: Monitor, position: "scene-monitor", delay: 0.8 },
  { Icon: Coffee, position: "scene-coffee", delay: 1.6 },
];

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const [base] = useState(() => (reduceMotion ? 0 : getIntroDelay()));

  // Pointer-driven 3D tilt for the illustration
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 120, damping: 18 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="home" className="developer-hero relative overflow-hidden border-b border-border bg-background pt-24">
      <div className="portfolio-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="container relative px-4 pb-10 pt-10 sm:pb-16">
        <div className="developer-intro relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { delayChildren: base, staggerChildren: 0.12 } } }}
          >
            <motion.p variants={item} className="mb-6 flex items-center gap-2 font-mono text-sm font-semibold text-primary">
              <Code2 className="h-4 w-4" /> <TypeWriter words={ROLES} />
            </motion.p>
          </motion.div>

          <AnimatedTitle delay={base + 0.15} />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { delayChildren: base + 2.1, staggerChildren: 0.12 } } }}
          >
            <motion.p variants={item} className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              I’m {PROFILE.name}, an information systems developer and software engineering master’s student based in Sousse, Tunisia.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <Button size="lg" asChild><a href="#work">Explore my work <ArrowDown /></a></Button>
              </Magnetic>
              <Magnetic>
                <Button size="lg" variant="outline" asChild><a href={`mailto:${PROFILE.email}`}>Email me <Mail /></a></Button>
              </Magnetic>
            </motion.div>

            <motion.div variants={item} className="mt-4 flex flex-wrap gap-3">
              {CV_LINKS.map(({ label, href, fileName }) => (
                <Magnetic key={href} strength={0.25}>
                  <Button variant="outline" asChild>
                    <a href={href} download={fileName}><Download /> {label}</a>
                  </Button>
                </Magnetic>
              ))}
            </motion.div>

            <motion.p variants={item} className="mt-7 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> {PROFILE.city}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="developer-scene"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: base }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <motion.div className="relative h-full w-full" style={{ rotateX, rotateY, transformPerspective: 1000 }}>
            {/* glowing blobs behind the illustration */}
            <motion.div
              aria-hidden="true"
              className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-pink-300/50 blur-3xl"
              animate={reduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute -right-6 bottom-6 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
              animate={reduceMotion ? undefined : { scale: [1.2, 0.9, 1.2], opacity: [0.9, 0.4, 0.9] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-pink-50 to-pink-200 shadow-xl"
              animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={developerWorkspace}
                alt="Illustrated hijabi developer in a long pink robe at a laptop with a friendly robot and coffee"
                width={1024}
                height={1024}
                className="h-full w-full object-contain mix-blend-multiply"
              />
              {/* light sweep */}
              {!reduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/50 blur-md"
                  animate={{ x: ["0%", "600%"] }}
                  transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                />
              )}
            </motion.div>

            {SCENE_SYMBOLS.map(({ Icon, position, delay }) => (
              <motion.span
                key={position}
                className={`scene-symbol ${position} text-primary`}
                aria-hidden="true"
                animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [-6, 6, -6] }}
                transition={{ duration: 4, delay, repeat: Infinity }}
              >
                <Icon strokeWidth={1.5} className="h-8 w-8 sm:h-10 sm:w-10" />
              </motion.span>
            ))}

            {[
              { className: "left-[8%] top-[6%]", delay: 0 },
              { className: "right-[10%] top-[40%]", delay: 0.9 },
              { className: "left-[16%] bottom-[10%]", delay: 1.7 },
            ].map(({ className, delay }) => (
              <motion.span
                key={className}
                aria-hidden="true"
                className={`absolute text-primary ${className}`}
                animate={reduceMotion ? undefined : { opacity: [0.2, 1, 0.2], scale: [0.6, 1.2, 0.6], rotate: [0, 90, 0] }}
                transition={{ duration: 2.6, delay, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6" />
              </motion.span>
            ))}

            <span className="scene-code font-mono text-sm font-semibold text-primary" aria-hidden="true">&lt;hello world /&gt;</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
