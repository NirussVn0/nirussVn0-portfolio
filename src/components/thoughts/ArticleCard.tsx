'use client';

import { Article } from '@/lib/constants';

interface ArticleCardProps {
  post: Article;
  index: number;
  activeSection: string;
}

export function ArticleCard({ post, index, activeSection }: ArticleCardProps) {
  const border = index % 3 === 0 ? 'border-zigzag-animated' : 'border-gradient-animated';
  const CARD_BASE = [
    'group magnet-card border-border p-6 cursor-pointer',
    'transition-[transform,opacity,shadow,background-color,color] duration-500',
    'ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform will-change-opacity',
    'hover:-translate-y-1 hover:shadow-2xl hover:bg-muted/60',
  ].join(' ');

  return (
    <article
      className={`${CARD_BASE} ${border} opacity-0 translate-y-4 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0`}
      data-inview={activeSection === 'thoughts' ? 'true' : undefined}
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
}