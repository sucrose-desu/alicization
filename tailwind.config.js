// const { heroui } = require('@heroui/react')

/**
 * @type {import("tailwindcss").Config}
 */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
    // './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      container: {
        center: false
      },
      grayscale: {
        25: '25%',
        50: '50%',
        75: '75%'
      },
      zIndex: {
        100: '100',
        150: '150',
        max: '9999'
      }
    }
  },
  plugins: []
}
