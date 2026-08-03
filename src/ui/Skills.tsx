import { Section } from "components/Section";
import { SubHeading, Heading } from "components/Text";

const SKILL_GROUPS: Array<{ label: string; items: string[] }> = [
  {
    label: "Methods",
    items: [
      "User Research",
      "Interviews",
      "Usability Testing",
      "Personas & Scenarios",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Accessibility",
    ],
  },
  {
    label: "Tools",
    items: [
      "Figma",
      "Sketch",
      "Balsamiq",
      "Miro",
      "Adobe CC",
      "Tailwind CSS",
      "HTML / CSS",
      "React",
    ],
  },
  {
    label: "Domains",
    items: [
      "Enterprise SaaS",
      "FinTech",
      "Logistics",
      "Consumer Apps",
      "Travel & Tourism",
      "EdTech",
    ],
  },
];

export default function Skills(): React.ReactElement {
  return (
    <Section
      id="skills"
      className="bg-background-secondary py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SubHeading className="animate-fade-in-up text-2xl">
          Expertise
        </SubHeading>
        <div className="mt-4 h-1 w-16 rounded-full bg-accent"></div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="animate-fade-in-up">
              <Heading as="h3" className="text-xl md:text-2xl">
                {group.label}
              </Heading>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-(--color-border) bg-background-primary px-3.5 py-1.5 text-sm text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
