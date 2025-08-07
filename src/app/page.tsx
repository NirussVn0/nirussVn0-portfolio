import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Roadmap from '@/components/Roadmap';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutMe />
      <TechStack />
      <Projects />
      <Roadmap />
    </main>
  );
}
