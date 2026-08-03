import "server-only";

/**
 * Server-only per-project passwords.
 *
 * NEVER store passwords in the frontmatter of markdown files under
 * `public/projects` - everything under public is served statically, so a
 * plaintext password would be downloadable by anyone who requests the raw
 * markdown file.
 *
 * Sources, in priority order:
 *   1. Environment variable: `PROJECT_PASSWORD_<ID>` (uppercased, dashes
 *      replaced with underscores), e.g. `PROJECT_PASSWORD_NEURON` for the
 *      project `neuron`. Recommended for production so the secret never
 *      lives in the repo.
 *   2. The DEV_SECRETS map below (development fallback only). Do not use
 *      real passwords here.
 */

const DEV_SECRETS: Record<string, string> = {
  neuron: "123",
};

export function envKeyFor(projectId: string): string {
  return `PROJECT_PASSWORD_${projectId.toUpperCase().replace(/-/g, "_")}`;
}

/**
 * Resolves the password for a project, or undefined if it is not protected.
 */
export function getProjectPassword(
  projectId: string,
): string | undefined {
  return (
    process.env[envKeyFor(projectId)] ??
    DEV_SECRETS[projectId] ??
    undefined
  );
}
