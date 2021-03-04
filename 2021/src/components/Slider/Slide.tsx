import styled from "@emotion/styled";
import color from "styles/color";

interface SlideProps {
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
}

const Slide = styled.section<SlideProps>`
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

export default Slide;
