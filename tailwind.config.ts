import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./types/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: "#eef4ff", 100: "#d9e8ff", 700: "#16406f", 800: "#102f55", 900: "#0a2342" },
        sky: { 100: "#dff3ff", 500: "#1fa7dd", 600: "#0c86bb" },
        orange: { 100: "#fff0df", 500: "#f97316", 600: "#dc5f08" },
        graphite: { 50: "#f7f8fa", 100: "#eceff3", 500: "#667085", 700: "#344054", 900: "#101828" }
      },
      boxShadow: { soft: "0 18px 45px rgba(10, 35, 66, 0.10)" },
      borderRadius: { brand: "16px" },
      transitionDuration: { brand: "250ms" }
    }
  },
  plugins: []
};
export default config;
