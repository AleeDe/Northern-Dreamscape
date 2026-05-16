/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0d1f24",
        bone: "#f5efe4",
        sand: "#e8d9b8",
        ember: "#d97a3a",
        teal: {
          700: "#0e4a55",
          800: "#0c3640",
          900: "#0a2b33"
        }
      },
      fontFamily: {
        display: ["var(--display)"],
        sans: ["var(--ui)"],
        mono: ["var(--mono)"]
      }
    }
  },
  plugins: []
};
