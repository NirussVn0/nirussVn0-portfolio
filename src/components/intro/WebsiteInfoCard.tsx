'use client';

import { Eye, Globe, Code } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WebsiteInfoCard() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Increment visitor count khi component mount
        const response = await fetch('/api/visitor', {
          method: 'POST',
        });
        const data = await response.json();
        setVisitorCount(data.count);
        setLoading(false);
      } catch (error) {
        console.error('Failed to track visitor:', error);
        // Fallback: Fetch count without incrementing
        try {
          const response = await fetch('/api/visitor');
          const data = await response.json();
          setVisitorCount(data.count);
        } catch {
          setVisitorCount(0);
        }
        setLoading(false);
      }
    };

    trackVisitor();
  }, []);

  return (
    <div className="magnet-card border-wave-animated border-border p-4 hover-lift hover:scale-105 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Website Info
          </h3>
          <Globe className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-muted/50 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
              <Eye className="w-3 h-3" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Visitors</div>
              <div className="text-lg font-bold">
                {loading ? (
                  <div className="h-5 w-12 bg-muted rounded animate-pulse" />
                ) : (
                  visitorCount.toLocaleString()
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-muted/50 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
              <Code className="w-3 h-3" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Built with</div>
              <div className="text-sm font-medium">Next.js</div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border/50">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Last updated: Today
          </div>
        </div>
      </div>
    </div>
  );
}
