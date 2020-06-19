const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        serif: ['Roboto\\ Slab', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        midnight: {
            100: "#a4baed",
            200: "#7f9bf5",
            300: "#5d76f5",
            400: "#4253ed",
            500: "#2f34de",
            600: "#2b22c9",
            700: "#291dad",
            800: "#2e1c8a",
            900: "#2b1961",
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar"
    })
  ]
};
