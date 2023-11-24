/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
      colors: {
        colorOriginal: 'hsl(var(--colorOriginal) / <alpha-value>)',
        colorBackground: 'hsl(var(--colorBackground) / <alpha-value>)',
        colorStrongText: 'hsl(var(--colorStrongText) / <alpha-value>)',
        colorSubtleText: 'hsl(var(--colorSubtleText) / <alpha-value>)',
        colorStrongestText: 'hsl(var(--colorStrongestText) / <alpha-value>)',
        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        headings: 'hsl(var(--headings) / <alpha-value>)',
        subjects: 'hsl(var(--subjects) / <alpha-value>)',
        darkness: 'hsl(var(--darkness) / <alpha-value>)',
        shift: 'hsl(var(--shift) / <alpha-value>)',
        russianBiscay: '#303952', // hsl(224, 26%, 25%)
        deepRose: '#c44569', // 	hsl(343, 52%, 52%)
        cornFlower: '#546de5', // 	hsl(230, 74%, 61%)
        softBlue: '#778beb',
        watermelon: '#ff4757',
        luckyPoint: '#2c2c54',
        lightYellow: '#fffa65',
        lightPink: '#ffcccc',
        brightLilac: '#cd84f1',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
