import "server-only";

/**
 * Draft Protection Utilities
 * Provides functions to manage draft project access control
 */

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  const isDraftTestingMode = process.env.DRAFT_TEST === "true";
  if (isDraftTestingMode) {
    return false;
  }

  return (
    process.env.NODE_ENV === "development"
  );
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
 * Supports password authentication for draft projects in production
 */
export function canAccessProject(
  published: boolean,
  passwordValid?: boolean,
): { allowed: boolean; reason?: string; requiresPassword?: boolean } {
  const inDev = isDevelopment();
  const isDraftProject = isDraft(published);

  // In production, check if draft
  if (isDraftProject) {
    // Always allow in development
    if (inDev) {
      return { allowed: true };
    }

    const draftPassword = process.env.DRAFT_PASSWORD;
    // If no password is configured, block access
    if (!draftPassword) {
      return {
        allowed: false,
        reason: "This project is still in draft and not publicly available",
      };
    }

    // If password validity is provided (from API validation), use it

    if (passwordValid) {
      return { allowed: true };
    }

    // Password is configured but not validated
    return {
      allowed: false,
      reason: "This project requires a password to view",
      requiresPassword: true,
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
