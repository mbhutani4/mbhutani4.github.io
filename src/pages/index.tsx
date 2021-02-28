import fs from "fs";
import { useState } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import StartSlide from "components/StartSlide";
import ProjectSlide from "components/ProjectSlide";
import Slides from "components/Slides";
import useScrollSnap from "helpers/useScrollSnap";
import type { Project } from "helpers/typeDefinitions";
import Header from "components/Header";
import SliderControl from "components/SliderControl";

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
  const projects: Project[] = fs
    .readdirSync(process.cwd() + "/projects")
    .map((file) => require("../../projects/" + file).default)
    .sort(({ order: a = 0 }: Project, { order: b = 0 }: Project) => b - a);
  return {
    props: {
      projects,
    },
  };
};

export default Home;
