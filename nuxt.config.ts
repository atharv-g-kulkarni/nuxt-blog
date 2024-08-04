// nuxt.config.js or nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
  css: ["@patternfly/patternfly/patternfly.css"],
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME,
    MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
  },
  nitro: {
    plugins: ["~/server/plugins/dbconnection.js"],
  },
  routeRules:{
    '/**': { appMiddleware: ['auth'] }
  }
});
