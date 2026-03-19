/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors based on the Aspire UI
        primary: {
          DEFAULT: '#01D167',
          50: '#E6FBF0',
          100: '#B3F3D4',
          200: '#80EBB8',
          300: '#4DE39C',
          400: '#1ADB80',
          500: '#01D167',
          600: '#01A852',
          700: '#017F3E',
          800: '#00562A',
          900: '#002D16',
        },
        secondary: {
          DEFAULT: '#325BAF',
          50: '#E8EDF6',
          100: '#C5D1E9',
          200: '#9FB3DB',
          300: '#7995CD',
          400: '#5377BF',
          500: '#325BAF',
          600: '#28498C',
          700: '#1E3769',
          800: '#142546',
          900: '#0A1223',
        },
        navy: {
          DEFAULT: '#0C365A',
          light: '#23486A',
          dark: '#072140',
        },
        // Neutral colors
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'sidebar': '2px 0 12px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
}

