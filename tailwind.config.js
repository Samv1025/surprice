/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff7fb',
          100: '#ffeaf3',
          200: '#ffd3e6',
          300: '#ffb0d3',
          400: '#ff84ba',
          500: '#ff5fa2',
          600: '#f23f8b',
          700: '#cf2171',
          800: '#a61a5c',
          900: '#7d1648',
        },
        skyblue: {
          50: '#f2fbff',
          100: '#e1f7ff',
          200: '#bff0ff',
          300: '#93e5ff',
          400: '#5ed6ff',
          500: '#2ec4f7',
          600: '#16a6dc',
          700: '#1384b1',
          800: '#166b8d',
          900: '#185974',
        },
        gold: {
          300: '#ffe9a8',
          400: '#ffd76e',
          500: '#f7c948',
          600: '#dba62b',
        },
        cream: '#fffaf6',
        ink: '#5b2b43',
      },
      fontFamily: {
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        body: ['Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        love: '0 24px 70px -28px rgba(244, 63, 138, 0.55)',
        'love-lg': '0 35px 100px -30px rgba(244, 63, 138, 0.65)',
        glass: '0 20px 60px -30px rgba(91, 43, 67, 0.35)',
        glow: '0 0 40px rgba(255, 95, 162, 0.55)',
      },
      backgroundImage: {
        'romance': 'linear-gradient(160deg, #fff7fb 0%, #ffe9f4 32%, #e9f9ff 68%, #fffdfb 100%)',
        'button-love': 'linear-gradient(120deg, #ff5fa2 0%, #ff84ba 45%, #5ed6ff 130%)',
        'button-sky': 'linear-gradient(120deg, #5ed6ff 0%, #93e5ff 50%, #ffb0d3 130%)',
      },
      animation: {
        'heart-beat': 'heartBeat 1.8s ease-in-out infinite',
        float: 'floatY 6s ease-in-out infinite',
        'float-slow': 'floatY 9s ease-in-out infinite',
        'spin-slow': 'spin 26s linear infinite',
        shimmer: 'shimmer 4s linear infinite',
        'pulse-soft': 'pulseSoft 3.5s ease-in-out infinite',
      },
      keyframes: {
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.12)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.08)' },
          '56%': { transform: 'scale(1)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
}
