module.exports = {
  mode: "jit", // enable tailwind just in time
  content: [
    "./js/*.js",
    "index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};