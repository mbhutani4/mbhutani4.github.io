import Link from "next/link";
import type { Project } from "helpers/typeDefinitions";
import IconDown from "icons/Down";
import IconGrid from "icons/Grid";
import type { ReactElement } from "react";

export default function Siblings({
  next,
  prev,
}: {
  next: Project;
  prev: Project;
}): ReactElement {
  return (
    <section
      id="siblings"
      className="mx-auto flex max-w-3xl items-center justify-between px-4 py-12 text-text-primary border-t border-(--color-border)"
    >
      <Link
        href={"/project/" + prev.id}
        id="previous"
        className="flex flex-1 flex-col items-start gap-2 text-left text-text-primary transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded px-2 py-2 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-current [&_svg]:text-accent [&_svg]:transition-transform [&_svg]:group-hover:scale-110"
        aria-label={`Previous project: ${prev.name}`}
      >
        <span className="text-sm text-text-disabled uppercase tracking-wider">
          Previous
        </span>
        <IconDown className="rotate-90" />
        <span className="font-semibold">{prev.name}</span>
      </Link>
      <Link
        href={"/#projects"}
        id="home"
        className="flex flex-col items-center gap-2 text-center transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded px-2 py-2 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-current [&_svg]:text-accent [&_svg]:transition-transform [&_svg]:hover:scale-125"
        aria-label="Back to all projects"
      >
        <IconGrid />
        <span className="text-sm font-semibold">{"All projects"}</span>
      </Link>

      <Link
        href={"/project/" + next.id}
        id="next"
        className="flex flex-1 flex-col items-end gap-2 text-right text-text-primary transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded px-2 py-2 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-current [&_svg]:text-accent [&_svg]:transition-transform [&_svg]:group-hover:scale-110"
        aria-label={`Next project: ${next.name}`}
      >
        <span className="text-sm text-text-disabled uppercase tracking-wider">
          Next
        </span>
        <IconDown className="-rotate-90" />
        <span className="font-semibold">{next.name}</span>
      </Link>
    </section>
  );
}
