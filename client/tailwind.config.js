/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    listStyleType: {
      square: "square",
    },
    extend: {
      width: {
        main: "1280px",
      },
      backgroundColor: {
        main: "#ee3a3a",
        overlay: "rgba(0,0,0,0.3)",
      },
      colors: {
        main: "#ee3a3a",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(20px)",
            transform: "translateY(20px)",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
        },
        "slide-top-sm": {
          "0%": {
            "-webkit-transform": "translateY(8px)",
            transform: "translateY(8px)",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
        },
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-100%)",
            transform: "translateX(-100%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translatex(0)",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-top-sm": "slide-top-sm 0.3s linear both;",
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],
};
