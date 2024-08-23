// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['@nuxtjs/color-mode']
  // plugins: [
  //   { src: '~/plugins/vue-flow.client.ts', mode: 'client' }
  // ]
})