import { useCallback, useState } from "react";
import type { Project } from "./typeDefinitions";

export function extractTagsFromProjects(projects: Project[]): string[] {
  return [
    ...new Set(
      projects.flatMap((project) =>
        (project.tags || []).map((tag) => tag.toLowerCase())
      )
    ),
  ];
}

export function useTags() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  console.log(selectedTags);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((previousTags) => {
      const newTags = isContainTag(previousTags, tag)
        ? previousTags.filter((t) => t.toLowerCase() !== tag.toLowerCase())
        : [...previousTags, tag];
      return newTags;
    });
  }, []);

  return { selectedTags, toggleTag };
}

export function isContainTag(tags: string[], selectedTag: string) {
  return tags?.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());
}

export function capitalise(text: string) {
  return `${text[0]!.toUpperCase()}${text.slice(1)}`;
}
