import { FC } from "react";
import styled from "@emotion/styled";
import { Project } from "helpers/typeDefinitions";

interface SliderControlProps {
  isVisible: boolean;
  projects: Project[];
  currentSlideId: string;
}

const Container = styled.nav`
  position: fixed;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: max-content;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Control = styled.button`
  width: 100%;
  padding: 12px 20px;
  margin: 0;
  background: none;
  border: none;
  border-right: 2px solid white;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  text-align: right;

  &.active {
    padding-right: 18px;
    font-weight: bold;
    border-width: 4px;
  }
`;

const SliderControl: FC<SliderControlProps> = (props) => {
  const { isVisible, projects, currentSlideId } = props;

  return isVisible ? (
    <Container>
      {projects.map(({ name, id }) => {
        const isActive = currentSlideId === id;
        return (
          <Control
            key={id}
            className={isActive ? "active" : ""}
            onClick={() => {
              if (!isActive) window.location.hash = id;
            }}
          >
            {name}
          </Control>
        );
      })}
    </Container>
  ) : null;
};

export default SliderControl;
