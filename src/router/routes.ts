import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../pages/HomePage.vue"),
  },
  {
    path: "/recipes",
    component: () => import("../pages/RecipeListPage.vue"),
  },
  {
    path: "/recipes/:id",
    component: () => import("../pages/RecipeDetailPage.vue"),
  },
  {
    path: "/basket",
    component: () => import("../pages/BasketPage.vue"),
    meta: {
      requiresAuth: true, // Мета-поле для указания, что маршрут требует авторизации
    },
  },
  {
    path: "/ingridients/:id",
    component: () => import("../pages/IngridientsDetailPage.vue"),
  },
  {
    path: "/profile",
    component: () => import("../pages/ProfilePage.vue"),
    meta: {
      requiresAuth: true, // Мета-поле для указания, что маршрут требует авторизации
    },
  },
  {
    path: "/auth",
    component: () => import("../pages/AuthPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../pages/NotFound404.vue"),
  },
];

export default routes;
