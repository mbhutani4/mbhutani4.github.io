import About from "ui/About";
import Projects from "ui/Projects";
import { getAllProjects } from "helpers/getProjects";
import type { Project } from "helpers/typeDefinitions";

export default function HomePage() {
  const projects: Project[] = getAllProjects();

  return (
    <>
      <About />
      <Projects projects={projects} />
    </>
  );
}
