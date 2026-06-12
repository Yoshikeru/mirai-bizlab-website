/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC2626',
          'red-dark': '#B91C1C',
          'red-light': '#FEE2E2',
          black: '#0A0A0A',
          'gray-dark': '#1F2937',
          'gray-mid': '#6B7280',
          'gray-light': '#F3F4F6',
          white: '#FFFFFF',
        },
        // 週刊タイ経済 デモ用パレット（紺＋金）
        tk: {
          navy: '#16284B',
          'navy-2': '#1F3A6B',
          gold: '#C9A24B',
          'gold-light': '#E3C97E',
          ice: '#EAF0F8',
          cream: '#F7F4EC',
          ink: '#23303F',
          mute: '#6B7787',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'Noto Sans Thai', 'sans-serif'],
        display: ['Inter', 'Noto Sans JP', 'Noto Sans Thai', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
