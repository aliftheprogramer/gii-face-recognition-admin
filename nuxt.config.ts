import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", '~/assets/css/fonts.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;600;700&display=swap'
        },
      ]
    }
  }
})
