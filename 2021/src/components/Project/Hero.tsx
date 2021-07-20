import { FC } from "react";
import { Project } from "helpers/typeDefinitions";
import Slide from "components/Slider/Slide";
import styled from "@emotion/styled";
import Header from "components/Header/Header";
import color from "styles/color";

const TextBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  line-height: 1.5;
  min-width: 400px;
  max-width: 800px;
  height: auto;
  text-align: center;
  color: white;
`;

const Heading = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 3px;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0px 4px #000;
`;

const SubHeading = styled.h2`
  margin: 0;
  text-transform: uppercase;
  opacity: 0.7;
`;

const Screen = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.75;
  background: linear-gradient(
    to bottom,
    ${color.black50} 50%,
    rgba(0, 0, 0, 0.25) 100%
  );
`;

const Hero: FC<{ project: Project }> = ({ project }) => {
  const { name, image, description } = project;
  return (
    <Slide
      backgroundImage={image}
      backgroundColor="black"
      style={{ height: "75vh", minHeight: "auto" }}
    >
      <Header isVisible />
      <Screen />
      <TextBlock>
        <Heading>{name}</Heading>
        <SubHeading></SubHeading>
        {description}
      </TextBlock>
    </Slide>
  );
};

export default Hero;
