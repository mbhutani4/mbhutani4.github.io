import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "ui/Markdown";
import Siblings from "ui/Siblings";
import { getAllProjects, getProject } from "helpers/getProjects";
import { HeroSection } from "components/Section";
import { Tag } from "components/Tag";
import type { CSSProperties } from "react";
import type { Project } from "helpers/typeDefinitions";
import { capitalise } from "helpers/tags";
import { canAccessProject, getDraftInfo } from "helpers/draftAccess";

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/project/[id]">): Promise<Metadata> {
  try {
    const projectData = getProject((await params).id);
    const access = canAccessProject(projectData.published);

    if (!access.allowed) {
      return {
        title: "Draft Project",
        description: "This project is not publicly available",
        robots: "noindex, nofollow",
      };
    }

    const siteName = "Mahima Bhutani";
    const domainUrl = "https://bhutani.design";
    const imageUrl = projectData.image?.startsWith("http")
      ? projectData.image
      : projectData.image
        ? `${domainUrl}${projectData.image}`
        : `${domainUrl}/images/profile.jpeg`;

    return {
      title: `${projectData.name} | ${siteName}`,
      description: projectData.description ?? "Portfolio of Mahima Bhutani.",
      openGraph: {
        title: projectData.name,
        description: projectData.description ?? "Portfolio of Mahima Bhutani.",
        siteName,
        url: `${domainUrl}/project/${projectData.id}`,
        images: [{ url: imageUrl, alt: projectData.name }],
        type: "website",
      },
    };
  } catch (error) {
    // Return minimal metadata for 404 pages
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
      robots: "noindex",
    };
  }
}

export default async function ProjectPage({
  params,
}: PageProps<"/project/[id]">) {
  const { id } = await params;

  let projectData;
  try {
    projectData = getProject(id);
  } catch (error) {
    // Show 404 page for missing projects
    notFound();
  }

  const draftInfo = getDraftInfo(projectData.published);

  return (
    <article>
      <HeroImage project={projectData} />
      {draftInfo.isDraft && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-6 py-3">
          <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
            📝 This is a draft project and only visible in development mode
          </p>
        </div>
      )}
      <Markdown markdown={projectData.content} project={projectData} />
      <Siblings next={projectData.next} prev={projectData.prev} />
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
