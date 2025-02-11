/** @type {import('tailwindcss').Config} */
export default {
 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
 theme: {
  screens: {
   sm: '640px',
   md: '768px',
   lg: '1024px',
   xl: '1280px',
   '2xl': '1536px',
  },

  fontFamily: {
   primary: ['poppins', 'sans-serif'],
   secundary: ['openSans', 'sans-serif'],
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
   s: '16px',
   m: '24px',
   mm: '32px',
   l: '40px',
   xl: '100px',
  },

  colors: {
   white: '#ffffff',
   'x-light': '#f8f8f8',
   light: '#e3e3e3',
   medium: '#b5b5b5',
   dark: '#626262',
   'x-dark': '#303030',
   'xx-dark': '#121212',

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
     lighbg: {
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
 },
 plugins: [],
};
