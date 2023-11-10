import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          100: '#151515',
          90: '#414141',
          70: '#5C5C5C',
          40: '#A1A1A1',
          20: '#D0D0D0',
        },
        success: '#00B37E',
        error: '#BA1600',
      },
      keyframes: {
        fade: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slidedown: {
          '0%': {
            height: '0',
          },
          '100%': {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        slideup: {
          '0%': {
            height: 'var(--radix-accordion-content-height)',
          },
          '100%': {
            height: '0',
          },
        },
        contentShow: {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
      },
      animation: {
        fade: 'fade 1s ease-in-out',
        slidedown: 'slidedown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideup: 'slideup 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        contentShow: 'contentShow 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
