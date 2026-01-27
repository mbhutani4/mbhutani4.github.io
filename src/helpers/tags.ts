import type { Project } from "./typeDefinitions";

export function extractTagsFromProjects(projects: Project[]): string[] {
  return [
    ...new Set(
      projects.flatMap((project) =>
        (project.tags || []).map((tag) => tag.toLowerCase()),
      ),
    ),
  ];
}

export function isContainTag(tags: string[], selectedTag: string) {
  return tags?.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());
}

export function capitalise(text: string) {
  return `${text[0]!.toUpperCase()}${text.slice(1)}`;
}
