import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";
import { Reveal } from "./motion/Reveal";

const ProjectsSection = () => {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const visibleProjects = filter === "All" ? PROJECTS : PROJECTS.filter((project) => project.category === filter);

  return (
    <section id="work" className="bg-secondary/45 py-24">
      <div className="container px-4">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <Reveal direction="left">
            <p className="section-kicker">02 / Selected work</p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Projects grounded in real needs.</h2>
          </Reveal>
          <div className="flex flex-wrap gap-2" aria-label="Project filters">
            {PROJECT_CATEGORIES.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <motion.div layout className="project-bento mt-12 grid gap-6 md:grid-cols-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
