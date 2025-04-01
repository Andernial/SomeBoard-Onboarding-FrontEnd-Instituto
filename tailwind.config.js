import { withTV } from 'tailwind-variants/dist/transformer.js';

/** @type {import('tailwindcss').Config} */
export default withTV({
 darkMode: ['class'],
 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
 theme: {
  screens: {
   sm: '576px',
   md: '960px',
   lg: '1440px',
  },

  backgroundImage: {
   guina: "url('./src/assets/images/guina.jpeg')",
   'card-placeholder': "url('./src/assets/images/card-placeholder.png')"
  },

  fontFamily: {
   primary: ['Poppins', 'Sans-serif'],
   secondary: ['OpenSans', 'Sans-serif'],
  },

  fontSize: {
   xs: '14px',
   sm: '16px',
   md: '18px',
   lg: '24px',
   xl: '28px',
   '2xl': '48px',
  },

  fontWeight: {
   regular: '400',
   medium: '500',
   semibold: '600',
   bold: '700',
  },

  lineHeight: {
   1: '100%',
   1.2: '120%',
   1.5: '150%',
  },

  borderRadius: {
   xs: '04px',
   sm: '08px',
   md: '12px',
   lg: '24px',
  },

  spacing: {
   xxs: '8px',
   xs: '16px',
   sm: '24px',
   md: '32px',
   lg: '40px',
   xl: '100px',
  },

  colors: {
   lightGreen: '#A3DA58',
   transparent: '#00000000',

   grayScale: {
    white: '#ffffff',
    xlight: '#e3e3e3',
    light: '#f8f8f8',
    medium: '#b5b5b5',
    dark: '#626262',
    xdark: '#303030',
    xxdark: '#121212',
   },

   brand: {
    primary: {
     light: '#bdffe4',
     medium: '#01d5ad',
     dark: '#0a6c53',
     xdark: '#054334',
    },

    accessory: {
     xlight: '#e3f9f4',
     light: '#90e8d0',
     medium: '#00b69d',
     beige: '#fcf9f4',
     red: '#f11426',
     magenta: '#b51a76',
    },
   },

   application: {
    icons: {
     lightbg: {
      clickable: '#303030',
      disable: '#b5b5b5',
      information: '#626262',
     },

     darkbg: {
      selected: '#ffffff',
      notSelected: '#b5b5b5',
      information: '#626262',
     },
    },
   },

   feedback: {
    success: {
     light: '#daf0e1',
     medium: '#379559',
     dark: '#153822',
    },

    error: {
     light: '#f9d3d2',
     medium: '#d42f29',
     dark: '#801a16',
     xdark: '#450f0d',
    },

    warning: {
     light: '#fff3cd',
     medium: '#dfb724',
     dark: '#735a00',
    },
   },
  },
  extend: {
   colors: {},
  },
 },
 plugins: [require('tailwindcss-animate')],
});
