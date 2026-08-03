import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Markdown from "ui/Markdown";
import Siblings from "ui/Siblings";
import ProjectHero from "ui/ProjectHero";
import { getAllProjects, getProject } from "helpers/getProjects";
import { getProjectPassword } from "config/projectSecrets";
import { PasswordPrompt } from "components/PasswordPrompt";
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

  const projectPassword = getProjectPassword(id);

  // Draft access: the site-level (master) password, or the project's own
  // password, both count as valid authentication.
  const hasProjectAuth = !!projectPassword && isProjectAuthenticated;
  const hasValidAuth = isDraftAuthenticated || hasProjectAuth;

  const access = canAccessProject(!!projectData.published, hasValidAuth);

  // Unauthenticated draft (or draft carrying its own password):
  // show a single password prompt, never a chain of prompts.
  if (!access.allowed) {
    if (projectPassword && !isProjectAuthenticated) {
      return (
        <PasswordPrompt
          title="Protected Project"
          description={`${projectData.name} is password protected. Please enter the password to view it.`}
          endpoint="/api/validate-project-password"
          projectId={id}
          footer="This project requires a password to view."
        />
      );
    }

    if (access.requiresPassword) {
      return (
        <PasswordPrompt
          title="Draft Project"
          description="This project is still in draft. Please enter the password to view it."
          endpoint="/api/validate-draft-password"
          projectId={id}
          footer="This is a password-protected draft project."
        />
      );
    }

    // Access denied with no password available
    notFound();
  }

  // Published project with its own password.
  // The site-level master password also grants access here, matching the
  // validation API.
  if (
    projectData.published === true &&
    projectPassword &&
    !isProjectAuthenticated &&
    !isDraftAuthenticated
  ) {
    return (
      <PasswordPrompt
        title="Protected Project"
        description={`${projectData.name} is password protected. Please enter the password to view it.`}
        endpoint="/api/validate-project-password"
        projectId={id}
        footer="This project requires a password to view."
      />
    );
  }

  const draftInfo = getDraftInfo(projectData.published);

  return (
    <article>
      <ProjectHero project={projectData} />
      {projectPassword && isProjectAuthenticated ? (
        <ProjectProtectedBanner projectId={id} />
      ) : draftInfo.isDraft ? (
        <DraftBanner isVisible={draftInfo.isVisible} />
      ) : null}

      <Markdown markdown={projectData.content} project={projectData} />
      <Siblings next={projectData.next} prev={projectData.prev} />
    </article>
  );
}
