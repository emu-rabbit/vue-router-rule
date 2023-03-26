import { createMemoryHistory, createRouter } from 'vue-router'

const router = createRouter({
    history: createMemoryHistory(''),
    routes: [
        {
            path: '/',
            component: { template: '<router-view />' },
            children: [{
                path: '/:pathMatch(.*)*',
                component: { template: '' }
            }]
        }
    ]
})

export default router