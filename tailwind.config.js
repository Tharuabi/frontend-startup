/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        'accent': '#01EFFC',
        'accent-hover': '#00D8E6',
        'brand-text': '#2D3748',
        'brand-bg': '#F7FAFC',
        'brand-surface': '#FFFFFF',
        'brand-secondary': '#4A5568',
        // Dark mode colors
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'dark-text': '#F1F5F9',
        'dark-secondary': '#64748B',
        'dark-border': '#334155',
        'dark-accent': '#06B6D4',
        'dark-accent-hover': '#0891B2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
      },
      backgroundColor: {
        'dark-primary': '#0F172A',
        'dark-secondary': '#1E293B',
        'dark-tertiary': '#334155',
      },
      textColor: {
        'dark-primary': '#F1F5F9',
        'dark-secondary': '#94A3B8',
        'dark-muted': '#64748B',
      },
      borderColor: {
        'dark-border': '#334155',
        'dark-border-light': '#475569',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
