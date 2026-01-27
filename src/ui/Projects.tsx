"use client";

import Link from "next/link";
import Image from "next/image";
import { Section } from "components/Section";
import { SubHeading, Paragraph, Heading } from "components/Text";
import useFilterRow from "components/Filters";
import { Project } from "helpers/typeDefinitions";
import { capitalise } from "helpers/tags";
import type { ReactElement } from "react";

export default function Projects({
  projects,
}: {
  projects: Project[];
}): ReactElement {
  const { filteredProjects, toggleTag, renderedFilterRow } =
    useFilterRow(projects);
  return (
    <Section id="projects" className="bg-[var(--color-background-primary)]">
      <SubHeading>Projects</SubHeading>
      {renderedFilterRow}
      {filteredProjects.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProjects.map((project) => (
            <ProjectCard {...project} key={project.id} toggleTag={toggleTag} />
          ))}
        </div>
      ) : (
        <Paragraph>
          No projects match the filters. Try with different filters.
        </Paragraph>
      )}
    </Section>
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
    <article className="group flex h-full min-h-[400px] w-full flex-col">
      <Link href={linkHref}>
        <div className="CardImage relative h-[300px] w-full overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
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
                className="mr-2 cursor-pointer text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
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
