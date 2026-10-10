/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // we'll change this to the Figma colour later
      },
    },
  },
  plugins: [],
};

