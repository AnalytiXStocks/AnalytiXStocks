/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#3b82f6',
        background: '#f8fafc',
        text: '#1e293b'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 