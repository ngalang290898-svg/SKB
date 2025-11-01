/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fbb03b",
        secondary: "#7a5af8",
        accent: "#008c7a",
        danger: "#f04e23",
        pastel: "#fdebd3",
        dark: "#121212",
        light: "#ffffff",
      },
      backgroundImage: {
        "gradient-sunset": "linear-gradient(to bottom,#fbd9a5,#a1e3d8)",
        "gradient-rising": "linear-gradient(145deg,#fbb03b 0%,#7a5af8 100%)",
        "gradient-deep": "linear-gradient(160deg,#0f0f0f 0%,#1a1a2e 100%)",
      },
      boxShadow: { 
        glow: "0 0 20px rgba(251,176,59,0.4)",
        "glow-secondary": "0 0 20px rgba(122,90,248,0.4)"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Poppins", "Montserrat", "sans-serif"],
        body: ["var(--font-body)", "Inter", "Roboto Flex", "sans-serif"],
      },
    },
  },
  plugins: [],
}
