import { useMemo } from "react";
import styled from "@emotion/styled";
import { Color } from "../styles";
import {
  isContainTag,
  capitalise,
  useTags,
  extractTagsFromProjects,
} from "../helpers/tags";

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
}: FilterRowProps): React.ReactElement {
  return (
    <FilterRow className={className}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          onClick={() => toggleTag(tag)}
          data-active={isContainTag(selectedTags, tag)}
        >
          {capitalise(tag)}
        </Tag>
      ))}
    </FilterRow>
  );
}

interface FilterRowProps {
  tags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  className?: string;
}

const FilterRow = styled.div`
  margin: 1em 0;
  display: flex;
  flex-wrap: wrap;
`;

export const Tag = styled.button`
  padding: 0.5em 1em;
  border-radius: 2em;
  background-color: transparent;
  color: ${Color.Text_Disabled};
  font-size: 1em;
  border: 1px solid ${Color.Border};
  margin: 0.25em;
  cursor: pointer;
  transition:
    background-color 0.5s,
    color 0.5s;

  &:hover {
    background-color: ${Color.Background_Secondary};
    color: ${Color.Accent};
  }

  &[data-active="true"] {
    background-color: ${Color.Accent};
    color: ${Color.White};
  }
`;
