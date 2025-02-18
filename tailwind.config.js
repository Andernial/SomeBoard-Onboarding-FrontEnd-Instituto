import { withTV } from 'tailwind-variants/dist/transformer.js';

/** @type {import('tailwindcss').Config} */
export default withTV({
 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
 theme: {
  screens: {
   sm: '576px',
   md: '960px',
   lg: '1440px',
  },

  fontFamily: {
   primary: ['Poppins', 'Sans-serif'],
   secondary: ['OpenSans', 'Sans-serif'],
  },

  fontSize: {
   'x-small': '14px',
   small: '16px',
   medium: '18px',
   large: '24px',
   'x-large': '28px',
   'xx-large': '48px',
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
   small: '08px',
   medium: '12px',
   large: '24px',
  },

  spacing: {
   'x-small': '16px',
   small: '24px',
   medium: '32px',
   large: '40px',
   'x-large': '100px',
  },

  colors: {
   lightGreen: '#A3DA58',

   grayScale: {
    white: '#ffffff',
    'x-light': '#e3e3e3',
    light: '#f8f8f8',
    medium: '#b5b5b5',
    dark: '#626262',
    'x-dark': '#303030',
    'xx-dark': '#121212',
   },

   brand: {
    primary: {
     light: '#bdffe4',
     medium: '#01d5ad',
     dark: '#0a6c53',
     'x-dark': '#054334',
    },

    accessory: {
     'x-light': '#e3f9f4',
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
     'x-dark': '#450f0d',
    },

    warning: {
     light: '#fff3cd',
     medium: '#dfb724',
     dark: '#735a00',
    },
   },
  },
 },
 plugins: [],
});
