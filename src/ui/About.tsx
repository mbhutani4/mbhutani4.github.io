import { HeroSection } from "components/layout";
import { Heading, SubHeading, Paragraph } from "components/typography";
import { Color } from "styles";

export default function About(): JSX.Element {
  return (
    <HeroSection id="about">
      <Heading>Hi, I'm Mahima</Heading>
      <SubHeading style={{ color: Color.Accent }}>UX/UI Designer</SubHeading>
      <Paragraph>
       Designer with 7+ years of experience designing intuitive, scalable digital
experiences across web and mobile platforms. Specialization in information
architecture, interaction design, design systems, and accessibility. Track
record leading cross-functional teams to deliver user-centered solutions for
complex enterprise and consumer products.
      </Paragraph>
      <Paragraph>
        I am skilled with Figma and Adobe XD.
      </Paragraph>
    </HeroSection>
  );
}
