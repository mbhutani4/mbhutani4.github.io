import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styled from "@emotion/styled";

import type { CSSProperties } from "react";
import type { Project } from "helpers/typeDefinitions";
import { Color } from "styles";

export default function Markdown({
  markdown,
  project,
}: {
  markdown: string;
  project: Project;
}) {
  return (
    <Container style={{ "--accent": project.accent } as CSSProperties}>
      <main>
        <ReactMarkdown remarkPlugins={[gfm]}>{markdown}</ReactMarkdown>
      </main>
    </Container>
  );
}

const spacing = "20px";

const Container = styled.section`
  color: ${Color.Text_Secondary};
  background-color: ${Color.Background_Primary};

  main {
    max-width: 800px;
    padding: ${spacing};
    margin: auto;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${Color.Text_Primary};
      margin: 1em 0 0.5em;
      /* font-weight: bold; */
    }

    pre,
    code {
      background-color: ${Color.Background_Disabled};
      font-size: 1.2em;
      padding: 4px 8px;
      border-radius: 4px;
    }

    pre > code {
      padding: 0;
      font-size: 1em;
    }

    blockquote {
      font-style: italic;
      border-left: 2px solid ${Color.Border};
      margin-left: 0;
      padding-left: 1em;
    }

    img {
      margin-left: -${spacing};
      width: calc(100% + 2 * ${spacing});
      object-fit: contain;
      border-radius: 5px;
    }

    a {
      color: var(--accent, var(--color-accent, #035abd));
    }

    table {
      &,
      th,
      td {
        border-collapse: collapse;
        border: 1px solid #444;
        text-align: left;
        padding: 2px 4px;
      }
    }

    h1 {
      margin-top: 2em;
      font-size: 2.5em;
      font-weight: bold;
    }
    h2 {
      margin-top: 2em;
      font-size: 2em;
      font-weight: 600;
    }

    h3 {
      font-size: 1.5em;
    }

    h4 {
      font-size: 1.25em;
      font-weight: normal;
    }

    h5 {
      font-size: 1.1em;
    }

    h6 {
      font-size: 1em;
      font-weight: bold;
    }

    p {
      margin-bottom: 1em;
    }
  }
`;
