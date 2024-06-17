/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: 'Inter',
      pop: 'Poppins',
    },
    extend: {
      screens: {
        'xs': '490px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};