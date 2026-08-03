import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Markdown from "ui/Markdown";
import Siblings from "ui/Siblings";
import ProjectHero from "ui/ProjectHero";
import { getAllProjects, getProject } from "helpers/getProjects";
import { DraftPasswordPrompt } from "components/DraftPasswordPrompt";
import { ProjectPasswordPrompt } from "components/ProjectPasswordPrompt";
import { canAccessProject, getDraftInfo } from "helpers/draftAccess";
import { DraftBanner } from "components/DraftBanner";
import { ProjectProtectedBanner } from "components/ProjectProtectedBanner";

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/project/[id]">): Promise<Metadata> {
  try {
    const projectData = getProject((await params).id);
    const access = canAccessProject(!!projectData.published);

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
  const cookieStore = await cookies();
  const isDraftAuthenticated =
    cookieStore.get("draft_authenticated")?.value === "true";
  const isProjectAuthenticated =
    cookieStore.get(`project_auth_${id}`)?.value === "true";

  let projectData;
  try {
    projectData = getProject(id);
  } catch (error) {
    console.error(error)
    // Show 404 page for missing projects
    notFound();
  }

  // Check draft access first
  const access = canAccessProject(
    !!projectData.published,
    isDraftAuthenticated,
  );

  // If requires password but not authenticated, show draft password prompt
  if (!access.allowed && access.requiresPassword) {
    return <DraftPasswordPrompt projectId={id} />;
  }

  // If access denied, show 404
  if (!access.allowed) {
    notFound();
  }

  // Check if project has a password (even if published)
  if (projectData.password && !isProjectAuthenticated) {
    return (
      <ProjectPasswordPrompt projectId={id} projectName={projectData.name} />
    );
  }

  const draftInfo = getDraftInfo(projectData.published);

  return (
    <article>
      <ProjectHero project={projectData} />
      {draftInfo.isDraft ? (
        <DraftBanner isVisible={draftInfo.isVisible} />
      ) : null}
      {projectData.password && isProjectAuthenticated ? (
        <ProjectProtectedBanner projectId={id} />
      ) : null}

      <Markdown markdown={projectData.content} project={projectData} />
      <Siblings next={projectData.next} prev={projectData.prev} />
    </article>
  );
}
