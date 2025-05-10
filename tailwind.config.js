// tailwind.config.js
export default {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite-react/**/*.js",
      "./node_modules/flowbite/**/*.js"
    ],
    plugins: [
      require("flowbite/plugin"),
    ],
  };