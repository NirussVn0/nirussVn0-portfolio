// Experience data
export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    year: 'Apr.2025 Present',
    role: 'Fullstack Developer',
    company: 'Sabicoder',
    description: 'create a few projects and share to the world',
    tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
  },
  {
    year: 'Sep.2025 Present',
    role: 'Provincial gifted student competition',
    company: 'DSA Learning',
    description:
      'Preparing to compete in the provincial gifted student contest in Vietnam, which evaluates advanced algorithmic knowledge and problem-solving ability.',
    tech: ['C++', 'Python'],
  },
  {
    year: '2024 - 2025',
    role: 'Basic Web development',
    company: 'Learning',
    description:
      'learning web development and other related stuff',
    tech: ['Html', 'Css', 'js', 'Node.js'],
  },
  {
    year: 'Mar.2024',
    role: 'STEM Development in School',
    company: 'High School',
    description:
      'I was able to learn some basic programming knowledge and create a game projects',
    tech: ['Python'],
  },
];

// Thoughts/Articles data
export interface Article {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export const ARTICLES: Article[] = [
  {
    title: 'Portfolio Website',
    excerpt:
      'Start to building a beautiful and functional portfolio website.',
    date: 'Sep 2025',
    readTime: '5 min',
  },
  {
    title: 'Design Systems at Scale',
    excerpt:
      'Lessons learned from building and maintaining design systems across multiple products.',
    date: 'Nov 2024',
    readTime: '8 min',
  },
  {
    title: 'The Art of Code Review',
    excerpt:
      'Building better software through thoughtful and constructive code reviews.',
    date: 'Sep 2024',
    readTime: '4 min',
  },
];

// Social links data
export interface SocialLink {
  name: string;
  url: string;
  icon: string; // We'll map this to actual icons in the component
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', url: 'https://facebook.com/nirussvn0', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com/nirussvn0', icon: 'instagram' },
  { name: 'Twitter', url: 'https://twitter.com/nirussvn0', icon: 'twitter' },
  { name: 'Discord', url: 'https://discord.com/users/nirussvn0', icon: 'discord' },
  { name: 'GitHub', url: 'https://github.com/nirussvn0', icon: 'github' },
];

// Connect section data
export const CONNECT_LINKS = [
  { name: 'GitHub', handle: '@NirussVn0', url: '#' },
  { name: 'Discord', handle: '@NirussVn0', url: '#' },
  { name: 'HubSpot Community', handle: '@NirussVn0', url: '#' },
  { name: 'LinkedIn', handle: 'NirussVn0', url: '#' },
];

// Tech icons mapping
export const TECH_ICONS: Record<string, string> = {
  html: 'html',
  css: 'css',
  js: 'js',
  typescript: 'ts',
  ts: 'ts',
  react: 'react',
  'next.js': 'next.js',
  tailwindcss: 'tailwindcss',
  'node.js': 'node.js',
  python: 'python',
  'c++': 'c++',
};