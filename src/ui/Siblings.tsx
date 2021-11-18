import styled from "@emotion/styled";
import Link from "next/link";
import type { Project } from "helpers/typeDefinitions";
import IconDown from "icons/Down";
import IconGrid from "icons/Grid";
import { Color } from "styles";

export default function Siblings({
  next,
  prev,
}: {
  next: Project;
  prev: Project;
}): JSX.Element {
  return (
    <Container id="siblings">
      <Link href={"/project/" + prev.id}>
        <a id="previous">
          <IconDown />
          <br />
          {prev.name}
        </a>
      </Link>
      <Link href={"/#projects"}>
        <a id="home">
          <IconGrid />
          <br />
          {"All projects"}
        </a>
      </Link>

      <Link href={"/project/" + next.id}>
        <a id="next">
          <IconDown />
          <br />
          {next.name}
        </a>
      </Link>
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: auto;
  padding: 2em 0;

  svg {
    fill: ${Color.Accent};
  }

  #previous, #next{
    flex:1;
  }

  #previous svg {
    transform: rotate(90deg);
  }
  #next {
    text-align: right;
    svg {
      transform: rotate(-90deg);
    }
  }
  #home {
    text-align: center;
  }
`;
