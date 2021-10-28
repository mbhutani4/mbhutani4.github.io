import styled from "@emotion/styled";
import { Color } from "styles";

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
  background-color: ${(props) =>
    props.backgroundColor || Color.Background_Primary};
  color: ${(props) => props.textColor || Color.Text_Primary};
`;

export default Slide;
