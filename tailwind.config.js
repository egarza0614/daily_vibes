/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,handlebars}", "./views/partials/**/*.{html,js,handlebars}", "./public/**/*.{html,js,handlebars}"],
  theme: {
    extend: {
      colors: {
        "vibes-light-green": "#4a6d5d",
        "vibes-medium-green": "#3E5D4F",
        "vibes-dark-green": "#344F43",
        "vibes-alert-red": "#802727"
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1279px'},
      'xl': {'min': '1280px', 'max': '1535px'},
      '2xl': {'min': '1536px'},
    },
  }
}