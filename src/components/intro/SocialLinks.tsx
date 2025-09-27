'use client';

import { FaFacebook, FaInstagram, FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/nirussvn0', icon: FaFacebook },
  { name: 'Instagram', url: 'https://instagram.com/nirussvn0', icon: FaInstagram },
  { name: 'Twitter', url: 'https://twitter.com/nirussvn0', icon: FaTwitter },
  { name: 'Discord', url: 'https://discord.com/users/nirussvn0', icon: FaDiscord },
  { name: 'GitHub', url: 'https://github.com/nirussvn0', icon: FaGithub },
];

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-6">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon w-8 h-8 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
            aria-label={link.name}
          >
            <Icon size="1.2em" />
          </a>
        );
      })}
    </div>
  );
}