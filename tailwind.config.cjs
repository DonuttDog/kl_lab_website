/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#F7F8FA',
        surface: '#FFFFFF',
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#6B7280',
        },
        border: '#E5E7EB',
        brand: {
          DEFAULT: '#14B8C4',
          hover: '#0EA5B4',
        },
        /** Stitch 对齐：深青主色、次要色、浅底（与 Week2 并存） */
        brandInk: '#006970',
        brandSecondary: '#39656a',
        surfaceMuted: '#f2f4f6',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(17, 24, 39, 0.08)',
        panel: '0 8px 24px rgba(17, 24, 39, 0.10)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
      },
      maxWidth: {
        content: '1200px',
      },
      backgroundImage: {
        'signature-gradient': 'linear-gradient(135deg, #006970 0%, #14b8c4 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
