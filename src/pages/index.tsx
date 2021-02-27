import { useState } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import StartSlide from "components/StartSlide";
import ProjectSlide from "components/ProjectSlide";
import Slides from "components/Slides";
import useScrollSnap from "helpers/useScrollSnap";
import type { Project } from "helpers/typeDefinitions";
import Header from "components/Header";

const defaultSlideId = "start";

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const ref = useScrollSnap();
  const [currentSlideId, setSlideId] = useState(defaultSlideId);
  const changeSlideId = (id: string) => setSlideId(id);

  return (
    <>
      <Head>
        <title>Mahima Bhutani</title>
        <link rel="icon" href="/favicon.icon" />
      </Head>
      <Header isVisible={currentSlideId !== defaultSlideId} />
      <Slides ref={ref}>
        <StartSlide
          key={defaultSlideId}
          project={{ id: defaultSlideId, name: "Mahima Bhutani", images: [] }}
          changeSlideId={changeSlideId}
        />
        {projects.map((project) => (
          <ProjectSlide
            project={project}
            key={project.id}
            changeSlideId={changeSlideId}
          />
        ))}
      </Slides>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  projects: Project[];
}> = async () => {
  const projects = (await import("../../data/projects")).default;
  return {
    props: {
      projects,
    },
  };
};

export default Home;
