/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'Lora'", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
        sans: ["'Syne'", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#030712",
          900: "#050c1a",
          800: "#0a1628",
          700: "#0f2040",
          600: "#142a55",
        },
        pharma: {
          teal: "#0cd4c8",
          cyan: "#22d3ee",
          emerald: "#10d9a0",
          blue: "#3b9eff",
          violet: "#818cf8",
          rose: "#fb7185",
        },
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "scan-line": "scanLine 4s linear infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
