import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [activeSection, setActiveSection] = useState('');
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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
      { threshold: 0.3, rootMargin: '0px 0px -20% 0px', ...options }
    );

    sectionsRef.current.forEach((section) => section && observer.observe(section));

    return () => observer.disconnect();
  }, [options]);

  return { activeSection, sectionsRef };
}