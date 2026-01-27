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
}): React.ReactElement {
  return (
    <Container id="siblings">
      <Link href={"/project/" + prev.id} id="previous">
        <IconDown />
        <br />
        {prev.name}
      </Link>
      <Link href={"/#projects"} id="home">
        <IconGrid />
        <br />
        {"All projects"}
      </Link>

      <Link href={"/project/" + next.id} id="next">
        <IconDown />
        <br />
        {next.name}
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

  #previous,
  #next {
    flex: 1;
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
