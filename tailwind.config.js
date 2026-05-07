/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#10263f',
        ink: '#0f172a',
        primary: '#075dbf',
        primaryDark: '#064c9d',
        cta: '#e5232a',
        softBlue: '#edf5ff',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 22px 60px rgba(15, 23, 42, 0.16)',
        card: '0 14px 35px rgba(15, 23, 42, 0.08)',
        nav: '0 5px 20px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
