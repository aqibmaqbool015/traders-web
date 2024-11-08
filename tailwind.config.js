/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlue: '#262465',
        customOrange: '#F6931E',
        customBg: '#E0E2E9',
        customText: '#868D94',
        customGray: "#CFCFCF",
        customLight: '#F1F6FB',
        customDarkGray: '#7C7C7C',
        customColorNav: '#5D5D5D',
        customLightColor: '#F1EFEF',
        customBlackLight: '#1E1E1E',
        customBorderColor: '#d9d9d9',
        customGrayLine: '#A5A8AB',
        customLightOrange: '#FBD4A5',
        customBgButton: '#E5E5ED',
        customExtralight: '#f5e9db',
        customSmallGray: '#A3A3A3',
        customRed: '#F53535',
        customDashed: '#B8B8B8',
        customGrayA: '#AAAAAA',
        customLightBorder: '#EDEDED',
        customBlackDark: '#464647',
        customCardBg: '#F6F6F6',
        customBorderChat: '#CDCDCD',
        customMessage: '#666666',
        customOrangeLightBg: '#fef2e4',
      },
      boxShadow: {
        'custom': '0px 0px 16.35px 0px #00000033',
        'customShaddow': '0px 0px 14.53px 0px rgba(0, 0, 0, 0.23)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
