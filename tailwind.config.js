import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        accent: {
          DEFAULT: "#452829",
          50: "#f5f2f2",
          100: "#e8e0e0",
          200: "#d4c4c4",
          300: "#b8a0a0",
          400: "#9a7a7a",
          500: "#7d5d5d",
          600: "#6b4d4d",
          700: "#5a3f3f",
          800: "#4d3535",
          900: "#452829",
          950: "#241414",
        },
        primary: {
          DEFAULT: "#ffffff",
        },
        secondary: {
          DEFAULT: "#6b7280",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;