/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados inspirados en Bacocho
        'sand-light': '#F5F5DC', // Arena clara
        'sand-dark': '#E2D1B3',  // Arena mojada
        'ocean-blue': '#2A9D8F', // El tono del mar en Puerto
        'sunset-orange': '#E76F51', // Atardecer en la playa
        'deep-palm': '#264653', // Verde palma profundo
      },
      fontFamily: {
        // Si quieres usar fuentes bonitas después
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}