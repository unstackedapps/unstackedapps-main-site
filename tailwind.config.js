/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-up": "fade-up 0.8s ease-out forwards",
        float: "float 12s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease-in-out infinite",
        "marketing-sync-spin": "marketing-sync-spin 8s linear infinite",
        "marketing-think-dot": "marketing-think-dot 1.2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-in": "slide-in 0.3s ease-out forwards",
        "tech-rail": "tech-rail 48s linear infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        border: "hsl(var(--border))",
        brand: {
          cream: "#f3efe6",
          navy: "#0c1219",
          "navy-card": "#141c27",
          "navy-muted": "#101820",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        input: "hsl(var(--input))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ring: "hsl(var(--ring))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      fontFamily: {
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        raleway: ["Raleway", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(15px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "marketing-sync-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "marketing-think-dot": {
          "0%, 100%": { opacity: "0.4", transform: "translateY(0)" },
          "20%": { opacity: "1", transform: "translateY(-5px)" },
          "40%": { opacity: "0.4", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "tech-rail": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
      },
    },
  },
};
