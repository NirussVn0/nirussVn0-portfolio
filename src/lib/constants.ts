
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

export type {
  Project,
  ProjectType,
  ProjectTypeId,
  Technology,
  TechnologyCategory,
  ToolStackGroup,
} from './projects';

export {
  FEATURED_PROJECTS,
  PROJECTS,
  PROJECT_TYPES,
  PROJECT_TYPE_LOOKUP,
  TECHNOLOGIES,
  TECHNOLOGY_LOOKUP,
  TOOL_STACK_GROUPS,
  resolveProjectTechnologies,
  resolveProjectTypeLabels,
} from './projects';

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
