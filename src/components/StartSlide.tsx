import { FC, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import { Project } from "helpers/typeDefinitions";
import useOnScreen from "helpers/useOnScreen";
import Section, { Screen } from "components/Section";
import color from "styles/color";

const Background: FC<Project & { image?: string }> = ({ image, name }) =>
  image ? (
    <>
      <Image
        src={image}
        alt={name}
        layout="fill"
        objectFit="cover"
        loading="lazy"
        quality="100"
      />
      <Screen />
    </>
  ) : null;

const TextBlock = styled.div`
  position: absolute;
  top: 40px;
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
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
`;

const Description = styled.p``;

const ProjectSlide: FC<{
  project: Project;
  changeSlideId: (id: string) => void;
}> = ({ project, changeSlideId }) => {
  const { id, name, images, description } = project;
  const backgroundImage = images?.[0];
  const backgroundColor = backgroundImage ? "inherit" : color.white;
  const textColor = backgroundImage ? color.text.inverse : color.text.primary;

  const { isIntersecting, ref } = useOnScreen();

  useEffect(() => {
    if (isIntersecting) changeSlideId(id);
  }, [isIntersecting]);

  return (
    <Section {...{ backgroundColor, textColor }} id={id} ref={ref}>
      <Background {...project} image={backgroundImage} />
      <TextBlock>
        <Logo {...project} />
        <Heading>{name}</Heading>
        {description && <Description>{description}</Description>}
        <Link href={`/project/${id}`}>Read more</Link>
      </TextBlock>
    </Section>
  );
};

export default ProjectSlide;
