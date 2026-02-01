/**
 * Draft Protection Utilities
 * Provides functions to manage draft project access control
 */

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV !== "production";
}

/**
 * Check if a project is a draft
 */
export function isDraft(published?: boolean): boolean {
  return published !== true;
}

/**
 * Get draft access info for UI display
 */
export function getDraftInfo(published?: boolean): {
  isDraft: boolean;
  isVisible: boolean;
  message: string;
} {
  const isDraftProject = isDraft(published);
  const inDev = isDevelopment();
  const isVisible = !isDraftProject || inDev;

  let message = "";
  if (isDraftProject && inDev) {
    message = "Draft - Visible in dev only";
  } else if (isDraftProject && !inDev) {
    message = "Draft - Hidden in production";
  }

  return {
    isDraft: isDraftProject,
    isVisible,
    message,
  };
}

/**
 * Verifies draft access in production
 * Returns true if project should be accessible
 * Password parameter reserved for future authentication
 */
export function canAccessProject(
  published?: boolean,
  _password?: string,
): { allowed: boolean; reason?: string } {
  const inDev = isDevelopment();
  const isDraftProject = isDraft(published);

  // Always allow in development
  if (inDev) {
    return { allowed: true };
  }

  // In production, only allow published projects
  if (isDraftProject) {
    // Could add password check here in the future
    return {
      allowed: false,
      reason: "This project is still in draft and not publicly available",
    };
  }

  return { allowed: true };
}

/**
 * Environment-aware project visibility
 * Use in dynamic paths to determine if project should be generated
 */
export function shouldGenerateProject(published?: boolean): boolean {
  const inDev = isDevelopment();
  const isDraftProject = isDraft(published);

  // In development: generate all projects
  if (inDev) {
    return true;
  }

  // In production: only generate published projects
  return !isDraftProject;
}
