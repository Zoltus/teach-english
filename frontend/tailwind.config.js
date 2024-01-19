/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  important: true,
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
  corePlugins: {
    preflight: false,
  },
}

