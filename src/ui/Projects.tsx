import { Section } from "components/Section";
import { SubHeading } from "components/Text";
import ProjectsClient from "./ProjectsClient";
import type { Project } from "helpers/typeDefinitions";
import type { ReactElement } from "react";

export default function Projects({
  projects,
}: {
  projects: Project[];
}): ReactElement {
  return (
    <Section
      id="projects"
      className="bg-gradient-to-b from-background-primary to-background-secondary py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SubHeading className="animate-fade-in-up text-2xl">
            Featured Work
          </SubHeading>
          <div className="h-1 w-16 bg-accent mt-4 rounded-full"></div>
        </div>
        <ProjectsClient projects={projects} />
      </div>
    </Section>
  );
}
