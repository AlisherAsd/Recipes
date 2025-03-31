import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useUserStore } from "../stores/user-store";

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Глобальный навигационный хук
router.beforeEach((to, from, next) => {
    const userStore = useUserStore() // Инициализация хранилища
    const isAuthenticated = userStore.authUserData.hash !== "" // Проверка авторизации

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/auth') // Перенаправляем на страницу авторизации
    } else {
        next() // Продолжаем переход
    }
})

export default router;