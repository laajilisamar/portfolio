import { motion } from "framer-motion";
import { SKILLS } from "@/data/portfolio";

const group = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } };
const chip = {
  hidden: { opacity: 0, scale: 0.4, y: 14 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 14 } },
};

const SkillsSection = () => (
  <section className="border-y border-border py-24">
    <div className="container px-4">
      <p className="section-kicker">03 / Toolkit</p>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {SKILLS.map(({ title, icon: Icon, items }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.12, duration: 0.7 }}
          >
            <motion.div whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }} transition={{ duration: 0.5 }} className="inline-block">
              <Icon className="h-7 w-7 text-primary" />
            </motion.div>
            <h3 className="mt-5 text-xl font-bold">{title}</h3>
            <motion.div
              className="mt-5 flex flex-wrap gap-2"
              variants={group}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              {items.map((entry) => (
                <motion.span
                  key={entry}
                  variants={chip}
                  whileHover={{ y: -4, scale: 1.08 }}
                  className="cursor-default rounded-sm bg-secondary px-3 py-1.5 text-sm"
                >
                  {entry}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
