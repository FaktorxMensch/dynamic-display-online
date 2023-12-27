// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: [
        "@nuxtjs/tailwindcss",
        "nuxt-vuetify", "@nuxtjs/supabase"]
    ,
    ssr: false,
    supabase: {
        redirectOptions: {
            // login: '/login',
            // callback: '/confirm',
            exclude: ['/slideshow/**'],
        }
    }
})
