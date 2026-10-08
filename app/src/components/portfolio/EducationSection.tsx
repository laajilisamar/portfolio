import { motion } from "framer-motion";
import { GraduationCap, Heart } from "lucide-react";
import { EDUCATION, PROFILE, WORKSHOPS } from "@/data/portfolio";
import { Reveal } from "./motion/Reveal";

const EducationSection = () => (
  <section id="education" className="bg-secondary/45 py-24">
    <div className="container px-4">
      <Reveal direction="left"><p className="section-kicker">05 / Education</p></Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {EDUCATION.map((entry, index) => (
          <motion.article
            key={entry.degree}
            initial={{ opacity: 0, y: 60, rotateX: -25 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, boxShadow: "0 18px 30px -12px hsl(var(--primary) / 0.35)" }}
            style={{ transformPerspective: 800 }}
            className="border-t-2 border-primary bg-card p-6"
          >
            <motion.div initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }} className="inline-block">
              <GraduationCap className="text-primary" />
            </motion.div>
            <p className="mt-8 text-sm font-semibold text-primary">{entry.year}</p>
            <h3 className="mt-3 text-lg font-bold leading-7">{entry.degree}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.school}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {WORKSHOPS.map((workshop, index) => (
          <Reveal key={workshop.title} direction={index % 2 ? "right" : "left"} delay={index * 0.1}>
            <article className="h-full border border-border bg-card p-6 transition-shadow hover:shadow-lg">
              <p className="text-sm font-semibold text-primary">{workshop.meta}</p>
              <h3 className="mt-2 text-xl font-bold">{workshop.title}</h3>
              <p className="mt-3 text-muted-foreground">{workshop.description}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal direction="up" className="mt-12 flex gap-4">
        <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="mt-1 shrink-0">
          <Heart className="text-primary" />
        </motion.span>
        <div>
          <h3 className="font-bold">Interests</h3>
          <p className="mt-2 text-muted-foreground">{PROFILE.interests}</p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default EducationSection;
