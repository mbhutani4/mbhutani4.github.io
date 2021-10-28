import Head from "next/head";

import Header from "ui/Header";
import Hero from "components/Project/Hero";
import Markdown from "components/Project/Markdown";
import Footer from "ui/Footer";
import { getAllProjects, getProject } from "helpers/getProjects";

import type { CSSProperties } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { Project } from "helpers/typeDefinitions";

export default function ProjectPage({
  project,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Meta {...project} />
      <Header />
      <Hero project={project} />
      <main style={{ "--accent": project.accent } as CSSProperties}>
        <Markdown markdown={content} project={project} />
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths = async () => {
  const projects = getAllProjects();
  const paths = projects.map(({ id }) => `/project/${id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  project: Project;
  content: string;
}> = async ({ params }) => {
  const projectName = params?.id as string;
  return {
    props: getProject(projectName),
  };
};

function Meta({
  name: title,
  id: projectId,
  description = "Portfolio of Mahima Bhutani.",
  image,
}: Project): JSX.Element {
  const siteName = "Mahima Bhutani";
  const domainUrl = "https://bhutani.design";
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${domainUrl}${image}`
    : `${domainUrl}/images/profile.jpeg`;

  return (
    <Head>
      <title>
        {title} | {siteName}
      </title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={domainUrl + "/project/" + projectId} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
    </Head>
  );
}
