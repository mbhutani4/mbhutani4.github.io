import { FC, useEffect, useRef } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { Project } from "helpers/typeDefinitions";
import Section, { Screen } from "components/Section";
import CrossFade from "components/CrossFade";
import color from "styles/color";
import useOnScreen from "helpers/useOnScreen";
import { ButtonOutline } from "./Button";

const Background: FC<Project> = ({ name, images }) =>
  images.length > 0 ? (
    <>
      <CrossFade images={images} name={name} />
      <Screen />
    </>
  ) : null;

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
    <Image
      src={logo}
      alt={name}
      height="60px"
      width="60px"
      objectFit="contain"
      layout="fixed"
      loading="lazy"
      objectPosition="left center"
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
  const { id, name, images, description } = project;
  const backgroundImage = typeof images === "string" ? images : images?.[0];
  const backgroundColor = backgroundImage ? "inherit" : color.white;
  const textColor = backgroundImage ? color.text.inverse : color.text.primary;

  const { isIntersecting, ref } = useOnScreen();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isIntersecting) {
      changeSlideId(id);
      buttonRef.current?.focus();
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
          ref={buttonRef}
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
