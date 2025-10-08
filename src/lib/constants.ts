
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

export interface Projects {
  title: string;
  excerpt: string;
  date: string;
  types?: string;
  tags?: string[];
  link?: string;
}

export const PROJECTS: Projects[] = [
  {
    title: 'Portfolio Website',
    excerpt:
      'Start to building a beautiful and functional portfolio website.',
    date: 'Sep 2025',
    types: 'minimal app',
    tags: ['React', 'TailwindCSS', 'Next.js'],
    link: 'https://sabicoder.xyz/',
  },
  {
    title: 'Pomodoro Peak',
    excerpt:
      'A peak productivity app using the Pomodoro technique to help users stay focused and manage their time effectively.',
    date: 'Sep 2025',
    types: 'minimal app',
    tags: ['React', 'TailwindCSS', 'Next.js'],
    link: 'https://pp.sabicoder.xyz/',
  },
  {
    title: 'Linking-Bio Homepage',
    excerpt:
      "This directory contains the core application for the LinkingBio platform, a modern, customizable bio-link platform built with Next.js 15, TypeScript, and Tailwind CSS. It allows users to create stunning, interactive profile pages with advanced customization options, analytics, and premium features. but linking-bio-homepage haven't deploy yet",
    date: 'Jul 2025',
    types: 'Fontend',
    tags: ['React', 'TailwindCSS', 'Next.js'],
    link: 'https://github.com/NirussVn0/linking-bio-homepage'
  },
  {
    title: 'token discord checker',
    excerpt:
      'if you want to check your token or managae your token, this app is for you. App deployed on Node Package Manager',
    date: 'Jun 2025',
    types: 'tool',
    tags: ['Node.js', 'Typescript'],
    link: 'https://github.com/NirussVn0/token-discord-checker',
  },
  {
    title: 'Gmail Automation Tool',
    excerpt:
      'A tool to automate gmail, built with Python and FastAPI, containerized with Docker for easy deployment.',
    date: 'Jun 2025',
    types: 'tool',
    tags: ['Python', 'Next.js', 'FastAPI', 'Docker'],
    link: 'https://github.com/NirussVn0/Gmail-Automation-Tool'
  },
  {
    title: 'SelfBot',
    excerpt:
      'A self-bot for Discord, built with Python and the discord.py library.',
    date: 'Apr 2025',
    types: 'tool',
    tags: ['Python', 'Discord.py'],
    link: 'https://github.com/NirussVn0/Python-Hikari-SelfBot'
  },
  {
    title: 'THPTQG coutdown EX',
    excerpt:
      'A sleek countdown web application for the Vietnamese High School Graduation Exam, built with Next.js.',
    date: 'Apr 2025',
    types: 'minimal app',
    tags: ['Node.js', 'Next.js', 'React', 'TailwindCSS', 'TypeScript'],
    link: 'https://project.sabicoder.xyz/',
  },
  {
    title: '404-Page',
    excerpt:
      "A beautiful and minimalist 404 page, built with HTML, CSS, and JavaScript.",
    date: 'Feb 2025',
    types: 'Fontend',
    tags: ['Html', 'Css', 'JavaScript'],
    link: 'https://github.com/NirussVn0/404-animation'
  },
];

export interface UserHandles {
  all: string;
  discordId: string;
  linkedin?: string;
  [key: string]: string | undefined; // Allow for additional handles
}

export const USER_HANDLES: UserHandles = {
  all: 'nirussvn0',
  discordId: '1195303714777468988',
  linkedin: 'nirussvn0',
};

export interface SocialLink {
  name: string;
  urlTemplate: string;
  handleKey: keyof UserHandles;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { 
    name: 'Facebook', 
    urlTemplate: 'https://facebook.com/hikarii.owo/', 
    handleKey: 'all', 
    icon: 'facebook' 
  },
  { 
    name: 'Instagram', 
    urlTemplate: 'https://instagram.com/nirussvien/', 
    handleKey: 'all', 
    icon: 'instagram' 
  },
  { 
    name: 'Twitter', 
    urlTemplate: 'https://twitter.com/{handle}', 
    handleKey: 'all', 
    icon: 'twitter' 
  },
  { 
    name: 'Discord', 
    urlTemplate: 'https://discord.com/users/{handle}', 
    handleKey: 'discordId', 
    icon: 'discord' 
  },
  { 
    name: 'GitHub', 
    urlTemplate: 'https://github.com/{handle}', 
    handleKey: 'all', 
    icon: 'github' 
  },
];

// Connect section data with URL templates
export interface ConnectLink {
  name: string;
  handle: string;
  urlTemplate: string;
  handleKey: keyof UserHandles;
}

export const CONNECT_LINKS: ConnectLink[] = [
  { 
    name: 'GitHub', 
    handle: '@NirussVn0', 
    urlTemplate: 'https://github.com/{handle}', 
    handleKey: 'all' 
  },
  { 
    name: 'Discord', 
    handle: '@NirussVn0', 
    urlTemplate: 'https://discord.com/users/{handle}', 
    handleKey: 'discordId' 
  },
  { 
    name: 'HubSpot Community', 
    handle: '@NirussVn0', 
    urlTemplate: '#', 
    handleKey: 'all' 
  },
  { 
    name: 'LinkedIn', 
    handle: 'NirussVn0', 
    urlTemplate: 'https://www.linkedin.com/in/{handle}', 
    handleKey: 'linkedin' 
  },
];

// Function to generate actual URLs from templates
export const generateSocialUrl = (urlTemplate: string, handle: string): string => {
  return urlTemplate.replace('{handle}', handle);
};

// Function to generate connect link URLs
export const generateConnectUrl = (urlTemplate: string, handle: string): string => {
  return urlTemplate.replace('{handle}', handle);
};