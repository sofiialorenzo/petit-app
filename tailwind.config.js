/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    fontFamily: {
      body: ['Outfit', 'sans-serif'],
    },
    extend: {
      colors: {
        'purple-primary': '#5258EC',
        'purple-secondary': '#8D91F6',
        'purple-dark': '#3B42D6',
        'purple-light': '#D0D1FF',
        'orange-primary': '#E8753C',
        'orange-secondary': '#FF9866',
        'orange-dark': '#E77136',
        'white': '#FFFFFF',
        'gray-dark': '#666665',
        'red-primary': '#F94B60',
        'red-secondary': '#FF8090',
        'green-primary': '#04CA96',
        'green-secondary': '#54F2C9',
        'black': '#2C3139',
        'black-secondary': '#2C3139',
      },
      height: {
        '25': '6.25rem',
      },
      gridTemplateRows: {
        'layout': '64px 1fr 100px',
      }
    },
  },
  plugins: [],
}