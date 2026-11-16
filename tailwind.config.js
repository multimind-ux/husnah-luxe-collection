/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surface2: 'rgb(var(--surface-2) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentSoft: 'rgb(var(--accent-soft) / <alpha-value>)',
        accentContrast: 'rgb(var(--accent-contrast) / <alpha-value>)',
        ink: '#0B0B0C',
        cream: '#F5F1EA',
        gold: '#D4AF37',
      },
      fontFamily: {
        display: ['Syne', 'Arial Black', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--accent) / 0.25), 0 18px 60px -18px rgb(var(--accent) / 0.35)',
        card: '0 30px 80px -45px rgba(0,0,0,0.85)',
        soft: '0 20px 50px -30px rgba(0,0,0,0.6)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-10px,0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(0.96)' },
          '50%': { opacity: '0.65', transform: 'scale(1.04)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 48s linear infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        'glow-pulse': 'glowPulse 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
