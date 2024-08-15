/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode:'class',
  theme: {
    extend: {
      aspectRatio: {
        '1': '1',
      },

      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '70%': { transform: 'rotate(14deg)' },
          '80%': { transform: 'rotate(-8deg)' },
          '90%': { transform: 'rotate(14deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },

        bounce:{
          '0%': {
            transform: 'translateY(-15%)',
            'animation-timing-function':'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function':'cubic-bezier(0 , 0, .2, 1)'
          },
          '100%': {
            transform: 'translateY(-15%)',
            'animation-timing-function':'cubic-bezier(0.8, 0, 1, 1)'
          },
                }
      },
      animation:{
        'bounce-letter':'wave 2s 10',
        'bounce-green':'bounce 2s 10'

      },
    },
  },
  plugins: [],
};
