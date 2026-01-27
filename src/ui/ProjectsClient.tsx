"use client";

import Link from "next/link";
import Image from "next/image";
import { Paragraph, Heading } from "components/Text";
import useFilterRow from "components/Filters";
import { Project } from "helpers/typeDefinitions";
import { capitalise } from "helpers/tags";
import type { ReactElement } from "react";

export default function ProjectsClient({
  projects,
}: {
  projects: Project[];
}): ReactElement {
  const { filteredProjects, toggleTag, renderedFilterRow } =
    useFilterRow(projects);

  if (filteredProjects.length === 0) {
    return (
      <div className="mt-4">
        {renderedFilterRow}
        <Paragraph>
          No projects match the filters. Try with different filters.
        </Paragraph>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {renderedFilterRow}
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredProjects.map((project) => (
          <ProjectCard {...project} key={project.id} toggleTag={toggleTag} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  id,
  name,
  image,
  description,
  tags = [],
  toggleTag,
}: Project & { toggleTag: (tag: string) => void }): ReactElement {
  const linkHref = "/project/" + id;

  return (
    <article className="group flex h-full min-h-100 w-full flex-col">
      <Link href={linkHref}>
        <div className="CardImage relative h-75 w-full overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          ) : null}
        </div>
      </Link>
      <div className="relative w-full flex-1 py-4">
        <Link href={linkHref}>
          <Heading as="h3" className="text-2xl font-semibold">
            {name}
          </Heading>
        </Link>
        {description ? (
          <Paragraph className="max-w-full text-base">
            {description} <Link href={linkHref}>Read more.</Link>
          </Paragraph>
        ) : null}
        {tags.length > 0 ? (
          <Paragraph className="max-w-full text-base">
            {tags.map((tag) => (
              <a
                key={tag}
                className="mr-2 cursor-pointer text-(--color-text-secondary) transition-colors hover:text-accent"
                onClick={() => toggleTag(tag)}
              >
                #{capitalise(tag)}
              </a>
            ))}
          </Paragraph>
        ) : null}
      </div>
    </article>
  );
}
