// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt'],
    runtimeConfig: {
        public: {
            apiBase: '' // Overridden by NUXT_PUBLIC_API_BASE environment variable
        }
    },
    app: {
        head: {
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' as any },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' }
            ]
        }
    }
})
