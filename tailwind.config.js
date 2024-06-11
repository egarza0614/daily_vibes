/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,handlebars}", "./views/partials/**/*.{html,js,handlebars}"],
  theme: {
    extend: {
      colors: {
        "vibes-light-green": "#4a6d5d",
        "vibes-medium-green": "#3E5D4F",
        "vibes-dark-green": "#344F43"
      }
    },
  },
  plugins: [],
}

