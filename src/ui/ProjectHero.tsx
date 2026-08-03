import type { CSSProperties, ReactElement } from "react";
import type { Project } from "helpers/typeDefinitions";
import { capitalise } from "helpers/tags";

export default function ProjectHero({
  project,
}: {
  project: Project;
}): ReactElement {
  const { name, description, tags = [], logo, role, client, year, link } =
    project;

  return (
    <section
      className="relative flex min-h-[75vh] items-end overflow-hidden"
      style={{ "--accent": project.accent } as CSSProperties}
      aria-label={`${name} project overview`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})` }}
        aria-hidden="true"
      ></div>

      {/* Readability + accent gradient overlays */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50"
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent"
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-accent/25 to-transparent"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 pt-40 sm:px-12 md:px-16">
        {logo ? (
          <div className="mb-6 flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={`${name} logo`}
              className="max-h-16 w-auto rounded-lg bg-white/10 object-contain p-2 backdrop-blur-sm"
            />
          </div>
        ) : null}

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg md:text-6xl">
          {name}
        </h1>

        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {description}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {role || client || year ? (
            <dl className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-white/80">
              {role ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Role
                  </dt>
                  <dd className="mt-0.5 font-medium text-white">{role}</dd>
                </div>
              ) : null}
              {client ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Client
                  </dt>
                  <dd className="mt-0.5 font-medium text-white">{client}</dd>
                </div>
              ) : null}
              {year ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Year
                  </dt>
                  <dd className="mt-0.5 font-medium text-white">{year}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-xl active:scale-95 hover:no-underline"
            >
              Visit project
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>

        {tags.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            <li className="sr-only">Tags: </li>
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm"
              >
                {capitalise(tag)}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
