/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /^grid-rows-[1-9]/,
      variants: ['xl'],
    }
  ],
  theme: {
    colors: {
      'light-brown': '#C47D42',
      'brown': '#43260D',
      'black': '#000000',
      'darkgray': '#0F0F0F',
      'semi-darkgray': '#191919',
      'gray': '#2D2D2D',
      'lightgray': '#9A9A9A',
      'semi-lightgray': '#212020',
      'white': '#FFFCF2',
      'orange': '#F66E41',

      'dark-text': '#7F7F7F',
      'dark-bg': '#131212'
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}