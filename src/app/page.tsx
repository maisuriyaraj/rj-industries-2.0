import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Stack } from '@/components/sections/Stack';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
