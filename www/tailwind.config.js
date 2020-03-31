const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        serif: ['Roboto\\ Slab', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        nearBlack: "#070809",
        logoBlue: "#291cad"
      }
    },
  },
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar"
    })
  ]
};
