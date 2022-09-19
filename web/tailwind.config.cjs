/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    screens: {
      tablet: { max: '1120px' },
      tablet: { max: '820px' },
      largePhone: { max: '720px' },
      phone: { max: '512px' }
    },
    extend: {
      backgroundImage: {
        galaxyImage: 'url("/background-galaxy.png")',
        nlwGradient: 'linear-gradient(89.86deg, #9572FC, #43E7AD 50%, #E1D55D)',
        nlwVerticalGradient: 'linear-gradient(180deg, #9572FC 0%, #43E7AD 50.52%, #E2D45C 100%)',
        gameGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      }
    }
  },
  plugins: []
}
