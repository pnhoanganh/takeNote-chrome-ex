/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './popup.html', './sidepanel.html'],
  theme: {
    extend: {
      colors: {
        primary: '#202225',
        secondary: 'rgb(238,93,153)',
        'light-secondary-10': '#f2acc9',
        'light-secondary-20': 'rgba(238, 93, 153, 0.2)',
        'light-secondary-40': 'rgba(238, 93, 153, 0.4)',
      },
      boxShadow: {
        btnShadow: '0 2px 0 rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
}
