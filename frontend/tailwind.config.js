/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EAF4FF',
          100: '#D4E8FF',
          200: '#A9D1FF',
          300: '#7EBAFF',
          400: '#53A3FF',
          500: '#1976D2', // Secondary Blue
          600: '#0A4DA2', // Primary Blue
          700: '#083D82',
          800: '#062C5F',
          900: '#041C3E',
        },
        surface: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          hover: '#F1F5F9',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(10, 77, 162, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 25px -3px rgba(10, 77, 162, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'premium': '0 20px 40px -15px rgba(10, 77, 162, 0.15)',
      }
    },
  },
  plugins: [],
}
