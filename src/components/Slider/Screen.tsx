import styled from "@emotion/styled";
import color from "styles/color";

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

export default Screen;
