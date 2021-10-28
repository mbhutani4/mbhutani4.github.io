import type { FC } from "react";
import styled from "@emotion/styled";
import { Project } from "helpers/typeDefinitions";
import Section from "components/Slider/Slide";
import { Color } from "styles";

const Slide = styled(Section)`
  width: 100%;
  min-width: 500px;
  min-height: unset;
  cursor: pointer;
`;

const Background: FC<Project> = ({ name, image }) => (
  <img
    className="top"
    src={image}
    alt={name}
    style={{
      objectFit: "cover",
      width: "100%",
      height: "100%",
    }}
  />
);

const Heading = styled.h2`
  display: none;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0;
  text-shadow: -2px 2px 4px #000;
`;

const TextBlock = styled.div<{ accent?: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: ${(props) =>
      props.accent ? `${props.accent}80` : Color.Text_Secondary};

    h2 {
      display: block;
    }
  }

  a {
    font-weight: bold;
  }
`;

const ProjectSlide: FC<Project> = (project) => {
  const { id, name, image, accent } = project;
  const backgroundImage = image;
  const backgroundColor = backgroundImage
    ? "inherit"
    : Color.Background_Primary;
  const textColor = backgroundImage
    ? Color.Background_Secondary
    : Color.Text_Primary;

  return (
    <Slide
      {...{ backgroundColor, textColor }}
      id={id}
      onClick={() => {
        window.location.href = `/project/${id}`;
      }}
    >
      <Background {...project} />
      <TextBlock accent={accent}>
        <Heading>{name}</Heading>
      </TextBlock>
    </Slide>
  );
};

export default ProjectSlide;
