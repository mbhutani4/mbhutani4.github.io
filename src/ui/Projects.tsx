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
    <Section id="projects" className="bg-background-primary">
      <div className="max-w-6xl mx-auto">
        <SubHeading>Projects</SubHeading>
        <ProjectsClient projects={projects} />
      </div>
    </Section>
  );
}
