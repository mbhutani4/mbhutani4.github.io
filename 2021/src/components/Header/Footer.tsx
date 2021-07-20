import { FC } from "react";
import styled from "@emotion/styled";
import { IconButton } from "components/ui/Button";
import IconDown from "icons/Down";

const Container = styled.aside`
  padding: 20px;
  width: 800px;
  margin: auto;
  text-align: center;
  border-top: 1px solid #444;
`;

const Footer: FC = () => {
  return (
    <Container>
      © Mahima Bhutani / <a href="mailto:mahima@bhutani.design">Contact</a>
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
};

export default Footer;

const ScrollToTop = styled(IconButton)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: auto;
  height: auto;

  svg {
    transform: rotate(180deg);
  }
`;
