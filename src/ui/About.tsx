import { HeroSection } from "components/Section";
import { Heading, SubHeading, Paragraph } from "components/Text";

export default function About(): React.ReactElement {
  return (
    <HeroSection
      id="about"
      className="bg-linear-to-br from-background-secondary via-background-secondary to-background-disabled animate-fade-in-up"
    >
      <div className="max-w-2xl relative z-10">
        <Heading className="animate-fade-in-up text-4xl md:text-5xl leading-tight">
          Hi, I'm Mahima
        </Heading>
        <SubHeading className="text-accent mt-4 mb-8 block text-xl animate-slide-in-right">
          Senior UX/UI Designer
        </SubHeading>
        <Paragraph className="text-lg leading-8 animate-fade-in-up font-light">
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
