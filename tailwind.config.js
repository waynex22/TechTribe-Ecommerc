/** @type {import('tailwindcss').Config} */
// import withMT from "@material-tailwind/html/utils/withMT";

module.exports = ({
  content: [
    './index.html'
    , './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    './node_modules/tw-elements/dist/js/**/*.js']
  ,
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#577BEA',
        secondary: '#579CEA',
        mint : '#82B3C2',
        mints: '#9ABFC7',
        bg_gray:' #efefef',
      },
      backgroundImage: {
        hero: "url('./img/herobg.png')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
  // plugins: [require('flowbite/plugin'), require("tw-elements/dist/plugin.cjs")],
});