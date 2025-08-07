import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutMe />
      <TechStack />
      <Projects />
    </main>
  );
}
