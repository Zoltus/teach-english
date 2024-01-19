/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  important: '#root',
  theme: {
    extend: {
      backgroundColor: {
        'perfect-gray': '#D8D9DD',
      },
      textColor: {
        'perfect-gray': '#D8D9DD',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

