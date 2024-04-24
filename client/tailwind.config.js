/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto Condensed',
        poppins: 'Poppins',
        noto: 'Noto Serif',
        lato: 'Lato',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};
