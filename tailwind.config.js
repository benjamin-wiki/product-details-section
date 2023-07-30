/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'header-gray': '#F6F6F7',
        'font-gray': '#888888',
        'font-black': '#222222',
        'border-light-gray': '#CCCCCC',
        'border-dark-gray': '#222222',
      },
    },
  },
  plugins: [],
}
