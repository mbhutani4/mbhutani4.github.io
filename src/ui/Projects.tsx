import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
// import { Color } from "styles";
import { Section } from "components/layout";
import { SubHeading, Paragraph, Heading } from "components/typography";
import useFilterRow from "components/Filters";
import { Project } from "helpers/typeDefinitions";
import { capitalise } from "helpers/tags";
import { Color } from "styles";

export default function Projects({
  projects,
}: {
  projects: Project[];
}): JSX.Element {
  const { filteredProjects, toggleTag, renderedFilterRow } =
    useFilterRow(projects);
  return (
    <Section id="projects">
      <SubHeading>Projects</SubHeading>
      {renderedFilterRow}
      {filteredProjects.length > 0 ? (
        <ProjectGrid>
          {filteredProjects.map((project) => (
            <ProjectCard {...project} key={project.id} toggleTag={toggleTag} />
          ))}
        </ProjectGrid>
      ) : (
        <Paragraph>
          No projects match the filters. Try with different filters.
        </Paragraph>
      )}
    </Section>
  );
}

function ProjectCard({
  id,
  name,
  image,
  description,
  tags = [],
  toggleTag,
}: Project & { toggleTag: (tag: string) => void }): JSX.Element {
  const linkHref = "/project/" + id;

  return (
    <Card>
      <Link href={linkHref}>
        <CardImage>
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            alt={name}
            loading="eager"
          />
        </CardImage>
      </Link>
      <CardData>
        <Link href={linkHref}>
          <a>
            <CardTitle as="h3">{name}</CardTitle>
          </a>
        </Link>
        {description ? (
          <CardText>
            {description}{" "}
            <Link href={linkHref}>
              <a>Read more.</a>
            </Link>
          </CardText>
        ) : null}
        {tags.length > 0 ? (
          <CardText>
            {tags.map((tag) => (
              <a onClick={() => toggleTag(tag)}>#{capitalise(tag)} </a>
            ))}
          </CardText>
        ) : null}
      </CardData>
    </Card>
  );
}

const ProjectGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2em;
`;

const Card = styled.article`
  flex: 1;
  width: 100%;
  min-width: 250px;
  min-height: 400px;
  position: relative;
`;

const CardImage = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  height: 300px;
  position: relative;
  cursor: pointer;
`;

const CardData = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding: 1em 0;
`;

const CardTitle = styled(Heading)`
  font-size: 1.5em;
  font-weight: normal;
  /* color: ${Color.Accent}; */
`;

const CardText = styled(Paragraph)`
  font-size: 1;
  font-weight: normal;
  /* color: ${Color.Accent}; */
  max-width: 100%;
`;
