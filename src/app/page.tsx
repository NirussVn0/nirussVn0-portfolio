'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const hours = utc7Time.getUTCHours().toString().padStart(2, '0');
      const minutes = utc7Time.getUTCMinutes().toString().padStart(2, '0');
      const seconds = utc7Time.getUTCSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  //Sync reveal via data-inview
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-inview', 'true');
            setActiveSection((entry.target as HTMLElement).id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -20% 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const CARD_BASE =
    'group magnet-card border-border p-6 cursor-pointer transition-[transform,opacity,shadow,background-color,color]' +
    'duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform will-change-opacity' +
    'hover:-translate-y-1 hover:shadow-2xl hover:bg-muted/60';

  // Format year
  function formatYear(value: string) {
    const parts = value.split('-');
    if (parts.length < 2) {
      return <span className="block">{value}</span>;
    }
    const left = parts[0].trim(); // trước dấu "-"
    const right = parts.slice(1).join('-').trim(); // sau dấu "-"
    return (
      <>
        <span className="block">{left}</span>
        <span className="block">- {right}</span>
      </>
    );
  }

  // SVG inline
  const iconMap: Record<string, JSX.Element> = {
    html: (
      <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
        <path
          fill="currentColor"
          d="M19 3l9 100 36 10 36-10 9-100H19zm71 26H38l1 11h49l-4 42-22 6-22-6-2-21h11l1 11 12 3 12-3 2-20H36l-3-33h60l-2 10z"
        />
      </svg>
    ),
    css: (
      <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
        <path
          fill="currentColor"
          d="M19 3l9 100 36 10 36-10 9-100H19zm64 26H38l1 11h43l-2 20-16 5-16-5-1-9H36l2 21 27 8 27-8 4-43 1-10z"
        />
      </svg>
    ),
    js: (
      <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
        <rect width="128" height="128" rx="12" fill="currentColor" />
        <path
          fill="#000"
          d="M86 96c-2 4-6 6-11 6-8 0-13-4-13-12V63h9v25c0 3 1 5 4 5 3 0 4-1 5-3l6 6zM55 95c-2 4-6 7-13 7-8 0-13-4-13-12h9c0 3 2 5 5 5 4 0 5-2 5-6V63h9v32z"
        />
      </svg>
    ),
    ts: (
      <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
        <rect width="128" height="128" rx="12" fill="currentColor" />
        <path
          fill="#fff"
          d="M54 57h-13v41h-9V57H20v-8h34v8zm17-8h30v8H81v9h18v8H81v16h-9V49z"
        />
      </svg>
    ),
    react: (
      <svg viewBox="0 0 256 256" className="w-3.5 h-3.5" aria-hidden>
        <circle cx="128" cy="128" r="14" fill="currentColor" />
        <g fill="none" stroke="currentColor" strokeWidth="10">
          <ellipse rx="90" ry="35" transform="translate(128 128) rotate(0)" />
          <ellipse rx="90" ry="35" transform="translate(128 128) rotate(60)" />
          <ellipse rx="90" ry="35" transform="translate(128 128) rotate(120)" />
        </g>
      </svg>
    ),
    'next.js': (
      <svg viewBox="0 0 128 128" className="w-3.5 h-3.5" aria-hidden>
        <path
          fill="currentColor"
          d="M64 8a56 56 0 1056 56A56.1 56.1 0 0064 8zm23 80L52 43h9l26 45zM44 43h9v42h-9z"
        />
      </svg>
    ),
    tailwindcss: (
      <svg viewBox="0 0 256 154" className="w-4 h-4" aria-hidden>
        <path
          fill="currentColor"
          d="M128 0c-34 0-55 17-64 51 13-17 28-23 47-18 10 3 17 10 25 18 13 13 29 18 50 18 34 0 55-17 64-51-13 17-28 23-47 18-10-3-17-10-25-18-13-13-29-18-50-18C30 52 9 69 0 103z"
        />
      </svg>
    ),
    'node.js': (
      <svg viewBox="0 0 256 272" className="w-3.5 h-3.5" aria-hidden>
        <path fill="currentColor" d="M128 0l110 64v128l-110 64L18 192V64z" />
        <path fill="#000" d="M128 36l-80 46v92l80 46 80-46V82z" />
      </svg>
    ),
    python: (
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
    ),
    'c++': (
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
    ),
  };

  // ICON
  function TechIcon({ name }: { name: string }) {
    const key = name.trim().toLowerCase();
    const icon =
      iconMap[key] ||
      iconMap[key.replace(/\s+/g, '')] ||
      iconMap[key.replace(/\./g, '')] ||
      null;
    return (
      <span className="inline-flex items-center justify-center">{icon}</span>
    );
  }

function MagnetDiscordCard({ href }: { href: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const damp = 18; // độ “hút” (số càng lớn càng nhẹ)
    setT({ x: dx / damp, y: dy / damp });
  };

  const handleLeave = () => {
    setHover(false);
    setT({ x: 0, y: 0 });
  };

  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Join our Discord">
        <div
          ref={ref}
          onMouseEnter={() => setHover(true)}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative overflow-hidden group magnet-card border-border p-6 cursor-pointer transition-[transform,shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu hover:bg-muted/60"
          style={{
            transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
          }}
        >
          {/* Glow viền trắng (nhạt -> đậm) */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-2xl transition-all duration-500
            ${hover
              ? 'shadow-[0_0_0_2px_rgba(255,255,255,0.85),0_0_36px_14px_rgba(255,255,255,0.25)]'
              : 'shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_0_14px_6px_rgba(255,255,255,0.08)]'
            } animate-whiteGlow`}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-4">
            {/* Icon Discord (parallax mạnh hơn chút) */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-foreground text-background
                         transition-transform duration-500"
              style={{
                transform: `translate3d(${t.x * 0.6}px, ${t.y * 0.6}px, 0)`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden>
                <path d="M20.317 4.369A19.791 19.791 0 0016.558 3c-.2.36-.43.85-.59 1.232a18.27 18.27 0 00-7.938 0C7.37 3.85 7.14 3.36 6.94 3a19.791 19.791 0 00-3.76 1.369C1.18 8.063.35 11.64.7 15.16A19.9 19.9 0 006.08 18c.3-.41.57-.85.81-1.31a12.8 12.8 0 01-1.27-.62c.11-.08.22-.16.33-.24a13.2 13.2 0 0012.1 0c.11.08.22.16.33.24-.41.22-.84.43-1.28.62.24.46.52.9.82 1.31a19.9 19.9 0 005.38-2.84c.42-4.02-.53-7.57-2.92-10.06zM8.88 13.89c-.79 0-1.43-.73-1.43-1.63 0-.9.64-1.64 1.43-1.64s1.44.74 1.44 1.64-.65 1.63-1.44 1.63zm6.24 0c-.79 0-1.43-.73-1.43-1.63 0-.9.64-1.64 1.43-1.64.8 0 1.44.74 1.44 1.64s-.64 1.63-1.44 1.63z"/>
              </svg>
            </div>

            <div className="flex-1">
              <div className="text-2xl font-bold tracking-wide">Join our community</div>
              <div className="text-sm text-muted-foreground">
                Hop in our Discord — build, learn, vibe together.
              </div>
            </div>
          </div>

          {/* Underlay sáng chạy nhẹ (color from trắng nhạt -> trắng đậm) */}
          <div
            className="pointer-events-none absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(120px 120px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.18), transparent 60%)',
              // cập nhật tọa độ theo chuột
              // CSS vars sẽ được set bên dưới
            }}
          />

          {/* cập nhật CSS vars vị trí chuột để underlay bám theo */}
          <div
            className="sr-only"
            aria-hidden
            // cập nhật --mx, --my theo % vị trí trong card
            ref={(node) => {
              if (!ref.current || !node) return;
              const el = ref.current;
              el.onmousemove = (e: MouseEvent) => {
                const rect = el.getBoundingClientRect();
                const mx = ((e.clientX - rect.left) / rect.width) * 100;
                const my = ((e.clientY - rect.top) / rect.height) * 100;
                el.style.setProperty('--mx', `${mx}%`);
                el.style.setProperty('--my', `${my}%`);
              };
              el.onmouseleave = () => {
                el.style.setProperty('--mx', `50%`);
                el.style.setProperty('--my', `50%`);
              };
            }}
          />
        </div>
      </a>

      {/* Global CSS cho glow animation */}
      <style jsx global>{`
        @keyframes whiteGlow {
          0%   { box-shadow: 0 0 0 1px rgba(255,255,255,0.25), 0 0 14px 6px rgba(255,255,255,0.08); }
          50%  { box-shadow: 0 0 0 2px rgba(255,255,255,0.65), 0 0 28px 12px rgba(255,255,255,0.18); }
          100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.3), 0 0 14px 6px rgba(255,255,255,0.1); }
        }
        .animate-whiteGlow { animation: whiteGlow 2.2s ease-in-out infinite; }
      `}</style>
    </>
  );
}

  return (
    <div className="relative">
      <main>
        <>
          {/* HERO */}
          <section
            id="hero"
            ref={(el) => {
              sectionsRef.current[0] = el;
              return undefined;
            }}
            className="min-h-screen flex flex-col justify-center py-20 sm:py-32 opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
          >
          <div className="space-y-12 sm:space-y-16">
            <div className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0">
              <h1 className="text-4xl sm:text-5xl font-bold uppercase">
                Sabicoder
              </h1>
              <div className="text-sm text-muted-foreground font-mono mt-2">
                {currentTime}
              </div>
            </div>
            <div className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                Fullstack Developer
              </h2>
              <div className="text-sm text-muted-foreground font-mono mt-2">
                2024 — 2025
              </div>
            </div>
            <div className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                Passionate about coding
              </h2>
              <div className="text-sm text-muted-foreground font-mono mt-2">
                2024 — 2025
              </div>
            </div>
            <div className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                Building projects
              </h2>
              <div className="text-sm text-muted-foreground font-mono mt-2">
                2024 — 2025
              </div>
            </div>
            <div className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                Learning and growing
              </h2>
              <div className="text-sm text-muted-foreground font-mono mt-2">
                2024 — 2025
              </div>
            </div>
            <div className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                Join the community
              </h2>
              <div className="text-sm text-muted-foreground font-mono mt-2">
                2024 — 2025
              </div>
            </div>
          </div>
        </section>

        {/* ROADMAP — unified effect */}
        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el;
            return undefined;
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
        >
          <div className="space-y-12 sm:space-y-16">
            {/* Heading reveal sync + delay */}
            <div
              className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
              data-inview={activeSection === 'work' ? 'true' : undefined}
              style={{
                transitionDelay: activeSection === 'work' ? '80ms' : '0ms',
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                Roadmap
              </h2>
              <div className="text-sm text-muted-foreground font-mono mt-2">
                2024 — 2025
              </div>
            </div>
            {/* Jobs list with staggered reveal */}
            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: '2025 Present',
                  role: 'Fullstack Developer',
                  company: 'Sabicoder',
                  description: 'create a few projects and share to the world',
                  tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
                },
                {
                  year: '07.2025 Present',
                  role: 'Provincial gifted student competition',
                  company: 'DSA Learing',
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
                  year: '2024',
                  role: 'STEM Development in School',
                  company: 'High School',
                  description:
                    'I was able to learn some basic programming knowledge and create a game projects',
                  tech: ['Python'],
                },
              ].map((job, index) => {
                const border =
                  index % 2 === 0
                    ? 'border-wave-animated'
                    : 'border-pulse-animated';
                return (
                  <div
                    key={index}
                    className={`${CARD_BASE} ${border} opacity-0 translate-y-4 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0`}
                    data-inview={activeSection === 'work' ? 'true' : undefined}
                    style={{
                      transitionDelay:
                        activeSection === 'work'
                          ? `${150 + index * 90}ms`
                          : '0ms',
                    }}
                  >
                    <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
                      {/* YEAR column — center all, auto line-break */}
                      <div className="lg:col-span-2">
                        <div
                          className="text-xl sm:text-2xl font-bold h-full
                    flex items-center justify-center text-center leading-tight
                    transition-all duration-500 group-hover:text-foreground group-hover:scale-110"
                        >
                          {formatYear(job.year)}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="lg:col-span-6 space-y-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-foreground group-hover:-translate-y-0.5">
                            {job.role}
                          </h3>
                          <div className="text-muted-foreground font-medium">
                            {job.company}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-lg">
                          {job.description}
                        </p>
                      </div>

                      {/* TECH with icons */}
                      <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                        {job.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs border border-border rounded-sm
                   inline-flex items-center gap-1
                   transition-colors duration-300 group-hover:bg-foreground group-hover:text-background"
                            title={tech}
                          >
                            <TechIcon name={tech} />
                            <span className="leading-none">{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* THOUGHTS — unified effect + same stagger pattern */}
        <section
          id="thoughts"
          ref={(el) => {
            sectionsRef.current[2] = el;
            return undefined;
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div
              className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
              data-inview={activeSection === 'thoughts' ? 'true' : undefined}
              style={{
                transitionDelay: activeSection === 'thoughts' ? '80ms' : '0ms',
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                Recent Thoughts
              </h2>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: 'The Future of Web Development',
                  excerpt:
                    'Exploring how AI and automation are reshaping the way we build for the web.',
                  date: 'Dec 2024',
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
                  title: 'Performance-First Development',
                  excerpt:
                    'Why performance should be a first-class citizen in your development workflow.',
                  date: 'Oct 2024',
                  readTime: '6 min',
                },
                {
                  title: 'The Art of Code Review',
                  excerpt:
                    'Building better software through thoughtful and constructive code reviews.',
                  date: 'Sep 2024',
                  readTime: '4 min',
                },
                {
                  title: 'The Art of Code Review',
                  excerpt:
                    'Building better software through thoughtful and constructive code reviews.',
                  date: 'Sep 2024',
                  readTime: '4 min',
                },
                {
                  title: 'The Art of Code Review',
                  excerpt:
                    'Building better software through thoughtful and constructive code reviews.',
                  date: 'Sep 2024',
                  readTime: '4 min',
                },
                {
                  title: 'The Art of Code Review',
                  excerpt:
                    'Building better software through thoughtful and constructive code reviews.',
                  date: 'Sep 2024',
                  readTime: '4 min',
                },
                {
                  title: 'The Art of Code Review',
                  excerpt:
                    'Building better software through thoughtful and constructive code reviews.',
                  date: 'Sep 2024',
                  readTime: '4 min',
                },
                {
                  title: 'The Art of Code Review',
                  excerpt:
                    'Building better software through thoughtful and constructive code reviews.',
                  date: 'Sep 2024',
                  readTime: '4 min',
                },
                {
                  title: 'The Art of Code Review',
                  excerpt:
                    'Building better software through thoughtful and constructive code reviews.',
                  date: 'Sep 2024',
                  readTime: '4 min',
                },
              ].map((post, index) => {
                const border =
                  index % 3 === 0
                    ? 'border-zigzag-animated'
                    : 'border-gradient-animated';

                return (
                  <article
                    key={index}
                    className={`${CARD_BASE} ${border} opacity-0 translate-y-4 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0`}
                    data-inview={
                      activeSection === 'thoughts' ? 'true' : undefined
                    }
                    style={{
                      transitionDelay:
                        activeSection === 'thoughts'
                          ? `${150 + index * 90}ms`
                          : '0ms',
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold transition-[color,transform,text-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-foreground group-hover:-translate-y-0.5">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-foreground">
                        <span>Read more</span>
                        <svg
                          className="w-4 h-4 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONNECT */}
        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[3] = el;
            return undefined;
          }}
          className="py-20 sm:py-32 opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="magnet-card border-double-animated border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                  Let&apos;s Connect
                </h2>

                <div className="space-y-6">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    Always interested in new opportunities, collaborations, and
                    conversations about technology and design.
                  </p>

                  <div className="space-y-4">
                    <Link
                      href="mailto:info@sabicoder.xyz"
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <span className="text-base sm:text-lg font-mono">
                        info@sabicoder.xyz
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="border-dotted-thick border-border p-4">
                <div className="text-sm text-muted-foreground font-mono uppercase">
                  Elsewhere
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'GitHub', handle: '@NirussVn0', url: '#' },
                  { name: 'Discord', handle: '@NirussVn0', url: '#' },
                  {
                    name: 'HubSpot Community',
                    handle: '@NirussVn0',
                    url: '#',
                  },
                  { name: 'LinkedIn', handle: 'NirussVn0', url: '#' },
                ].map((social, index) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className={`group magnet-card ${
                      index % 2 === 0
                        ? 'border-pulse-animated'
                        : 'border-wave-animated'
                    } border-border p-4 hover-lift hover:bg-muted transition-all duration-300`}
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300 font-bold">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {social.handle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t-2 border-dotted border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono">
                © 2025 NirussVn0. All rights reserved.
              </div>
              <div className="text-xs text-muted-foreground">
                Built with 💖 and ☕
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 border-dotted-thick border-border hover:bg-muted transition-all duration-300 hover-lift"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 border-dotted-thick border-border hover:bg-muted transition-all duration-300 hover-lift">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
        </>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
