const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  konsta: {
    colors: {
      // "primary" is the main app color, if not specified will be default to '#007aff'
      primary: '#0b0b0b'
    }
  },
  theme: {
    extend: {
      colors: {
        primary: "#0b0b0b",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
});
