/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(rgba(20,20,20,1) 40%, rgba(0,0,0,0) 70%)"
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "type": {
          "normal": "#aaaa99",
          "fighting": "#bb5544",
          "flying": "#8899ff",
          "poison": "#aa5599",
          "ground": "#ddbb55",  
          "rock": "#bbaa66",
          "bug": "#aabb22",
          "ghost": "#6666bb",
          "steel": "#aaaabb",
          "fire": "#ff4422",
          "water": "#3399ff",
          "grass": "#77cc55",
          "electric": "#ffcc33",
          "psychic": "#ff5599",
          "ice": "#66ccff",
          "dragon": "#7766ee",
          "dark": "#775544",
          "fairy": "#ee99ee",
        }
      },
    },
  },
  safelist: [
    "bg-type-normal",
    "bg-type-fighting",
    "bg-type-flying",
    "bg-type-poison",
    "bg-type-ground",
    "bg-type-rock",
    "bg-type-bug",
    "bg-type-ghost",
    "bg-type-steel",
    "bg-type-fire",
    "bg-type-water",
    "bg-type-grass",
    "bg-type-electric",
    "bg-type-psychic",
    "bg-type-ice",
    "bg-type-dragon",
    "bg-type-dark",
    "bg-type-fairy",
  ],
  plugins: [],
}

