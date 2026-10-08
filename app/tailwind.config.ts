import type { Config } from "tailwindcss";

const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: {
      fontFamily: { sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"] },
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        card: token("card"),
        border: token("border"),
        input: token("border"),
        ring: token("primary"),
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground") },
        secondary: { DEFAULT: token("secondary"), foreground: token("foreground") },
        muted: { DEFAULT: token("secondary"), foreground: token("muted-foreground") },
        accent: { DEFAULT: token("secondary"), foreground: token("foreground") },
      },
    },
  },
  plugins: [],
} satisfies Config;
