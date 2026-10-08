import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { ImagePlus } from "lucide-react";

import type { Project } from "@/data/portfolio";
import { useTilt } from "@/hooks/useTilt";

type ProjectCardProps = {
  project: Project;
  index: number;
};

const ProjectCard = ({
  project,
  index,
}: ProjectCardProps) => {
  const reduceMotion = useReducedMotion();
  const tilt = useTilt(6);

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const inView = useInView(rootRef, {
    margin: "-10%",
  });

  // =========================
  // PROJECT IMAGES
  // =========================

  const gallery = project.images ?? [];

  const Icon = project.icon;

  const isLandscape =
    project.format === "landscape";

  // =========================
  // DETECT ACTIVE IMAGE
  // =========================

  const onScroll = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const slides = Array.from(
      track.children
    ) as HTMLElement[];

    if (!slides.length) return;

    const center =
      track.scrollLeft +
      track.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, i) => {
      const slideCenter =
        slide.offsetLeft +
        slide.offsetWidth / 2;

      const distance = Math.abs(
        center - slideCenter
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    setActive(closestIndex);
  }, []);

  // =========================
  // SCROLL TO IMAGE
  // =========================

  const scrollToIndex = useCallback(
    (i: number) => {
      const track = trackRef.current;

      if (!track) return;

      const slide =
        track.children[i] as
          | HTMLElement
          | undefined;

      if (!slide) return;

      track.scrollTo({
        left:
          slide.offsetLeft -
          (track.clientWidth -
            slide.offsetWidth) /
            2,
        behavior: "smooth",
      });

      setActive(i);
    },
    []
  );

  // =========================
  // AUTO SCROLL
  // =========================

  useEffect(() => {
    // Pas d'auto-scroll s'il n'y a
    // qu'une seule image
    if (gallery.length <= 1) {
      return;
    }

    // Respecte l'accessibilité
    if (reduceMotion) {
      return;
    }

    // Pause si la souris est dessus
    if (paused) {
      return;
    }

    // Pause si la carte n'est pas visible
    if (!inView) {
      return;
    }

    const timer = setInterval(() => {
      const nextIndex =
        (active + 1) % gallery.length;

      scrollToIndex(nextIndex);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [
    active,
    gallery.length,
    paused,
    inView,
    reduceMotion,
    scrollToIndex,
  ]);

  // =========================
  // RENDER
  // =========================

  return (
    <motion.article
      ref={tilt.ref}
      style={tilt.style}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      layout
      initial={{
        opacity: 0,
        y: 30,
        rotate: index % 2 ? 1 : -1,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: 0,
      }}
      transition={{
        delay: index * 0.08,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -8,
            }
      }
      className={`project-grid-item group overflow-hidden rounded-lg border border-border bg-card shadow-sm ${
        isLandscape
          ? "md:col-span-4 md:grid md:grid-cols-2"
          : "md:col-span-2"
      }`}
    >
      {/* ================================= */}
      {/* IMAGE / GALLERY */}
      {/* ================================= */}

      <motion.div
        ref={rootRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className={`project-image-slot relative overflow-hidden bg-secondary ${
          isLandscape
            ? "min-h-52 md:min-h-full"
            : "h-64"
        }`}
        whileHover={
          reduceMotion
            ? undefined
            : {
                scale: 1.025,
              }
        }
      >
        {/* Background */}
        <div className="portfolio-grid absolute inset-0 opacity-35" />

        {/* ================================= */}
        {/* GALLERY */}
        {/* ================================= */}

        {gallery.length > 0 ? (
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="relative flex h-full w-full snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {gallery.map(
              (src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.name} — ${project.label} ${
                    i + 1
                  }/${gallery.length}`}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-[88%] shrink-0 snap-center rounded-lg object-cover"
                />
              )
            )}

            {/* ================================= */}
            {/* DOTS / INDICATORS */}
            {/* ================================= */}

            {gallery.length > 1 && (
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 px-2 py-1.5 backdrop-blur">
                {gallery.map(
                  (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        scrollToIndex(i)
                      }
                      aria-label={`Show image ${
                        i + 1
                      }`}
                      aria-current={
                        i === active
                      }
                      className={`h-2 rounded-full transition-all ${
                        i === active
                          ? "w-6 bg-primary"
                          : "w-2 bg-white/80"
                      }`}
                    />
                  )
                )}
              </div>
            )}
          </div>
        ) : (
          /* ================================= */
          /* NO IMAGE */
          /* ================================= */

          <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-card text-primary">
              <ImagePlus />
            </span>

            <span className="text-xs font-semibold">
              View Project
            </span>
          </div>
        )}

        {/* ================================= */}
        {/* PROJECT ICON */}
        {/* ================================= */}

        <span className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-md bg-card text-primary shadow-sm">
          <Icon className="h-5 w-5" />
        </span>
      </motion.div>

      {/* ================================= */}
      {/* PROJECT INFORMATION */}
      {/* ================================= */}

      <div className="flex flex-col justify-center p-7 sm:p-8">
        <p className="text-sm font-semibold text-primary">
          {project.label}
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          {project.name}
        </h3>

        <p className="mt-4 leading-7 text-muted-foreground">
          {project.description}
        </p>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {project.contribution}
        </p>

        {/* ================================= */}
        {/* TECHNOLOGIES */}
        {/* ================================= */}

        <div className="mt-7 flex flex-wrap gap-2">
          {project.technologies.map(
            (technology) => (
              <span
                key={technology}
                className="rounded-sm border border-border bg-background px-2.5 py-1 text-xs font-medium"
              >
                {technology}
              </span>
            )
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;