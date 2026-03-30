import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          "sky-blue": "#5568AF",
          aqua: "#CEEEAE",
          lime: "#CDD629",
          rose: "#EC1763",
          blush: "#F8C9DD",
          sunset: "#F37826",
        },
        // Neutrals
        neutral: {
          offwhite: "#F7F4EF",
          stone: "#E8E1D8",
          "near-black": "#111111",
          charcoal: "#2B2B2B",
          "soft-gray": "#8C8C8C",
          "surface-gray": "#F5F5F3",
        },
      },
      fontFamily: {
        nohemi: ["var(--font-nohemi)", "Outfit", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        // Desktop scale
        "hero-display": ["clamp(3rem, 5vw, 6rem)", { lineHeight: "0.94", fontWeight: "800" }],
        "h1": ["clamp(2.5rem, 4vw, 4.5rem)", { lineHeight: "0.98", fontWeight: "700" }],
        "h2": ["clamp(2rem, 3vw, 3.25rem)", { lineHeight: "1.04", fontWeight: "700" }],
        "h3": ["clamp(1.5rem, 2vw, 2.25rem)", { lineHeight: "1.08", fontWeight: "600" }],
        "h4": ["clamp(1.25rem, 1.5vw, 1.75rem)", { lineHeight: "1.14", fontWeight: "600" }],
        "body-lg": ["clamp(1.05rem, 1.2vw, 1.25rem)", { lineHeight: "1.52" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "small": ["0.875rem", { lineHeight: "1.5" }],
        "meta": ["0.8125rem", { lineHeight: "1.4" }],
        "caption": ["0.75rem", { lineHeight: "1.4" }],
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },
      borderRadius: {
        "sm-brand": "12px",
        "md-brand": "20px",
        "lg-brand": "28px",
        "xl-brand": "36px",
        pill: "999px",
      },
      maxWidth: {
        container: "1520px",
        content: "1440px",
      },
      boxShadow: {
        "soft": "0 2px 8px rgba(0,0,0,0.06)",
        "card": "0 4px 16px rgba(0,0,0,0.08)",
        "elevated": "0 8px 32px rgba(0,0,0,0.10)",
        "nav": "0 4px 24px rgba(0,0,0,0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionDuration: {
        "micro": "150ms",
        "hover": "200ms",
        "drawer": "280ms",
        "section": "400ms",
      },
      transitionTimingFunction: {
        "brand": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "brand-out": "cubic-bezier(0, 0, 0.25, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
