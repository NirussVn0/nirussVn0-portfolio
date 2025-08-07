'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export class ThemeManager {
  private static instance: ThemeManager;
  private theme: Theme = 'system';
  private resolvedTheme: 'light' | 'dark' = 'light';
  private listeners: Set<() => void> = new Set();

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeTheme();
      this.setupMediaQueryListener();
    }
  }

  private initializeTheme() {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      this.theme = stored;
    }
    this.updateResolvedTheme();
    this.applyTheme();
  }

  private setupMediaQueryListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.theme === 'system') {
        this.updateResolvedTheme();
        this.applyTheme();
        this.notifyListeners();
      }
    });
  }

  private updateResolvedTheme() {
    if (this.theme === 'system') {
      this.resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      this.resolvedTheme = this.theme;
    }
  }

  private applyTheme() {
    const root = document.documentElement;
    root.setAttribute('data-theme', this.resolvedTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', this.resolvedTheme === 'dark' ? '#0f172a' : '#ffffff');
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  setTheme(newTheme: Theme) {
    this.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    this.updateResolvedTheme();
    this.applyTheme();
    this.notifyListeners();
  }

  getTheme(): Theme {
    return this.theme;
  }

  getResolvedTheme(): 'light' | 'dark' {
    return this.resolvedTheme;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const themeManager = ThemeManager.getInstance();
