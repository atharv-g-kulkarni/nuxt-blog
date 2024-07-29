// nuxt.config.js or nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
  css: ["@patternfly/patternfly/patternfly.css"],
  app: {
    head: {
      link: [{ rel: "stylesheet", href: "/css/patternfly.css" }],
    },
  },
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  nitro: {
    plugins: ["~/server/plugins/dbconnection.js"],
  },
});
