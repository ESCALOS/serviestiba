/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ccd7d6",
          200: "#99aead",
          300: "#678684",
          400: "#345d5b",
          500: "#013532",
          600: "#012a28",
          700: "#01201e",
          800: "#001514",
          900: "#000b0a",
        },
        secondary: {
          100: "#d9ebd7",
          200: "#b2d7ae",
          300: "#8cc486",
          400: "#65b05d",
          500: "#3f9c35",
          600: "#327d2a",
          700: "#265e20",
          800: "#193e15",
          900: "#0d1f0b",
        },
        tertiary: {
          100: "#fbfbf9",
          200: "#f8f7f3",
          300: "#f4f2ee",
          400: "#f1eee8",
          500: "#edeae2",
          600: "#bebbb5",
          700: "#8e8c88",
          800: "#5f5e5a",
          900: "#2f2f2d",
        },
      },
    },
  },
  plugins: [],
};
