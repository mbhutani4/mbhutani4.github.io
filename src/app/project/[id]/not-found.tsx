import { HeroSection } from "components/Section";
import { Heading, Paragraph } from "components/Text";

export default function NotFound() {
  return (
    <HeroSection className="min-h-screen bg-gradient-to-b from-background-primary to-background-secondary py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-accent mb-4">404</div>
          <Heading as="h1" className="text-4xl mb-4">
            Project Not Found
          </Heading>
        </div>

        <Paragraph className="text-lg mb-8 text-text-secondary max-w-lg mx-auto">
          The project you're looking for doesn't exist. It may have been moved,
          deleted, or the link might be incorrect.
        </Paragraph>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/#projects"
            className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors"
          >
            View All Projects
          </a>
        </div>
      </div>
    </HeroSection>
  );
}
