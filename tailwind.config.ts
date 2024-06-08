import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 6px 11.6px 0px rgba(164, 164, 164, 0.2)",
      },
      colors: {
        oasis: "#030317",
        error: {
          50: "#FBEDEE",
          100: "#F2C9CD",
          200: "#E1818A",
          300: "#D44B58",
          400: "#BF444F",
          500: "#7F2D35",
        },
        neutrals: {
          25: "#ffffff",
          50: "#FCFCFC",
          100: "#F9F9F9",
          150: "#F3F3F3",
          200: "#ECECEC",
          300: "#E0E0E0",
          400: "#CACACA",
          500: "#9D9D9D",
          600: "#868686",
          700: "#707070",
          800: "#5A5A5A",
          900: "#434343",
          1000: "#000000",
        },
      },
    },
    screens: {
      sm: "0px",
      md: "1600px",
      lg: "1850px",
      xl: "2200px",
    },
  },
  plugins: [],
} satisfies Config;
