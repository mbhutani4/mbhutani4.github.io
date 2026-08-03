import { Section } from "components/Section";
import { Heading, Paragraph } from "components/Text";
import IconLinkedIn from "icons/LinkedIn";
import IconMail from "icons/Mail";

export default function Contact(): React.ReactElement {
  return (
    <Section
      id="contact"
      className="bg-linear-to-br from-background-primary to-background-secondary py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Heading className="text-3xl md:text-4xl">Let's work together</Heading>
        <Paragraph className="mx-auto mt-4 max-w-xl text-lg">
          Have a project in mind or want to talk about design, research, or
          accessibility? I'd love to hear from you.
        </Paragraph>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:mahima@bhutani.design"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-xl active:scale-95 hover:no-underline"
          >
            <span className="h-4 w-4 fill-current">
              <IconMail />
            </span>
            mahima@bhutani.design
          </a>
          <a
            href="https://www.linkedin.com/in/mahimabhutani/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-(--color-border) bg-transparent px-6 py-3 font-semibold text-text-primary transition-all duration-200 hover:border-accent hover:text-accent active:scale-95 hover:no-underline"
          >
            <span className="h-4 w-4 fill-current">
              <IconLinkedIn />
            </span>
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
}
