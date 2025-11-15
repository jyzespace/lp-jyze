import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Parkinsans", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          primary: "#3AE066",    // Verde principal
          cyan: "#3AE0D6",       // Ciano
          aqua: "#3AE09E",       // Verde água
          lime: "#4BE03A",       // Verde limão
          blue: "#3AB5E0",       // Azul
          mint: "#73E1B5",       // Verde menta
          chatBlue: "#3AD5E0",   // Azul ciano do chat
        },
      },
    },
  },
  plugins: [],
};

export default config;
