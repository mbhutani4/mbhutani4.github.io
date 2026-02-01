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
        <Paragraph role="status" aria-live="polite">
          No projects match the filters. Try with different filters.
        </Paragraph>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {renderedFilterRow}
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 animate-stagger">
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
    <article className="group flex h-full min-h-100 w-full flex-col rounded-xl overflow-hidden hover:shadow-2xl hover:border-accent active:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent bg-background-primary border border-transparent hover:border-accent/30 relative">
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/10 transition-all duration-300 pointer-events-none rounded-xl"></div>

      <Link href={linkHref} className="relative overflow-hidden shrink-0">
        <div className="CardImage relative h-75 w-full overflow-hidden rounded-t-xl transition-all duration-300 group-hover:scale-110 group-active:scale-105 group-active:brightness-110">
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
      <div className="relative w-full flex-1 py-6 px-4 flex flex-col z-10">
        <Link
          href={linkHref}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Heading
            as="h3"
            className="text-2xl font-semibold hover:text-accent transition-colors group-active:text-accent"
          >
            {name}
          </Heading>
        </Link>
        {description ? (
          <Paragraph className="max-w-full text-base">
            {description}{" "}
            <Link
              href={linkHref}
              className="font-semibold text-accent hover:text-accent/80 active:text-accent transition-all duration-200 hover:underline active:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
            >
              Read more
            </Link>
            .
          </Paragraph>
        ) : null}
        {tags.length > 0 ? (
          <div className="max-w-full text-base mt-auto pt-2 border-t border-accent/10">
            <p className="sr-only">Tags for {name}:</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-(--color-text-secondary) transition-all duration-200 hover:text-accent hover:bg-accent/10 active:bg-accent active:text-white active:font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-full text-xs font-medium border border-accent/20 hover:border-accent/50 active:border-accent uppercase tracking-widest"
                  onClick={() => toggleTag(tag)}
                  aria-pressed="false"
                  title={`Filter by ${tag}`}
                >
                  {capitalise(tag)}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
