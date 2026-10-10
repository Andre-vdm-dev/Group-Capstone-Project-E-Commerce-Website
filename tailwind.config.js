/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#105E46',
        accent: '#12805D',
        success: '#02D693',
        light: '#BFD1E5',
        tertiary: '#60695C',
        dark: '#1A1F16',
        placeholder: 'rgba(26, 31, 22, 0.5)',
        danger: '#E5252C',
        warning: '#E6D117',
        page: '#EDEDED',
      },
      fontFamily: {
        sans: ['Cabin', 'sans-serif'],
      },
      fontSize: {
        h0: ['61.04px', 'normal'],
        h1: ['48.83px', 'normal'],
        h2: ['39.06px', 'normal'],
        h3: ['31.25px', 'normal'],
        h4: ['25px', 'normal'],
        h5: ['20px', 'normal'],
        h6: ['16px', 'normal'],
        h7: ['12.8px', 'normal'],
      },
      letterSpacing: {
        condensed: '-0.02em',
        expanded: '0.25em',
      },
      borderRadius: {
        card: '22px',
        input: '13px',
        btn: '14px',
        'btn-sm': '9px',
        nav: '10px',
        thumb: '12px',
      },
      boxShadow: {
        input: '0px 4px 16px 0px rgba(26, 31, 22, 0.15)',
      },
    },
  },
  plugins: [],
};

