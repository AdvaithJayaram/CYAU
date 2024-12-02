/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      gridTemplateColumns: {
        'responsive': 'repeat(auto-fit, minmax(280px, 1fr))',
        'cards': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
};