import { FC, useEffect } from "react";
import styled from "@emotion/styled";

import useOnScreen from "helpers/useOnScreen";
import Slide from "components/Slider/Slide";
import color from "styles/color";
import { Button, IconButton } from "components/ui/Button";
import IconMail from "icons/Mail";
import IconLinkedIn from "icons/LinkedIn";
import IconResume from "icons/Resume";
import openExternalLink from "helpers/openExternalLink";
import IconDown from "icons/Down";

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
`;

const Heading = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 3px;
  margin: 0;
  opacity: 0.9;
`;

const SubHeading = styled.h2`
  margin: 0;
  text-transform: uppercase;
  opacity: 0.7;
`;

const Links = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
`;

const ProjectLink = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Start: FC<{
  firstProjectSlideId?: string;
  changeSlideId: (id: string) => void;
}> = ({ changeSlideId, firstProjectSlideId }) => {
  const id = "start";
  const backgroundImage = "/images/start.jpg";
  const backgroundColor = color.white;
  const textColor = color.text.primary;
  const title = "Mahima Bhutani";
  const subtitle = "UI/UX Designer";

  const { isIntersecting, ref } = useOnScreen();

  useEffect(() => {
    if (isIntersecting) changeSlideId(id);
  }, [isIntersecting]);

  return (
    <Slide
      {...{ backgroundColor, textColor, backgroundImage }}
      id={id}
      ref={ref}
    >
      <TextBlock>
        <Heading>{title}</Heading>
        <SubHeading>{subtitle}</SubHeading>
        <Links>
          <Button
            onClick={() => openExternalLink("#" + firstProjectSlideId, "_self")}
          >
            Projects
          </Button>
          <IconButton
            onClick={() => openExternalLink("/MahimaBhutani_Resume.pdf")}
          >
            <IconResume />
          </IconButton>
          <IconButton
            onClick={() =>
              openExternalLink("mailto:mahima@bhutani.design", "_self")
            }
          >
            <IconMail />
          </IconButton>
          <IconButton
            onClick={() =>
              openExternalLink("https://www.linkedin.com/in/mahimabhutani/")
            }
          >
            <IconLinkedIn />
          </IconButton>
        </Links>
      </TextBlock>
      <ProjectLink
        title="Projects"
        onClick={() => openExternalLink("#" + firstProjectSlideId, "_self")}
      >
        <IconDown />
      </ProjectLink>
    </Slide>
  );
};

export default Start;
