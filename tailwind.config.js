/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        'tablet-max': { max: '767px' },
        'tablet-min': { min: '767px' },
        'mobile-max': { max: '501px' },
        'mobile-min': { min: '501px' },
        'laptop-hd-max': { max: '1280px' },
        'laptop-hd-min': { min: '1280px' },
      },
      width: {
        'swiper-size': 'calc(100% - 280px)',
      },
      translate: {
        center: '-50%',
      },
      colors: {
        primary: 'white',
        text: 'black',
        text_special: '#1d3b05',
        text_success: '#4c960c',
        border: '#505050',
        'text-nav': '#505050',
        button_bg: '#7c7c7c',
        text_hover_focus: '#00B9AE',
        background: 'rgb(249 250 251)',
        dark: {
          'table-row': '#4d5e7347',
          text: 'white',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'search-anim': {
          from: { width: 0 },
          to: { width: '94%' },
        },
        'search-focus-anim': {
          from: { width: '215px' },
          to: { width: '400px' },
        },
        'search-focus-anim-close': {
          from: { width: '400px' },
          to: { width: '215px' },
        },
        'skeleton-hide': {
          from: { display: 'flex' },
          to: { display: 'none' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'search-anim': 'search-anim 0.2s ease-out forwards',
        'search-focus-anim': 'search-focus-anim 0.2s ease-out forwards',
        'search-focus-anim-close': 'search-focus-anim-close 0.2s ease-out forwards',
        'skeleton-hide': 'skeleton-hide .9s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@xpd/tailwind-3dtransforms'), require('tailwind-scrollbar')],
};
