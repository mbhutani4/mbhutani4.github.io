"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Paragraph } from "components/Text";
import useFilterRow from "components/Filters";
import { cn } from "helpers/cn";
import { Project } from "helpers/typeDefinitions";
import { capitalise } from "helpers/tags";
import IconLock from "icons/Lock";

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
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 2xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 6) * 70}>
            <ProjectCard {...project} toggleTag={toggleTag} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/**
 * Scroll-triggered reveal wrapper. Fades and slides content in once it
 * enters the viewport, with an optional stagger delay. Respects the
 * user's reduced-motion preference.
 */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={inView ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-transform",
        "motion-reduce:transition-none",
        inView
          ? "translate-y-0 opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100"
          : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className,
      )}
    >
      {children}
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
  isProtected,
  toggleTag,
}: Project & { toggleTag: (tag: string) => void }): ReactElement {
  const linkHref = "/project/" + id;
  const isDraft = published !== true;

  return (
    <article
      className="group relative flex h-full min-h-100 w-full flex-col overflow-hidden rounded-2xl border border-transparent bg-background-primary transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-2xl focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent motion-reduce:transition-none"
      style={{ "--accent": accent } as CSSProperties}
    >
      {/* Animated accent bar */}
      <div
        className="absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:scale-x-100"
        aria-hidden="true"
      ></div>

      {/* Accent glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-linear-to-br from-accent/0 via-accent/0 to-accent/0 transition-all duration-300 group-hover:from-accent/5 group-hover:to-accent/10"
        aria-hidden="true"
      ></div>

      {isDraft || isProtected ? (
        <div className="absolute top-3 right-3 z-20 flex gap-2 flex-wrap justify-end">
          {isProtected ? (
            <div
              className="inline-flex items-center gap-1 bg-black/60 px-2 py-1 rounded text-xs font-semibold text-white backdrop-blur-sm"
              title="This project is password protected"
              aria-label="Password protected project"
            >
              <IconLock className="h-3.5 w-3.5 fill-current" />
              Locked
            </div>
          ) : null}
          {isDraft ? (
            <div
              className="bg-yellow-500/90 text-yellow-900 text-xs font-semibold px-2 py-1 rounded"
              title="This is a draft project"
              aria-label="Draft project"
            >
              📝 Draft
            </div>
          ) : null}
        </div>
      ) : null}

      <Link href={linkHref} className="relative block shrink-0 overflow-hidden">
        <div className="CardImage relative h-64 w-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-active:scale-105 motion-reduce:transition-none"
              loading="lazy"
            />
          ) : null}
          <div
            className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent transition-opacity duration-500 group-hover:via-black/30"
            aria-hidden="true"
          ></div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="translate-y-1 text-2xl font-semibold leading-tight text-white drop-shadow-md transition-transform duration-500 ease-out group-hover:translate-y-0 motion-reduce:transform-none">
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
              className="group/read inline-flex items-center gap-1 font-semibold text-accent hover:text-accent/80 active:text-accent transition-all duration-200 hover:underline active:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
            >
              <span>Read more</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover/read:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
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
