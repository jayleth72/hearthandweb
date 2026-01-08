/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...existing config...
  plugins: [
    // ...existing plugins...
    require('@tailwindcss/line-clamp'), // Add this if using line-clamp
  ],
}
