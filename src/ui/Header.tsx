import styled from "@emotion/styled";
import { Color } from "styles";
import { Social } from "./Social";

export default function Header(): React.ReactElement {
  return (
    <HeadBar>
      <LogoTitle href="/">Mahima Bhutani</LogoTitle>

      <nav>
        <Social />
      </nav>
    </HeadBar>
  );
}

const HeadBar = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 50;
  margin: 0.5rem;
  padding: 1rem 1.5em;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-direction: row;

  background-color: ${Color.Background_Secondary};
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem 0 #0008;

  animation: drop-top 0.5s;

  @keyframes drop-top {
    from {
      top: -100px;
    }
    to {
      top: 0;
    }
  }

  @media screen and (max-width: 550px) {
    /* flex-direction: column; */
    gap: 0;
    .linkText {
      display: none;
    }
  }
`;

const LogoTitle = styled.a`
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${Color.Text_Primary};
  text-decoration: none;
  cursor: pointer;
`;
