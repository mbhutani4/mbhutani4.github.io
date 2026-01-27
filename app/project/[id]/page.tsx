import type { Metadata } from "next";
import Markdown from "ui/Markdown";
import Siblings from "ui/Siblings";
import { getAllProjects, getProject } from "helpers/getProjects";
import { HeroSection } from "components/Section";
import { Tag } from "components/Tag";
import type { CSSProperties } from "react";
import type { Project } from "helpers/typeDefinitions";
import { capitalise } from "helpers/tags";

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/project/[id]">): Promise<Metadata> {
  const { project } = getProject((await params).id);
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
}: PageProps<"/project/[id]">) {
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
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
        {tags.map((tag) => (
          <Tag
            key={tag}
            className="cursor-default bg-[var(--color-background-primary)]"
          >
            {capitalise(tag)}
          </Tag>
        ))}
      </div>
    </HeroSection>
  );
}
