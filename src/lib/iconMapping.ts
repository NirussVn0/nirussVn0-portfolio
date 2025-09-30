import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaDiscord, 
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaPython
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiCplusplus } from 'react-icons/si';

// Social media icon mapping
export const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: string | number }>> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  discord: FaDiscord,
  github: FaGithub,
};

// Technology icon mapping
export const TECH_ICONS: Record<string, React.ComponentType<{ size?: string | number }>> = {
  html: FaHtml5,
  css: FaCss3Alt,
  js: FaJs,
  javascript: FaJs,
  typescript: SiTypescript,
  ts: SiTypescript,
  react: FaReact,
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  'node.js': FaNode,
  nodejs: FaNode,
  python: FaPython,
  'c++': SiCplusplus,
  cpp: SiCplusplus,
};