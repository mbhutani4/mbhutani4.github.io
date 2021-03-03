import type { CSSProperties } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import Hero from "components/Project/Hero";
import Markdown from "components/Project/Markdown";

import { getMDFile, getProjects } from "helpers/fetchProjects";
import type { Project } from "helpers/typeDefinitions";

const ProjectPage = ({
  project,
  markdown,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <main style={{ "--accent": project.accent } as CSSProperties}>
      <Hero project={project} />
      <Markdown markdown={markdown} project={project} />
    </main>
  );
};

export const getStaticPaths = async () => {
  const projects = getProjects();
  const paths = projects.map(({ id }) => `/project/${id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  project: Project;
  markdown: string;
}> = async ({ params }) => {
  const folderName = params?.id as string;
  return {
    props: getMDFile(folderName),
  };
};

export default ProjectPage;
