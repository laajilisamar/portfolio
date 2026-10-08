import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ExternalLink, Figma, ImagePlus, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DESIGNS, SOCIAL_LINKS, type DesignWork } from "@/data/portfolio";
import { useTilt } from "@/hooks/useTilt";
import { Reveal } from "./motion/Reveal";

const BEHANCE_URL = SOCIAL_LINKS.find((link) => link.label === "Behance")?.href;
const AUTO_MS = 3500; // time between two photos (milliseconds)

type DesignCardProps = { work: DesignWork; index: number };

const DesignCard = ({ work, index }: DesignCardProps) => {
  const tilt = useTilt(5);
  const LinkIcon = work.href?.includes("figma.com") ? Figma : ExternalLink;

  // Photos: `images` (several) or `image` (one)
  const gallery = work.images ?? (work.images ? [work.images] : []);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const inView = useInView(rootRef, { margin: "-10%" });

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  // Which photo is in the middle -> highlights the matching dot
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const middle = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let smallest = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const slide = child as HTMLElement;
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - middle);
      if (distance < smallest) {
        smallest = distance;
        closest = i;
      }
    });
    setActive(closest);
  };

  // Auto-advance (stops on hover/touch, when off-screen, or with reduced motion)
  useEffect(() => {
    if (reduceMotion || paused || !inView || gallery.length < 2) return;
    const timer = setTimeout(() => scrollToIndex((active + 1) % gallery.length), AUTO_MS);
    return () => clearTimeout(timer);
  }, [active, paused, inView, reduceMotion, gallery.length, scrollToIndex]);

  return (
    <motion.article
      ref={tilt.ref}
      style={tilt.style}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-white dark:from-secondary dark:via-card dark:to-card">
        {gallery.length > 0 ? (
          <div
            ref={rootRef}
            className="relative h-full w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="relative flex h-full w-full snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${work.title} — ${work.type} (${i + 1}/${gallery.length})`}
                  loading="lazy"
                  className="h-full w-[88%] shrink-0 snap-center rounded-lg object-cover"
                />
              ))}
            </div>

            {gallery.length > 1 && (
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 px-2 py-1.5 backdrop-blur">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === active}
                    className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-primary" : "w-2 bg-white/80"}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="portfolio-grid absolute inset-0 opacity-50" />
            <div className="relative flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-card text-primary">
                <ImagePlus />
              </span>
              <span className="text-xs font-semibold text-muted-foreground">Add your mockup here</span>
            </div>
          </>
        )}

        <span className="absolute left-4 top-4 z-10 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
          {work.type}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold">{work.title}</h3>
        <p className="mt-3 leading-7 text-muted-foreground">{work.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {work.tools.map((tool) => (
            <span key={tool} className="rounded-sm border border-border bg-background px-2.5 py-1 text-xs font-medium">
              {tool}
            </span>
          ))}
        </div>

        {work.href && (
          <a
            href={work.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            {work.linkLabel ?? "View design"} <LinkIcon className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
};

const DesignSection = () => (
  <section id="design" className="py-24">
    <div className="container px-4">
      <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
        <Reveal direction="left">
          <p className="section-kicker">03 / UI/UX design</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Interfaces designed with care.</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            A selection of my UI/UX work: mockups, prototypes and visual identity.
          </p>
        </Reveal>

        {BEHANCE_URL && (
          <Reveal direction="right">
            <Button size="lg" variant="outline" asChild>
              <a href={BEHANCE_URL} target="_blank" rel="noreferrer">
                <Palette /> See all on Behance <ExternalLink />
              </a>
            </Button>
          </Reveal>
        )}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DESIGNS.map((work, index) => (
          <DesignCard key={work.title} work={work} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default DesignSection;