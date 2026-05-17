// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'brand-blue': '#2563eb',
        'brand-orange': '#f59e0b',
        'brand-green': '#10b981',
        'brand-gray': '#6b7280',
        'brand-light': '#f9fafb',
        // Domain Colors
        'domain-recruitment': '#3b82f6',
        'domain-football': '#10b981',
        'domain-travel': '#3b82f6',
        'domain-voice': '#8b5cf6',
        // Semantic aliases used throughout the codebase (bg-primary, text-primary, text-dark).
        // Without these, those classes resolve to no-colour and buttons render invisible until hover.
        primary: '#2563eb',
        dark: '#1f2937',
        accent: '#3b82f6',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        h3: ['18px', { lineHeight: '24px', fontWeight: '600' }],
        body: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        small: ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config