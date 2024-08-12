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
        DEFAULT: '0',
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
        primary: '#0A68FF',
        secondary: '#579CEA',
        mint : '#82B3C2',
        mints: '#9ABFC7',
        bg_gray:' #efefef',
        bg_admin: "#344767"
      },
      backgroundImage: theme => ({
      'bg-admin-img': "url('https://parkersuccessacademy.com/wp-content/uploads/2020/01/iStock-1039532442.jpg')",
      'footer-texture': "url('/img/footer-texture.png')",
      })
    },


  },
  plugins: [
    require('flowbite/plugin')
  ]
  // plugins: [require('flowbite/plugin'), require("tw-elements/dist/plugin.cjs")],
});