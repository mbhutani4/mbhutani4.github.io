import { FC, useEffect } from "react";
import styled from "@emotion/styled";
import { Project } from "helpers/typeDefinitions";
import Section from "components/Slider/Slide";
import Screen from "components/Slider/Screen";
import color from "styles/color";
import useOnScreen from "helpers/useOnScreen";
import { ButtonOutline } from "../ui/Button";

const Background: FC<Project> = ({ name, image }) => (
  <>
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
    <Screen />
  </>
);
const TextBlock = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  right: 40px;
  height: auto;
  font-size: 1rem;
  line-height: 1.5;
  max-width: 400px;

  a {
    font-weight: bold;
  }
`;

const Logo: FC<Project> = ({ logo, name }) =>
  logo ? (
    <img
      src={logo}
      alt={name}
      style={{
        height: "60px",
        width: "60px",
        objectFit: "contain",
        objectPosition: "left center",
      }}
    />
  ) : null;

const Heading = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0;
  text-shadow: -2px 2px 4px #000;
`;

const Description = styled.p``;

const ProjectSlide: FC<{
  project: Project;
  changeSlideId: (id: string) => void;
}> = ({ project, changeSlideId }) => {
  const { id, name, image, description } = project;
  const backgroundImage = image;
  const backgroundColor = backgroundImage ? "inherit" : color.white;
  const textColor = backgroundImage ? color.text.inverse : color.text.primary;

  const { isIntersecting, ref } = useOnScreen();
  console.log(project.id);

  useEffect(() => {
    if (isIntersecting) {
      changeSlideId(id);
    }
  }, [isIntersecting]);

  return (
    <Section {...{ backgroundColor, textColor }} id={id} ref={ref}>
      <Background {...project} />
      <TextBlock>
        <Logo {...project} />
        <Heading>{name}</Heading>
        {description && <Description>{description}</Description>}
        <ButtonOutline
          onClick={() => {
            window.location.href = `/project/${id}`;
          }}
        >
          Read more
        </ButtonOutline>
      </TextBlock>
    </Section>
  );
};

export default ProjectSlide;
