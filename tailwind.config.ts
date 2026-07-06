import type { Config } from "tailwindcss";

/**
 * Tokens da identidade visual AHK (Manual de Identidade AHK-SP) +
 * paleta de UI derivada do design "AHK Talent Bridge" (Claude Design).
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ahk: {
          // Cores oficiais do manual
          blue: "#003366", // AHK DARK BLUE
          "light-blue": "#CCD7E6", // AHK LIGHT BLUE
          black: "#000000",
          "dark-grey": "#474747",
          "medium-grey": "#D0D0D0",
          "light-grey": "#F2F2F2",
          orange: "#DE8703",
          green: "#28AD84",
          yellow: "#FFDE5B",
          red: "#C34343",
          cyan: "#00A6E3", // BLUE (accent) do manual
        },
        // Tons de apoio usados no design (derivados, não oficiais)
        brand: {
          "blue-deep": "#062A4E", // rodapé
          "green-bright": "#5FE0B4", // score em fundo escuro
          "green-soft": "#E8F6F0",
          "blue-soft": "#EAF1FA",
          "bg-soft": "#F4F7FB",
          border: "#E7EBF1",
          ink: "#474747",
          "ink-strong": "#3C4652",
          muted: "#5C6773",
          "muted-2": "#7B8592",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      maxWidth: {
        shell: "1240px",
        "shell-narrow": "1080px",
        "shell-detail": "1000px",
      },
      boxShadow: {
        card: "0 30px 60px -32px rgba(0,51,102,0.28)",
        "card-strong": "0 30px 60px -30px rgba(0,51,102,0.5)",
        "job-hover": "0 18px 40px -26px rgba(0,51,102,0.35)",
        form: "0 24px 50px -34px rgba(0,51,102,0.3)",
      },
      keyframes: {
        floatUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        drawLine: {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
        pulseDot: {
          "0%,100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.35)", opacity: ".55" },
        },
        growBar: { from: { width: "0" } },
      },
      animation: {
        floatUp: "floatUp .6s ease both",
        "floatUp-slow": "floatUp .8s ease both",
        drawLine: "drawLine 1.4s .3s ease both",
        pulseDot: "pulseDot 2s infinite",
        growBar: "growBar 1.2s .5s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
