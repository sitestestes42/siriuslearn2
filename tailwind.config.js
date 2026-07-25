/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: '#1A3A6A',
        primary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99cbff',
          300: '#66b1ff',
          400: '#3397ff',
          500: '#1E90FF',
          600: '#1873cc',
          700: '#125699',
          800: '#0c3a66',
          900: '#061d33',
        },
        dark: {
          bg: '#0A1628',
          card: '#0F2847',
          border: '#1A3A6A',
          text: '#F0F4FF',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
