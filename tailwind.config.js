module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./package/**/*.{js,ts,jsx,tsx}",
    "./previewsComponents/**/*.{js,ts,jsx,tsx}",
    "./examples/**/*.{js,ts,jsx,tsx}",
    "./viewport/**/*.{js,ts,jsx,tsx}",
    "./componentsDB/**/*.md",
  ],
  theme: {
    fontFamily: {
      title: ['DOUYU'],
      body: ['Microsoft YaHei UI'],
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
