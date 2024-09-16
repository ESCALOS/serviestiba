/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cdf2e1",
          200: "#9ae5c2",
          300: "#68d9a4",
          400: "#35cc85",
          500: "#03bf67",
          600: "#029952",
          700: "#02733e",
          800: "#014c29",
          900: "#012615",
        },
        secondary: {
          100: "#fcf4d8",
          200: "#fae8b1",
          300: "#f7dd8b",
          400: "#f5d164",
          500: "#f2c63d",
          600: "#c29e31",
          700: "#917725",
          800: "#614f18",
          900: "#30280c",
        },
        tertiary: {
          100: "#f2f6e3",
          200: "#e5edc7",
          300: "#d8e5ac",
          400: "#cbdc90",
          500: "#bed374",
          600: "#98a95d",
          700: "#727f46",
          800: "#4c542e",
          900: "#262a17",
        },
      },
    },
  },
  plugins: [],
};
