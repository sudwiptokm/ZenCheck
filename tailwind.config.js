// tailwind.config.js

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        primary: "#89C223",
        surface: "#1A2120",
        card_bg: "#4F5959",
      },
    },
  },
  plugins: [],
};
