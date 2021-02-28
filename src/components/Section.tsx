import styled from "@emotion/styled";
import color from "styles/color";

interface SectionProps {
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
}

const Section = styled.section<SectionProps>`
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;

  background: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${(props) => props.backgroundColor || color.white};
  color: ${(props) => props.textColor || color.black};
`;

export const Screen = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    to top,
    ${color.black50} 5%,
    ${color.transparent}
  );
`;

export default Section;
