import { FC } from "react";
import styled from "@emotion/styled";
// import color from "styles/color";

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
    </Container>
  );
};

export default Footer;
