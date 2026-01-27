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
      className="bg-background-primary text-(--color-text-secondary)"
      style={{ "--accent": project.accent } as CSSProperties}
    >
      <main className="markdown mx-auto max-w-3xl px-5 py-5 md:px-6">
        <ReactMarkdown remarkPlugins={[gfm]}>{markdown}</ReactMarkdown>
      </main>
    </section>
  );
}
