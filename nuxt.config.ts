// nuxt.config.js or nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ["@nuxt/eslint"],
  runtimeConfig:{
    MONGO_URI:process.env.MONGO_URI,
  }
})