import styled from "@emotion/styled";

export const Button = styled.button`
  width: auto;
  height: auto;
  border-radius: 8px;
  padding: 8px 16px;
  background: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid #000;
  }
`;

export const IconButton = styled(Button)`
  padding: 4px;
  height: 40px;
  width: 40px;
`;

export const ButtonOutline = styled(Button)`
  border: 2px solid white;
  background: none;
  color: white;

  &:focus {
    background: #fff4;
  }

  &:hover {
    background: white;
    color: black;
    border: 2px solid white;
  }

  &:active {
    background: #ddd;
  }
`;

export const ButtonOutlineDark = styled(Button)`
  border: 2px solid black;
  color: black;
  background: none;

  &:focus {
    background: #fff4;
  }

  &:hover {
    background: black;
    color: white;
    border: 2px solid black;
  }

  &:active {
    background: #333;
  }
`;

export default Button;
