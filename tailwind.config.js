module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "Roboto", "sans-serif"],
      serif: ["Batang"],
      code: ["Consolas"],
    },
    extend: {
      colors: {},
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
