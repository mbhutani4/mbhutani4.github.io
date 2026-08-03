import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { CSSProperties, ComponentProps, ReactNode } from "react";
import type { Project } from "helpers/typeDefinitions";

/**
 * Sanitization schema for raw HTML embedded in project markdown.
 * Content is authored by the portfolio owner, but we still whitelist
 * the elements/attributes used for expressive layouts (figures,
 * galleries, videos, callouts).
 */
const schema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "figure",
    "figcaption",
    "iframe",
    "video",
    "source",
  ],
  attributes: {
    ...defaultSchema.attributes,
    div: ["class", "className", "data-caption"],
    figure: ["class", "className"],
    figcaption: ["class", "className"],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "class",
      "className",
      "loading",
      "decoding",
    ],
    video: [
      "class",
      "className",
      "src",
      "controls",
      "poster",
      "playsinline",
      "loop",
      "muted",
      "width",
      "height",
    ],
    source: ["src", "type"],
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "allow",
      "allowfullscreen",
      "loading",
    ],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["http", "https"],
  },
};

function childrenToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(childrenToText).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return childrenToText(props?.children);
  }
  return "";
}

/**
 * Renders blockquotes as designed callouts. A blockquote that leads with a
 * bold metric (`> **62%** more efficient`) becomes a highlight stat card.
 */
function MarkdownBlockquote(props: ComponentProps<"blockquote">) {
  const text = childrenToText(props.children).trim();
  const isStat = /^\*\*[\d.,%x+]+\*\*/.test(text);
  return (
    <blockquote
      {...props}
      className={`${props.className ?? ""} ${isStat ? "md-stat" : "md-callout"}`}
    />
  );
}

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
        <ReactMarkdown
          remarkPlugins={[gfm]}
          rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema]]}
          components={{
            blockquote: MarkdownBlockquote,
            img: ({ node: _node, ...props }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...props} loading="lazy" decoding="async" />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </section>
  );
}
