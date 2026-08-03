import { HeroSection } from "components/Section";
import { Heading, SubHeading, Paragraph } from "components/Text";

export default function About(): React.ReactElement {
  return (
    <HeroSection
      id="about"
      className="bg-linear-to-br from-background-secondary via-background-secondary to-background-disabled animate-fade-in-up"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12">
        <div className="animate-fade-in-up">
          <SubHeading className="text-accent mb-4 block text-xl animate-slide-in-right">
          Lead Product Designer | UX/UI 
          </SubHeading>
          <Heading className="text-4xl md:text-5xl leading-tight">
            Hi, I'm Mahima
          </Heading>
          <Paragraph className="mt-6 text-lg leading-8 animate-fade-in-up font-light">
            Design Leader with over 7 years of experience building intuitive, scalable digital experiences across web, mobile, and AI-first platforms. Proven track record of leading cross-functional teams through the complexities of intelligence-led design, from initial concept to high-stakes client delivery. I specialize in bridging the gap between emerging technology and business value, having successfully pitched and sold complex AI design initiatives to enterprise and consumer clients alike.
          </Paragraph>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-xl active:scale-95 hover:no-underline"
            >
              View selected work
            </a>
            <a
              href="mailto:mahima@bhutani.design"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-(--color-border) bg-transparent px-6 py-3 font-semibold text-text-primary transition-all duration-200 hover:border-accent hover:text-accent active:scale-95 hover:no-underline"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </HeroSection>
  );
}
