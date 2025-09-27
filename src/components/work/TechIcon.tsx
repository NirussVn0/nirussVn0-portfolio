'use client';

import { 
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaPython,
  FaPlus,
  FaLess,
  FaSass
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiCplusplus } from 'react-icons/si';

export function TechIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    html: <FaHtml5 />,
    css: <FaCss3Alt />,
    js: <FaJs />,
    ts: <SiTypescript />,
    typescript: <SiTypescript />,
    react: <FaReact />,
    'next.js': <SiNextdotjs />,
    tailwindcss: <SiTailwindcss />,
    'node.js': <FaNode />,
    python: <FaPython />,
    'c++': <SiCplusplus />,
  };

  const key = name.trim().toLowerCase();
  const icon =
    iconMap[key] ||
    iconMap[key.replace(/\s+/g, '')] ||
    iconMap[key.replace(/\./g, '')] ||
    <FaPlus />; // fallback icon

  return (
    <span className="inline-flex items-center justify-center w-3.5 h-3.5">
      {icon}
    </span>
  );
}
