/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0c0d10',
          900: '#101116',
          800: '#16181f',
          700: '#1e2029',
          600: '#2a2d3a'
        },
        amber: {
          glow: '#f5a623'
        }
      }
    }
  },
  plugins: []
}
