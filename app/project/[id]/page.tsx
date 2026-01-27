import type { Metadata } from "next";
import Markdown from "ui/Markdown";
import Siblings from "ui/Siblings";
import { getAllProjects, getProject } from "helpers/getProjects";
import { HeroSection } from "components/layout";
import { Tag } from "components/Tag";
import type { CSSProperties } from "react";
import type { Project } from "helpers/typeDefinitions";
import styled from "@emotion/styled";
import { Color } from "styles";
import { capitalise } from "helpers/tags";

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map(({ id }) => ({ id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const { project } = getProject(params.id);
  const siteName = "Mahima Bhutani";
  const domainUrl = "https://bhutani.design";
  const imageUrl = project.image?.startsWith("http")
    ? project.image
    : project.image
      ? `${domainUrl}${project.image}`
      : `${domainUrl}/images/profile.jpeg`;

  return {
    title: `${project.name} | ${siteName}`,
    description: project.description ?? "Portfolio of Mahima Bhutani.",
    openGraph: {
      title: project.name,
      description: project.description ?? "Portfolio of Mahima Bhutani.",
      siteName,
      url: `${domainUrl}/project/${project.id}`,
      images: [{ url: imageUrl, alt: project.name }],
      type: "website",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { project, content, next, prev } = getProject(id);

  return (
    <>
      <HeroImage project={project} />
      <Markdown markdown={content} project={project} />
      <Siblings next={next} prev={prev} />
    </>
  );
}

function HeroImage({
  project,
  style,
}: {
  project: Project;
  style?: CSSProperties;
}) {
  const { image, tags = [] } = project;
  return (
    <HeroSection
      style={{
        ...style,
        backgroundImage: `url(${image})`,
        height: "70vh",
      }}
    >
      <TagsContainer>
        {tags.map((tag) => (
          <CustomTag key={tag}>{capitalise(tag)}</CustomTag>
        ))}
      </TagsContainer>
    </HeroSection>
  );
}

const TagsContainer = styled.div`
  position: absolute;
  bottom: -1.5em;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

const CustomTag = styled(Tag)`
  cursor: initial;
  background-color: ${Color.Background_Primary};
`;
