import { ProjectGrid } from '../projects/ProjectGrid';
import { Section } from '../ui/Section';

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I’ve built"
      intro="From a multi-tenant SaaS to client front ends and college projects. Hover a card to preview it, or open the full demo."
    >
      <ProjectGrid />
    </Section>
  );
}
