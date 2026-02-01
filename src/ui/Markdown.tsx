import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import type { CSSProperties } from "react";
import type { Project } from "helpers/typeDefinitions";

export default function Markdown({
  markdown,
  project,
}: {
  markdown: string;
  project: Project;
}) {
  return (
    <section
      className="bg-background-primary text-(--color-text-secondary) pb-12 md:pb-16 pt-4"
      style={{ "--accent": project.accent } as CSSProperties}
    >
      <article className="markdown mx-auto max-w-3xl px-6 md:px-8 lg:px-12">
        <ReactMarkdown remarkPlugins={[gfm]}>{markdown}</ReactMarkdown>
      </article>
    </section>
  );
}
