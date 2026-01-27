import styled from "@emotion/styled";
import { IconButton } from "components/Button";
import IconDown from "icons/Down";
import { Color } from "styles";
import { Social } from "./Social";

export default function Footer(): React.ReactElement {
  return (
    <Container>
      <Content>
        <span style={{ fontSize: "0.8em" }}>
          © 2018-{new Date().getFullYear()} Mahima Bhutani
        </span>
        <Social />
      </Content>
      <ScrollToTop
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
        title={"Scroll to top"}
      >
        <IconDown />
      </ScrollToTop>
    </Container>
  );
}

const Container = styled.footer`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: center;
  border-top: 1px solid ${Color.Border};
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
`;

const ScrollToTop = styled(IconButton)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: auto;
  height: auto;

  svg {
    height: 1em;
    width: 1em;
    transform: rotate(180deg);
  }
`;
