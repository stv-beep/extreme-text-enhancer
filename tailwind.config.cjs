/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        s: { max: '768px' },
        xs: { max: '540px' },
        xxs: { max: '400px' }
      }
    }
  },
  plugins: []
}
