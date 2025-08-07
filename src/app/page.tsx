import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import TechStack from '@/components/TechStack';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutMe />
      <TechStack />
    </main>
  );
}
