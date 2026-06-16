/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF7EE',
        butter: '#F4E7CC',
        tan: '#E0CCA1',
        deep: '#2A1812',
        mid: '#7A6450',
        soft: '#A89380',
        persimmon: '#E26240',
        'persimmon-dark': '#B84B2A',
        sage: '#6E8B5C',
        rust: '#B53321',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
