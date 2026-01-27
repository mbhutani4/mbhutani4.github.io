import styled from "@emotion/styled";
import { Color } from "styles";

export const Tag = styled.button`
  padding: 0.5em 1em;
  border-radius: 2em;
  background-color: transparent;
  color: ${Color.Text_Disabled};
  font-size: 1em;
  border: 1px solid ${Color.Border};
  margin: 0.25em;
  cursor: pointer;
  transition:
    background-color 0.5s,
    color 0.5s;

  &:hover {
    background-color: ${Color.Background_Secondary};
    color: ${Color.Accent};
  }

  &[data-active="true"] {
    background-color: ${Color.Accent};
    color: ${Color.White};
  }
`;
