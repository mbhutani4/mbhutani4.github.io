import styled from "@emotion/styled";
import { Color } from "styles";

export const Section = styled.section`
  padding: 6em 4em;
  position: relative;
  background-color: transparent;
  background-size: cover;
  background-position: center;
`;

export const HeroSection = styled(Section)`
  padding: 10em 4em;
  background-color: ${Color.Background_Secondary};
`;
