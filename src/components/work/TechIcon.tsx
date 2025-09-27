'use client';

import { ReactElement } from 'react';
import { TECH_ICONS } from '@/lib/constants';

export function TechIcon({ name }: { name: string }) {
  // Create icon components
  const htmlIcon = (
    <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
      <path
        fill="currentColor"
        d="M19 3l9 100 36 10 36-10 9-100H19zm71 26H38l1 11h49l-4 42-22 6-22-6-2-21h11l1 11 12 3 12-3 2-20H36l-3-33h60l-2 10z"
      />
    </svg>
  );

  const cssIcon = (
    <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
      <path
        fill="currentColor"
        d="M19 3l9 100 36 10 36-10 9-100H19zm64 26H38l1 11h43l-2 20-16 5-16-5-1-9H36l2 21 27 8 27-8 4-43 1-10z"
      />
    </svg>
  );

  const jsIcon = (
    <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
      <rect width="128" height="128" rx="12" fill="currentColor" />
      <path
        fill="#000"
        d="M86 96c-2 4-6 6-11 6-8 0-13-4-13-12V63h9v25c0 3 1 5 4 5 3 0 4-1 5-3l6 6zM55 95c-2 4-6 7-13 7-8 0-13-4-13-12h9c0 3 2 5 5 5 4 0 5-2 5-6V63h9v32z"
      />
    </svg>
  );

  const tsIcon = (
    <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
      <rect width="128" height="128" rx="12" fill="currentColor" />
      <path
        fill="#fff"
        d="M54 57h-13v41h-9V57H20v-8h34v8zm17-8h30v8H81v9h18v8H81v16h-9V49z"
      />
    </svg>
  );

  const reactIcon = (
    <svg viewBox="0 0 256 256" className="w-3.5 h-3.5" aria-hidden>
      <circle cx="128" cy="128" r="14" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="10">
        <ellipse rx="90" ry="35" transform="translate(128 128) rotate(0)" />
        <ellipse rx="90" ry="35" transform="translate(128 128) rotate(60)" />
        <ellipse rx="90" ry="35" transform="translate(128 128) rotate(120)" />
      </g>
    </svg>
  );

  const nextIcon = (
    <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
      <path
        fill="currentColor"
        d="M64 8a56 56 0 1056 56A56.1 56.1 0 0064 8zm23 80L52 43h9l26 45zM44 43h9v42h-9z"
      />
    </svg>
  );

  const tailwindIcon = (
    <svg viewBox="0 0 256 154" className="w-4 h-4" aria-hidden>
      <path
        fill="currentColor"
        d="M128 0c-34 0-55 17-64 51 13-17 28-23 47-18 10 3 17 10 25 18 13 13 29 18 50 18 34 0 55-17 64-51-13 17-28 23-47 18-10-3-17-10-25-18-13-13-29-18-50-18C30 52 9 69 0 103z"
      />
    </svg>
  );

  const nodeIcon = (
    <svg viewBox="0 0 256 272" className="w-3.5 h-3.5" aria-hidden>
      <path fill="currentColor" d="M128 0l110 64v128l-110 64L18 192V64z" />
      <path fill="#000" d="M128 36l-80 46v92l80 46 80-46V82z" />
    </svg>
  );

  const pythonIcon = (
    <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
      <path
        fill="currentColor"
        d="M63 8c26 0 24 12 24 12v16H40c-22 0-24 16-24 24s4 24 24 24h24v-8H48c-10 0-16-8-16-16s4-16 16-16h47V20S92 8 63 8z"
      />
      <circle cx="84" cy="20" r="4" fill="#fff" />
      <path
        fill="currentColor"
        d="M65 120c-26 0-24-12-24-12V92h47c22 0 24-16 24-24s-4-24-24-24H88v8h15c10 0 16 8 16 16s-4 16-16 16H56v36s1 12 31 12z"
      />
      <circle cx="44" cy="108" r="4" fill="#fff" />
    </svg>
  );

  const cppIcon = (
    <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
      <path fill="currentColor" d="M64 8l56 32v48l-56 32-56-32V40z" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="36"
        fill="#000"
      >
        C++
      </text>
    </svg>
  );

  const iconMap: Record<string, ReactElement> = {
    html: htmlIcon,
    css: cssIcon,
    js: jsIcon,
    ts: tsIcon,
    typescript: tsIcon,
    react: reactIcon,
    'next.js': nextIcon,
    tailwindcss: tailwindIcon,
    'node.js': nodeIcon,
    python: pythonIcon,
    'c++': cppIcon,
  };

  const key = name.trim().toLowerCase();
  const icon =
    iconMap[key] ||
    iconMap[key.replace(/\s+/g, '')] ||
    iconMap[key.replace(/\./g, '')] ||
    null;

  return (
    <span className="inline-flex items-center justify-center">
      {icon}
    </span>
  );
}