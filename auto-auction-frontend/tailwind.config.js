const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif", defaultTheme.fontFamily.sans],
        serif: ["Raleway", "serif"],
        body: ["Raleway", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        gruppo: ["Gruppo", "sans-serif"],
      },
    },
  },
  plugins: [],
});
