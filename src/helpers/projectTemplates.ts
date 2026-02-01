import type { ProjectMetadata } from "./typeDefinitions";

/**
 * Project metadata with sensible defaults for new projects
 */
export interface ProjectAuthorConfig extends Partial<ProjectMetadata> {
  id: string;
  name: string;
}

/**
 * Generates frontmatter YAML string from project metadata
 * Ensures consistent formatting across all project files
 */
export function generateProjectFrontmatter(
  metadata: ProjectAuthorConfig,
): string {
  const { id, name, image, description, accent, tags, order = 0 } = metadata;

  const frontmatter = [
    `id: ${id}`,
    `name: ${name}`,
    image ? `image: ${image}` : "image: ./project.jpg",
    description ? `description: ${description}` : null,
    accent ? `accent: "${accent}"` : null,
    `order: ${order}`,
  ]
    .filter(Boolean)
    .join("\n");

  const tagsYaml =
    tags && tags.length > 0
      ? `tags:\n${tags.map((t) => `  - ${t}`).join("\n")}`
      : null;

  return `---\n${frontmatter}${tagsYaml ? `\n${tagsYaml}` : ""}\n---`;
}

/**
 * Generates a complete project markdown template
 * Provides a starting point for new project documentation
 */
export function generateProjectTemplate(
  metadata: ProjectAuthorConfig,
  includeExamples = true,
): string {
  const { name } = metadata;
  const frontmatter = generateProjectFrontmatter(metadata);

  const template = `${frontmatter}

# ${name}

## The Application

<!-- Describe what the project is about -->

![Hero Image](./project.jpg)

## My Role

<!-- Explain your role and contributions -->

## The Challenge

<!-- What problem did you solve? -->

## The Approach

<!-- How did you approach the problem? -->`;

  if (!includeExamples) {
    return template;
  }

  return `${template}

## Example Section

<!-- Add more sections as needed -->

![Example](./example.jpg)`;
}

/**
 * Validates project metadata has all required fields
 * Returns validation errors with helpful messages
 */
export function validateProjectConfig(config: Partial<ProjectAuthorConfig>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.id || typeof config.id !== "string" || config.id.trim() === "") {
    errors.push("id is required and must be a non-empty string");
  }

  if (
    !config.name ||
    typeof config.name !== "string" ||
    config.name.trim() === ""
  ) {
    errors.push("name is required and must be a non-empty string");
  }

  if (config.id && !/^[a-z0-9-]+$/.test(config.id)) {
    errors.push("id must contain only lowercase letters, numbers, and hyphens");
  }

  if (config.order !== undefined && typeof config.order !== "number") {
    errors.push("order must be a number");
  }

  if (
    config.tags &&
    (!Array.isArray(config.tags) ||
      !config.tags.every((tag) => typeof tag === "string"))
  ) {
    errors.push("tags must be an array of strings");
  }

  if (config.accent && !/^#?[0-9a-fA-F]{6}$/.test(config.accent)) {
    errors.push("accent must be a valid hex color code");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Common project tags used across the portfolio
 * Helps maintain consistency
 */
export const COMMON_PROJECT_TAGS = [
  "design",
  "mobile",
  "desktop",
  "web",
  "sketch",
  "figma",
  "prototyping",
  "research",
  "ux",
  "ui",
  "case-study",
  "branding",
] as const;

export type CommonProjectTag = (typeof COMMON_PROJECT_TAGS)[number];

/**
 * Predefined color accents for consistency
 */
export const PROJECT_ACCENT_COLORS = {
  primary: "#FF6B6B",
  success: "#51CF66",
  warning: "#FFA94D",
  info: "#74C0FC",
  accent: "#FFD93D",
  secondary: "#A8E6CF",
} as const;
