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
        colorMode: 'dark',
        lastUpdated: false,
        contributors: false,
        sidebar: [{
            text: 'Introduction',
            link: 'README.md'
        }, {
            text: 'ChangeLog',
            link: 'CHANGELOG.md'
        }, {
            text: 'Todo',
            link: 'TODO.md'
        }],
        repo: 'https://github.com/emu-rabbit/vue-router-rule',
        editLink: false
    })
})