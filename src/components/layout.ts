import styled from "@emotion/styled";
import { Color } from "styles";

export const Section = styled.section`
  padding: 6em 4em;
  background-color: transparent;
`;

export const HeroSection = styled(Section)`
  padding: 10em 4em;
  background-color: ${Color.Background_Secondary};
`;
