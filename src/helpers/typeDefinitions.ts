export interface Project {
  order?: number;
  id: string;
  name: string;
  image: string;
  description?: string;
  logo?: string;
  accent?: string;
  tags?: string[];
  published?: boolean; // Draft status - false by default
}

export interface ProjectMetadata extends Omit<Project, "image"> {
  image?: string; // In metadata, image is optional before processing
  published?: boolean; // Draft status - false by default
}

export interface ParsedProject extends Project {
  content: string;
  next: Project;
  prev: Project;
  project?: Project; // For backward compatibility with existing code
}

/**
 * Validates project metadata has all required fields with correct types
 */
export function validateProjectMetadata(
  data: unknown,
): data is ProjectMetadata {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;

  // Required fields
  if (typeof obj.id !== "string" || obj.id.trim().length === 0) return false;
  if (typeof obj.name !== "string" || obj.name.trim().length === 0)
    return false;

  // Optional fields with type validation
  if (obj.order !== undefined && typeof obj.order !== "number") return false;
  if (obj.description !== undefined && typeof obj.description !== "string")
    return false;
  if (obj.image !== undefined && typeof obj.image !== "string") return false;
  if (obj.logo !== undefined && typeof obj.logo !== "string") return false;
  if (obj.accent !== undefined && typeof obj.accent !== "string") return false;

  // Validate tags if present
  if (obj.tags !== undefined) {
    if (!Array.isArray(obj.tags)) return false;
    if (!obj.tags.every((tag) => typeof tag === "string")) return false;
  }

  // Validate published if present
  if (obj.published !== undefined && typeof obj.published !== "boolean")
    return false;

  return true;
}

export class ProjectValidationError extends Error {
  constructor(
    public projectPath: string,
    message: string,
  ) {
    super(`Project validation failed at ${projectPath}: ${message}`);
    this.name = "ProjectValidationError";
  }
}
