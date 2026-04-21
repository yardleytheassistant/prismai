import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070F",
        surface: "#0B1426",
        "surface-2": "#101B33",
        "surface-3": "#0F172A",
        primary: "#7B5CFF",
        secondary: "#4CC9F0",
        tertiary: "#F6C177",
        "text-primary": "#F7F9FF",
        "text-secondary": "#9AA4BF",
        "text-muted": "#6E7691",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-sora)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        mesh: "radial-gradient(ellipse at 50% 0%, rgba(123,92,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,212,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(255,107,107,0.08) 0%, transparent 50%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "counter": "counter 2s ease-out forwards",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(123,92,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(123,92,255,0.6), 0 0 80px rgba(0,212,255,0.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
