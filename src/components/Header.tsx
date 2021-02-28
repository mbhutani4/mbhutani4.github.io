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
  text-shadow: -2px -2px 4px #fff, 2px 2px 8px #ccc;

  margin-bottom: -10px;
`;

const SubHeading = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  opacity: 0.8;
  text-shadow: -1px -1px 2px #fff;
`;

const Logo: FC = () => {
  return (
    <div style={{ width: "max-content" }}>
      <Heading>Mahima Bhutani</Heading>
      <SubHeading>UI/UX Designer</SubHeading>
    </div>
  );
};

const Header: FC<HeaderProps> = ({ isVisible }) => {
  return isVisible ? (
    <Container>
      <Logo />
    </Container>
  ) : null;
};

export default Header;
