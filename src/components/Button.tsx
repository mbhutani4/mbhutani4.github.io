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
  }

  &:active {
    background: #ddd;
  }
`;

export default Button;
