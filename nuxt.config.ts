// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        "@nuxtjs/tailwindcss",
        "nuxt-vuetify", "@nuxtjs/supabase"]
    ,
    ssr: false,
})
