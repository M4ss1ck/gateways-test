//@ts-check
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#845EC2",
        dark: "#1e1e1e", // #4B4453
        light: "#B0A8B9",
        alert: "#C34A36",
        warning: "#DCA11C", // #FF8066
      },
    },
  },
  plugins: [],
};
