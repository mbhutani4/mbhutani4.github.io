import About from "ui/About";
import Projects from "ui/Projects";
import Skills from "ui/Skills";
import Contact from "ui/Contact";
import { getAllProjects } from "helpers/getProjects";
import type { Project } from "helpers/typeDefinitions";

export default function HomePage() {
  const projects: Project[] = getAllProjects();

  return (
    <>
      <About />
      <Projects projects={projects} />
      <Skills />
      <Contact />
    </>
  );
}
