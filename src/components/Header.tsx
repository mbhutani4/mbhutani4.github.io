import { FC } from "react";
import styled from "@emotion/styled";

interface HeaderProps {
  isVisible: boolean;
}

const Container = styled.aside`
  position: fixed;
  z-index: 10;
  top: 40px;
  left: 40px;
  right: 40px;
  height: auto;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const Header: FC<HeaderProps> = ({ isVisible }) => {
  return isVisible ? (
    <Container>
      <Heading>Mahima Bhutani</Heading>
    </Container>
  ) : null;
};

export default Header;
