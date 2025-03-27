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
      'gray': '#2D2D2D',
      'lightgray': '#9A9A9A',
      'white': '#FFFCF2',
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