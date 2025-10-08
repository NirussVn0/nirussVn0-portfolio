export interface ProjectRecord {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly date: string;
  readonly categories: string[];
  readonly languages: string[];
  readonly link?: string;
  readonly image: string;
}

export const PROJECT_DATA: ProjectRecord[] = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    summary:
      'Crafting a serene, high-performance personal brand experience with intentional motion and storytelling.',
    date: 'Sep 2025',
    categories: ['Web Development', 'Minimal App'],
    languages: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    link: 'https://sabicoder.xyz/',
    image: '/projects/portfolio-website.svg',
  },
  {
    id: 'pomodoro-peak',
    title: 'Pomodoro Peak',
    summary:
      'A productivity companion that gamifies deep work sessions with streaks, focus rituals, and gentle UI sounds.',
    date: 'Sep 2025',
    categories: ['Tool Project', 'Minimal App'],
    languages: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    link: 'https://pp.sabicoder.xyz/',
    image: '/projects/pomodoro-peak.svg',
  },
  {
    id: 'linking-bio-homepage',
    title: 'Linking-Bio Homepage',
    summary:
      'A customizable bio-link platform with modular sections, analytics-ready architecture, and brandable themes.',
    date: 'Jul 2025',
    categories: ['Web Development', 'Software'],
    languages: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    link: 'https://github.com/NirussVn0/linking-bio-homepage',
    image: '/projects/linking-bio.svg',
  },
  {
    id: 'token-discord-checker',
    title: 'Token Discord Checker',
    summary:
      'CLI-first utility to audit and manage Discord tokens with ergonomic prompts and safety in mind.',
    date: 'Jun 2025',
    categories: ['Tool Project', 'Software'],
    languages: ['Node.js', 'TypeScript'],
    link: 'https://github.com/NirussVn0/token-discord-checker',
    image: '/projects/discord-token.svg',
  },
  {
    id: 'gmail-automation-tool',
    title: 'Gmail Automation Tool',
    summary:
      'Automation suite for Gmail triage, built with FastAPI workflows, container-ready deployments, and modular tasks.',
    date: 'Jun 2025',
    categories: ['AI Development', 'Tool Project'],
    languages: ['Python', 'FastAPI', 'Docker'],
    link: 'https://github.com/NirussVn0/Gmail-Automation-Tool',
    image: '/projects/gmail-automation.svg',
  },
  {
    id: 'selfbot',
    title: 'SelfBot',
    summary:
      'A Discord automation sidekick using discord.py abstractions with safety rails for community testing.',
    date: 'Apr 2025',
    categories: ['Tool Project', 'Software'],
    languages: ['Python', 'Discord.py'],
    link: 'https://github.com/NirussVn0/Python-Hikari-SelfBot',
    image: '/projects/selfbot.svg',
  },
  {
    id: 'thptqg-countdown',
    title: 'THPTQG Countdown EX',
    summary:
      'Immersive countdown for the Vietnamese High School Graduation Exam with celebratory end states and reminders.',
    date: 'Apr 2025',
    categories: ['Minimal App', 'Web Development'],
    languages: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    link: 'https://project.sabicoder.xyz/',
    image: '/projects/thptqg-countdown.svg',
  },
  {
    id: 'animated-404',
    title: 'Animated 404 Page',
    summary:
      'Playful 404 experience blending fluid gradients, micro-interactions, and accessible semantics.',
    date: 'Feb 2025',
    categories: ['Web Development', 'Minimal App'],
    languages: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/NirussVn0/404-animation',
    image: '/projects/animated-404.svg',
  },
];
