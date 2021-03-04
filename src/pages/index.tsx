import { useState } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import StartSlide from "components/Slider/StartSlide";
import ProjectSlide from "components/Slider/ProjectSlide";
import Slides from "components/Slider/Slides";
import SliderControl from "components/Slider/SliderControl";
import Header from "components/Header/Header";

import useScrollSnap from "helpers/useScrollSnap";
import type { Project } from "helpers/typeDefinitions";
import { getProjects } from "helpers/fetchProjects";

const defaultSlideId = "start";

function removeHash() {
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
}

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const ref = useScrollSnap();
  const [currentSlideId, setSlideId] = useState(defaultSlideId);
  const changeSlideId = (id: string) => {
    setSlideId(id);
    removeHash();
  };
  const showSlideControls = currentSlideId !== defaultSlideId;  
  return (
    <>
      <Head>
        <title>Mahima Bhutani</title>
        <link rel="icon" href="/favicon.icon" />
      </Head>
      <Header isVisible={showSlideControls} />
      <SliderControl
        projects={projects}
        isVisible={showSlideControls}
        currentSlideId={currentSlideId}
      />
      <Slides ref={ref}>
        <StartSlide
          key={defaultSlideId}
          changeSlideId={changeSlideId}
          firstProjectSlideId={projects[0]?.id}
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
  const projects = getProjects();
  return {
    props: {
      projects,
    },
  };
};

export default Home;
