'use client';

import Link from 'next/link';

export function ContactInfo() {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Contact</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Web:</span> sabicoder.xyz
        </div>
        <div>
          <span className="font-medium">Email:</span>{' '}
          <Link href="mailto:info@sabicoder.xyz" className="hover:underline">
            info@sabicoder.xyz
          </Link>
        </div>
        <div>
          <span className="font-medium">Discord:</span> nirusvn0
        </div>
      </div>
    </div>
  );
}