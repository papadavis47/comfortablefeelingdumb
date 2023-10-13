/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Inter', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        frenchAzraq: '#4a69bd',
        darkSapphire: '#0c2461',
        russianBiscay: '#303952',
        deepRose: '#c44569',
        purpleMountain: '#786fa6',
        cornFlower: '#546de5',
        softBlue: '#778beb',
        watermelon: '##ff4757',
        jacksonsPurple: '#40407a',
        luckyPoint: '#2c2c54',
        lightYellow: '#fffa65',
        lightPink: '#ffcccc',
        brightLilac: '#cd84f1',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
