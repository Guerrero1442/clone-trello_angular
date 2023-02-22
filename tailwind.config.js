/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        success: colors.green,
        info: colors.blue,
        warning: colors.yellow,
        danger: colors.red,
        primary: colors.blue,
        secondary: colors.gray,
        dark: colors.black,
        light: colors.white,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
