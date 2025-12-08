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
      'bg-global': '#0F0F0F',
      'bg-island': '#141414',
      'bg-island-iner': '#191919',
      'bg-accent': '#EA7B1E',
      'bg-overlay': '#0000007F',

      'text-accent': '#EA7B1E',
      'text-primary': '#FFF8F3',
      'text-secondary': '#FFF8F3B2',
      'text-tertiary': '#FFF8F366',
      'text-link': '#4528C9',
      'text-link-visited': '#A328C9',
      'text-placeholder': '#FFF8F372',

      'ic-primary': '#FFF8F3F9',
      'ic-secondary': '#FFF8F3AD',
      'ic-tertiary': '#FFF8F360',
      'ic-primary-inv': '#FFF8F3',
      'ic-secondary-inv': '#FFF8F3BC',
      'ic-tertiary-inv': '#FFF8F372',
      'ic-link': '#4528C9',
      'ic-placeholder': '#FFF8F36B',

      'button-primary-default': '#EA7B1E',
      'button-primary-hover': '#F28B36',
      'button-primary-active': '#BA631B',
      'button-primary-disabled': '#EA7B1E4C',

      'button-secondary-default': '#EA7B1E',
      'button-secondary-hover': '#F28B36',
      'button-secondary-active': '#BA631B',
      'button-secondary-disabled': '#EA7B1E4C',

      'button-tertiary-default': '#FFFFFF19',
      'button-tertiary-hover': '#FFFFFF28',
      'button-tertiary-active': '#FFFFFF14',
      'button-tertiary-disabled': '#FFFFFF05',

      'button-shadow-default': '#FFFFFF00',
      'button-shadow-hover': '#FFFFFF28',
      'button-shadow-active': '#FFFFFF14',
      'button-shadow-disabled': '#FFFFFF00',

      'button-disabled-gray': '#343434',

      'input-outline-default': '#FFFFFF66',
      'input-outline-hover': '#FFFFFF99',
      'input-outline-active': '#FFFFFF1A',
      'input-outline-disabled': '#FFFFFF1A',

      'input-fild-default': '#FFFFFF19',
      'input-fild-hover': '#FFFFFF26',
      'input-fild-active': '#FFFFFF08',
      'input-fild-disabled': '#FFFFFF05',

      'extra-danger': '#AC1E1E',
      'extra-danger-bg': '#AC1E1E1A',
      'extra-success': '#1D9B19',
      'extra-success-bg': '#1D9B191A',

      'divider-default': '#FFFFFF0D',
      'divider-hover': '#F28B36',
      'divider-accent': '#EA7B1E'

    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}