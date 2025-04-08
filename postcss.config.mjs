/**
 * @type {import('postcss-load-config').Config}
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {
      optimize: {
        minify: false
      }
    }
  }
}
