import Head from "next/head";

import type { Project } from "helpers/typeDefinitions";
import { getAllProjects } from "helpers/getProjects";
import Header from "ui/Header";
import About from "ui/About";
import Projects from "ui/Projects";
import Footer from "ui/Footer";

import type { GetStaticProps, InferGetStaticPropsType } from "next";

export default function Home({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta />
      <Header />
      <About />
      <Projects projects={projects} />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  projects: Project[];
}> = async () => {
  const projects = getAllProjects();
  return {
    props: {
      projects,
    },
  };
};

function Meta(): React.ReactElement {
  const title = "Mahima Bhutani";
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={"Portfolio of a UX/UI Designer."}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bhutani.design" />
      <meta
        property="og:image"
        content="https://bhutani.design/images/profile.jpeg"
      />
      <meta property="og:image:alt" content={title} />
    </Head>
  );
}
