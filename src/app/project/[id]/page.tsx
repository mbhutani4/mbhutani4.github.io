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
    <article>
      <HeroImage project={project} />
      <Markdown markdown={content} project={project} />
      <Siblings next={next} prev={prev} />
    </article>
  );
}

function HeroImage({
  project,
  style,
}: {
  project: Project;
  style?: CSSProperties;
}) {
  const { image, tags = [], name } = project;
  return (
    <HeroSection
      style={{
        ...style,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
        minHeight: "400px",
      }}
      className="relative flex items-end justify-center pb-20"
      aria-label={`Project: ${name}`}
    >
      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0 bg-black/20 dark:bg-black/40"
        aria-hidden="true"
      ></div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 flex-wrap p-6 z-10">
        {tags.length > 0 && (
          <>
            <span className="sr-only">Tags: </span>
            {tags.map((tag) => (
              <Tag
                key={tag}
                className="cursor-default bg-background-primary hover:bg-background-primary hover:text-text-primary border-0"
                aria-label={tag}
              >
                {capitalise(tag)}
              </Tag>
            ))}
          </>
        )}
      </div>
    </HeroSection>
  );
}
