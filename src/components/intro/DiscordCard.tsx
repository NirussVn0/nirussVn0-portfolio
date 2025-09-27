'use client';

import { FaDiscord } from 'react-icons/fa';

interface DiscordCardProps {
  href: string;
}

export function DiscordCard({ href }: DiscordCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join our Discord"
      className="block"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-foreground text-background">
          <FaDiscord className="w-10 h-10" />
        </div>

        <div className="flex-1">
          <div className="text-2xl font-bold tracking-wide">
            Join our community
          </div>
          <div className="text-sm text-muted-foreground">
            Hop in our Discord — build, learn, vibe together.
          </div>
        </div>
      </div>
    </a>
  );
}