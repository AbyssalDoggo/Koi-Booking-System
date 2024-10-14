/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        stick: ["Stick", "sans-serif"],
      },
      colors: {
        grey: ["#4f4e4f"],
        wheat: ["#8d7e6c"],
      },
    },
  },
  plugins: [],
};
