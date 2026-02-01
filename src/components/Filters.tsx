"use client";

import { useMemo } from "react";
import type { ReactElement } from "react";
import {
  isContainTag,
  capitalise,
  extractTagsFromProjects,
} from "../helpers/tags";
import { useTags } from "../helpers/useTags";
import { Tag } from "components/Tag";
import { cn } from "helpers/cn";

import type { Project } from "helpers/typeDefinitions";

export default function useFilterRow(projects: Project[]) {
  const { selectedTags, toggleTag } = useTags();
  const tags = extractTagsFromProjects(projects);

  const filteredProjects = useMemo(
    () => filterProjectsWithSelectedTag(projects, selectedTags),
    [projects, selectedTags],
  );

  const renderedFilterRow = (
    <Filters tags={tags} selectedTags={selectedTags} toggleTag={toggleTag} />
  );

  return { filteredProjects, toggleTag, renderedFilterRow };
}

function filterProjectsWithSelectedTag(
  projects: Project[],
  selectedTags: string[],
): Project[] {
  return selectedTags.length > 0
    ? projects.filter((project) =>
        // For AND use `every`; for OR use `some`
        selectedTags.every((selectedTag) =>
          isContainTag(project.tags || [], selectedTag),
        ),
      )
    : projects;
}

export function Filters({
  tags,
  selectedTags,
  toggleTag,
  className,
}: FilterRowProps): ReactElement {
  return (
    <div
      className={cn("my-4 flex flex-wrap", className)}
      role="group"
      aria-label="Filter projects by tags"
    >
      {tags.map((tag) => (
        <Tag
          key={tag}
          onClick={() => toggleTag(tag)}
          data-active={isContainTag(selectedTags, tag)}
          aria-pressed={isContainTag(selectedTags, tag) ? "true" : "false"}
        >
          {capitalise(tag)}
        </Tag>
      ))}
    </div>
  );
}

interface FilterRowProps {
  tags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  className?: string;
}
