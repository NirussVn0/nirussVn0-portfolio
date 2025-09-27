'use client';

interface SectionNavigationProps {
  activeSection: string;
}

export function SectionNavigation({ activeSection }: SectionNavigationProps) {
  const sections = ['intro', 'work', 'thoughts', 'connect'];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-4 p-4 border-dotted-thick border-border bg-background">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-3 h-8 border-dotted-thin transition-all duration-500 hover-lift ${
              activeSection === section
                ? 'bg-foreground border-foreground'
                : 'bg-transparent border-border hover:bg-muted'
            }`}
            aria-label={`Navigate to ${section}`}
          />
        ))}
      </div>
    </nav>
  );
}