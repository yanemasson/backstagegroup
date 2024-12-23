/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'black': 'rgb(20,20,20)',
      'white': 'rgb(235,235,235)',
      'yellow': 'rgb(236,165,48)',
      'red': 'rgb(222,77,68)',
    },
    extend: {},
  },
  plugins: [],
}