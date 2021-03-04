import { FC } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styled from "@emotion/styled";
import { Project } from "helpers/typeDefinitions";

const spacing = "20px";

const Container = styled.section`
  max-width: 800px;
  padding: ${spacing};
  margin: auto;
  color: #444;

  h1 {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #000;
  }

  pre,
  code {
    background-color: #eee;
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
    border-left: 2px solid #ddd;
    margin-left: 0;
    padding-left: 20px;
  }

  img {
    margin-left: -${spacing};
    width: calc(100% + 2 * ${spacing});
    object-fit: contain;
    border-radius: 5px;
  }

  a {
    color: var(--accent, #035abd);
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
`;

const Markdown: FC<{ markdown: string; project: Project }> = ({ markdown }) => (
  <Container>
    <ReactMarkdown allowDangerousHtml plugins={[gfm]} children={markdown} />
  </Container>
);

export default Markdown;
