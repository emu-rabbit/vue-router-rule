import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
    base: '/vue-router-rule/',
    title: 'Vue Router Rule',
    head: [
        ['link', { rel: 'shortcut icon', href: 'favicon.ico'}]
    ],
    markdown: {
        code: {
            lineNumbers: false
        }
    },
    theme: defaultTheme({
        colorMode: 'dark',
        lastUpdated: false,
        contributors: false,
        logo: './images/unicorn.png',
        sidebar: [{
            text: 'Introduction',
            link: '/README.md'
        }, {
            text: 'Guides',
            link: '/guides/installation.md',
            children: [{
                text: 'Installation',
                link: '/guides/installation.md'
            }, {
                text: 'Define Router Rules',
                link: '/guides/defineRules.md'
            }, {
                text: 'Context',
                link: '/guides/context.md'
            }, {
                text: 'Store',
                link: '/guides/store.md'
            }, {
                text: 'Event Bus',
                link: '/guides/event-bus.md'
            }]
        }, {
            text: 'APIs',
            link: '/apis/core.md',
            children: [{
                text: 'Core',
                link: '/apis/core.md'
            }]
        }, {
            text: 'FAQ',
            link: '/FAQ.md'
        }, {
            text: 'ChangeLog',
            link: '/CHANGELOG.md'
        }, {
            text: 'Todo',
            link: '/TODO.md'
        }],
        repo: 'https://github.com/emu-rabbit/vue-router-rule',
        editLink: false
    })
})