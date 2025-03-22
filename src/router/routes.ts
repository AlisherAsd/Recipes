import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../pages/HomePage.vue'),
    },
    {
        path: '/recipes',
        component: () => import('../pages/RecipeListPage.vue'),
    },
    {
        path: '/recipes/:id',
        component: () => import('../pages/RecipeDetailPage.vue'),
    },
    {
        path: '/ingridients',
        component: () => import('../pages/IngridientsListPage.vue'),
    },
    {
        path: '/ingridients/:id',
        component: () => import('../pages/IngridientsDetailPage.vue'),
    },
    {
        path: '/auth',
        component: () => import('../pages/AuthPage.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/NotFound404.vue'),
    },
]

export default routes