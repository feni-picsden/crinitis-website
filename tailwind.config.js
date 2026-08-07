module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '3xl': '1800px',
        '4xl': '2000px',
        "mac-pro": {'min': '1380px', 'max': '1600px'},
      },

      fontSize: {
        'xxs': '0.65rem',
      },

      colors: {
        brown: {
          dark: '#4d3c26',
          light: '#54432d',
        },

        gold: {
          dark: '#c2a35c',
        },

        white: {
          off: '#efe8dc',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
