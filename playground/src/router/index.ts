import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/Layout/index.vue'

import RouteInfo from '@/views/RouteInfo.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Layout,
            children: [{
                path: '/:pathMatch(.*)*',
                component: RouteInfo
            }]
        }
    ]
})

export default router
