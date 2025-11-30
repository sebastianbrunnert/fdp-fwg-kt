/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Change pink-600 color
    extend: {
      colors: {
        'pink-600': '#E6007E',
        'orange-600': '#FF7701'
      },
    },
  },
  plugins: [],
}
