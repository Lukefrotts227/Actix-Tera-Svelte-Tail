/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html, js, svelte}', 
    './static/**/*.{html, js, svelte',
    './client_builder/src/**/*.{html, js, svelte}',
    './static/svelte/**/*.{html, js, svelte}',
    './static/svelte/*.html',
    './static/templates/**/*.{html, js, svelte}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

