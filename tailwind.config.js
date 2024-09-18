/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg': "url('/banner-bg.webp')",
        'dark': "url('/bg.webm')"
      }
    },
  },
  plugins: [],
}