module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  plugins: [require('@tailwindcss/typography'),require('daisyui')],
  daisyui: {
    themes: ['light','dark']
  }
}
