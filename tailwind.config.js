/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: '#FF9900',
          'orange-dark': '#E88B00',
          gray: {
            light: '#F5F5F5',
            DEFAULT: '#232F3E',
            dark: '#131921'
          }
        }
      }
    },
  },
  plugins: [],
};