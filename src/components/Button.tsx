import styled from "@emotion/styled";
import { Color } from "styles";

export const Button = styled.button`
  width: auto;
  height: auto;
  border-radius: 8px;
  padding: 8px 16px;
  background: ${Color.Background_Primary};
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: ${Color.Text_Secondary};
  fill: ${Color.Text_Secondary};
  border: 2px solid ${Color.Border};

  &:hover {
    background: ${Color.Background_Disabled};
    color: ${Color.Text_Primary};
    fill: ${Color.Text_Primary};
  }
`;

export const IconButton = styled(Button)`
  padding: 0.25em;
  height: 2em;
  width: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonOutline = styled(Button)`
  border: 2px solid ${Color.Border};
  background: none;
  color: ${Color.Text_Primary};

  &:focus {
    background: ${Color.Background_Disabled};
  }

  &:hover {
    background: ${Color.Background_Inverse};
    color: ${Color.Text_Inverse};
  }

  &:active {
    background: ${Color.Background_Primary};
  }
`;

// export const ButtonOutlineDark = styled(Button)`
//   border: 2px solid black;
//   color: black;
//   background: none;

//   &:focus {
//     background: #fff4;
//   }

//   &:hover {
//     background: black;
//     color: white;
//     border: 2px solid black;
//   }

//   &:active {
//     background: #333;
//   }
// `;

export default Button;
