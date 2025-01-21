/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './popup.html', './sidepanel.html'],
  theme: {
    extend: {
      colors: {
        primary: '#202225',
        secondary: '#fa89b5',
        'light-secondary-10': 'rgba(238, 93, 153, 0.1)',
      },
    },
  },
  plugins: [],
}
