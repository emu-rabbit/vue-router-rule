import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
    base: '/vue-router-rule/',
    title: 'Vue Router Rule',
    markdown: {
        code: {
            lineNumbers: false
        }
    },
    theme: defaultTheme({
        colorMode: "dark",
        lastUpdated: false,
        contributors: false
    })
})