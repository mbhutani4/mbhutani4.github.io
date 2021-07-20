import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import StartSlide from "components/Slider/StartSlide";
import ProjectSlide from "components/Slider/ProjectSlide";

import type { Project } from "helpers/typeDefinitions";
import { getProjects } from "helpers/fetchProjects";
import styled from "@emotion/styled";
import Footer from "components/Header/Footer";

const defaultSlideId = "start";

const ProjectGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  padding: 20px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Mahima Bhutani</title>
        <link rel="icon" href="/favicon.icon" />
      </Head>

      <StartSlide key={defaultSlideId} />
      <ProjectGrid id="projects">
        {projects.map((project) => (
          <ProjectSlide {...project} key={project.id} />
        ))}
      </ProjectGrid>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  projects: Project[];
}> = async () => {
  const projects = getProjects();
  return {
    props: {
      projects,
    },
  };
};

export default Home;
