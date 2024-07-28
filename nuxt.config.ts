// nuxt.config.js or nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  css: ["@patternfly/patternfly/patternfly.css"],
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "/css/patternfly.css" },
      ],
    },
  },
});
