/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Cinzel': '"Cinzel", serif',
        'Inter': '"Inter", serif'
      },
      backgroundImage: {
        'featured-img': 'url(./src/assets/home/featured.jpg)',
        'promo-img': 'url(./src/assets/home/chef-service.jpg)',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

