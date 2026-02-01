import { HeroSection } from "components/Section";
import { Heading, SubHeading, Paragraph } from "components/Text";

export default function About(): React.ReactElement {
  return (
    <HeroSection id="about">
      <div className="max-w-2xl">
        <Heading>Hi, I'm Mahima</Heading>
        <SubHeading className="text-accent mt-2 mb-8 block">
          UX/UI Designer
        </SubHeading>
        <Paragraph className="text-lg">
          Designer with 7+ years of experience designing intuitive, scalable
          digital experiences across web and mobile platforms. Specialization in
          information architecture, interaction design, design systems, and
          accessibility. Track record leading cross-functional teams to deliver
          user-centered solutions for complex enterprise and consumer products.
        </Paragraph>
      </div>
    </HeroSection>
  );
}
