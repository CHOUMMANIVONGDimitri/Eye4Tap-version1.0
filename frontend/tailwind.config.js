/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scaleUp: {
          "0%": {
            transform: "scale(1) rotate(-45deg)",
            opacity: 1,
          },
          "100%": { transform: "scale(1.5) rotate(-45deg)", opacity: 0 },
        },
        goUp: {
          "0%": {
            transform: "translateY(150%)",
            opacity: 0,
          },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        goDown: {
          "0%": {
            transform: "translateY(-150%)",
            opacity: 0,
          },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        goRight: {
          "0%": {
            transform: "translateX(-150%)",
            opacity: 0,
          },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        appear: {
          "0%": {
            opacity: 0,
          },
          "100%": { opacity: 1 },
        },
        slideMenu: {
          "0%": {
            transform: "translateX(150%)",
            opacity: 0,
          },
          "75%": {
            opacity: 0.5,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
      },
      animation: {
        scaleUp: "scaleUp 1s ease-in-out infinite",
        goUp: "goUp 3s ease-in-out 1",
        goDown: "goDown 3s ease-in-out 1",
        goRight: "goRight 3s ease-in-out 1",
        appear: "appear 1s ease-in-out 1",
        slideMenu: "slideMenu 1s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
