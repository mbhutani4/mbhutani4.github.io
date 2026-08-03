"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Paragraph } from "components/Text";
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
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:grid-cols-3 animate-stagger">
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
  published,
  year,
  role,
  accent,
  toggleTag,
}: Project & { toggleTag: (tag: string) => void }): ReactElement {
  const linkHref = "/project/" + id;
  const isDraft = published !== true;

  return (
    <article
      className="group relative flex h-full min-h-100 w-full flex-col overflow-hidden rounded-2xl border border-transparent bg-background-primary transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-2xl focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent"
      style={{ "--accent": accent } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-linear-to-br from-accent/0 via-accent/0 to-accent/0 transition-all duration-300 group-hover:from-accent/5 group-hover:to-accent/10"
        aria-hidden="true"
      ></div>

      {isDraft && (
        <div className="absolute top-3 right-3 z-20 flex gap-2 flex-wrap justify-end">
          <div
            className="bg-yellow-500/90 text-yellow-900 text-xs font-semibold px-2 py-1 rounded"
            title="This is a draft project"
            aria-label="Draft project"
          >
            📝 Draft
          </div>
        </div>
      )}

      <Link href={linkHref} className="relative block shrink-0 overflow-hidden">
        <div className="CardImage relative h-64 w-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : null}
          <div
            className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent"
            aria-hidden="true"
          ></div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-2xl font-semibold leading-tight text-white drop-shadow-md">
              {name}
            </h3>
          </div>
        </div>
      </Link>

      <div className="relative z-10 flex w-full flex-1 flex-col p-5 pt-4">
        {(year || role) && (
          <p className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-widest text-text-disabled">
            {year ? <span>{year}</span> : null}
            {role ? <span className="text-accent">{role}</span> : null}
          </p>
        )}

        {description ? (
          <Paragraph className="my-2 max-w-full text-base">
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
