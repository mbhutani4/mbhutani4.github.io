import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Hero from "components/Project/Hero";

import { getProjects } from "helpers/fetchProjects";
import type { Project } from "helpers/typeDefinitions";

const ProjectPage = ({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  console.log(project);
  return (
    <main>
      <Hero project={project} />
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
}> = async ({ params }) => {
  const project: Project = require("../../../projects/" + params?.id + ".ts")
    .default;
  return {
    props: {
      project,
    },
  };
};

export default ProjectPage;
