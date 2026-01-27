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
      className="mx-auto flex max-w-3xl items-center justify-between px-4 py-8 text-text-primary"
    >
      <Link
        href={"/project/" + prev.id}
        id="previous"
        className="flex flex-1 flex-col items-start gap-2 text-left text-text-primary [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-current [&_svg]:text-accent"
      >
        <IconDown className="rotate-90" />
        {prev.name}
      </Link>
      <Link
        href={"/#projects"}
        id="home"
        className="flex flex-col items-center gap-2 text-center [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-current [&_svg]:text-accent"
      >
        <IconGrid />
        {"All projects"}
      </Link>

      <Link
        href={"/project/" + next.id}
        id="next"
        className="flex flex-1 flex-col items-end gap-2 text-right text-text-primary [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-current [&_svg]:text-accent"
      >
        <IconDown className="-rotate-90" />
        {next.name}
      </Link>
    </section>
  );
}
