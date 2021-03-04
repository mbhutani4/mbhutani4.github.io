import { FC } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { IconButton } from "components/ui/Button";
import IconDown from "icons/Down";
import color from "styles/color";

interface HeaderProps {
  isVisible: boolean;
  showBackButton?: boolean | string;
}

const Container = styled.aside<{ position: "fixed" | "absolute" }>`
  position: ${(p) => p.position};
  z-index: 10;
  top: 40px;
  left: 40px;
  right: 40px;
  height: auto;
  display: flex;

  button {
    margin: 10px 20px 0 -20px;
    svg {
      transform: rotate(90deg);
    }
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0;
  text-shadow: -2px -2px 4px #fff, 2px 2px 2px #fff4;
  margin-bottom: -10px;
`;

const SubHeading = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  opacity: 0.8;
  text-shadow: -1px -1px 2px #fff, 1px 1px 1px #fff4;
`;

const Logo: FC<{ light?: boolean }> = ({ light }) => {
  const router = useRouter();
  return (
    <div
      style={{
        width: "max-content",
        cursor: "pointer",
        color: light ? color.white : color.black,
      }}
      onClick={() => router.push("/")}
    >
      <Heading style={light ? { textShadow: "unset" } : {}}>
        Mahima Bhutani
      </Heading>
      <SubHeading style={light ? { textShadow: "unset" } : {}}>
        UI/UX Designer
      </SubHeading>
    </div>
  );
};

const Header: FC<HeaderProps> = ({ isVisible, showBackButton }) => {
  const router = useRouter();
  const handleBack = () =>
    typeof showBackButton === "string"
      ? router.push(showBackButton)
      : router.back();
  return isVisible ? (
    <Container position={showBackButton ? "absolute" : "fixed"}>
      {showBackButton && (
        <IconButton onClick={handleBack} title={"Back"}>
          <IconDown />
        </IconButton>
      )}
      <Logo light={!!showBackButton} />
    </Container>
  ) : null;
};

export default Header;
