/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
        spacing: {
          30: '30px', // Define 30px for consistent spacing
        },
      },
    },
    plugins: [
      function ({ addUtilities }) {
        addUtilities({
          '.my-masonry-grid': {
            display: 'flex',
            marginLeft: '-30px', // Adjust based on gap
            width: 'auto',
          },
          '.my-masonry-grid_column': {
            paddingLeft: '30px', // Adjust based on gap
            backgroundClip: 'padding-box',
          },
        });
      },
    ],
  
};
