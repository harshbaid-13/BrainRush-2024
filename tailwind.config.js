/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      logoYellow: "#ffbd59",
      background: "#0f172a",
      navcol: "#F1B860",

      white: "#fff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        900: "#0F172A",
      },
      yellow: {
        300: "#fde047",
        500: "#eab308",
      },
      red: "#ff0000",
    },
  },
  plugins: [],
};