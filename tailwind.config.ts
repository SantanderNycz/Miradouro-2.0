import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#241A38", shell: "#2A1A42", primary: "#5A31C9", primaryDeep: "#3A1F7A",
        accentL: "#B9A7EE", wash: "#F7F5FB", line: "#ECEAF2", muted: "#8B8698",
      },
      fontFamily: { sans: ["Poppins", "system-ui", "sans-serif"], serif: ["Lora", "serif"] },
    },
  },
  plugins: [],
};
export default config;
