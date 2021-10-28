import { HeroSection } from "components/layout";
import { Heading, SubHeading, Paragraph } from "components/typography";
import { Color } from "styles";

export default function About(): JSX.Element {
  return (
    <HeroSection id="about">
      <Heading>Hi, I'm Mahima</Heading>
      <SubHeading style={{ color: Color.Accent }}>UX/UI Designer</SubHeading>
      <Paragraph>
        I am passionate about using UX/UI and IxD to design user-friendly
        products, environments and systems. I use my skills in user research,
        front end development, user testing, prototyping and heuristic
        evaluation to implement our client’s vision. I love solving problems and
        tackling new challenges. I look to create synergies and cohesion in
        teams to bring out the best performance and exceed expectations.
      </Paragraph>
      <Paragraph>
        I am skilled with Figma, Sketch, Adobe XD and InVision.
      </Paragraph>
    </HeroSection>
  );
}
