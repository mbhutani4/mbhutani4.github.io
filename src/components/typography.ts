import styled from "@emotion/styled";
import { Color } from "../styles";

export const Heading = styled.h1`
  font-size: 3em;
  font-weight: bold;
  color: ${Color.Text_Primary};
`;

export const SubHeading = styled.h2`
  display: inline-block;
  font-size: 1.5em;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${Color.Text_Disabled};
`;

export const Paragraph = styled.p`
  color: ${Color.Text_Secondary};
  margin: 1em 0;
  max-width: 40em;
`;
