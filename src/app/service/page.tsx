import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services • NirussVn0',
  description:
    'Consulting, prototyping, and product builds designed to move ideas from zero to launch.',
};

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-20 sm:py-24 space-y-12">
        <header className="magnet-card border-dotted-thick border-border p-8 sm:p-10">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
            services
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold uppercase leading-tight">
            Let’s build the next release together.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            I help teams and founders craft thoughtful digital experiences—from rapid prototypes to
            production-ready products. Need a hand with your next AI-assisted workflow, web platform,
            or automation stack? I&apos;m currently booking limited engagements.
          </p>
        </header>

        <section className="space-y-6">
          <div className="magnet-card border-wave-animated border-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold uppercase">Core offerings</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>• Full-stack web apps with Next.js, React, and TypeScript.</li>
              <li>• AI-powered automations with Python, FastAPI, and cloud services.</li>
              <li>• Developer tooling, CLIs, and integrations to streamline workflows.</li>
              <li>• UI/UX polish, performance audits, and deployment pipelines.</li>
            </ul>
          </div>

          <div className="magnet-card border-solid-animated border-border p-6 sm:p-8">
            <h2 className="text-xl font-semibold uppercase">Availability</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Currently accepting short-term collaborations and long-term partnerships. Share your
              timeline, scope, and north star. I&apos;ll respond with next steps within 48 hours.
            </p>
          </div>
        </section>

        <footer className="magnet-card border-gradient-animated border-border p-6 sm:p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Ready to ship together?{' '}
            <a
              href="/connect"
              className="underline underline-offset-4 hover:text-foreground transition-colors duration-300"
            >
              Start the conversation
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  );
}
