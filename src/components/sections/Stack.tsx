import { Section } from '../ui/Section';
import { SkillGrid } from '../stack/SkillGrid';
import { StackExplorer } from '../stack/StackExplorer';

export function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title="How my stack fits together"
      intro="Three layers, one request. Pick a layer to see what I’ve built with it, or send a request and watch it travel from the React UI to PostgreSQL and back."
      className="border-y border-line bg-surface-2/40"
    >
      <StackExplorer />
      <SkillGrid />
    </Section>
  );
}
