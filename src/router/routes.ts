import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/HomePage.vue"),
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: () => import("../pages/RecipeListPage.vue"),
  },
  {
    path: "/recipes/:id",
    name: "RecipeDetail",
    component: () => import("../pages/RecipeDetailPage.vue"),
  },
  {
    path: "/basket",
    name: "Basket",
    component: () => import("../pages/BasketPage.vue"),
    meta: {
      requiresAuth: true, // Мета-поле для указания, что маршрут требует авторизации
    },
  },
  {
    path: "/ingridients/:id",
    name: "IngridientsDetail",
    component: () => import("../pages/IngridientsDetailPage.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../pages/ProfilePage.vue"),
    meta: {
      requiresAuth: true, // Мета-поле для указания, что маршрут требует авторизации
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../pages/AuthPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../pages/NotFound404.vue"),
  },
];

export default routes;
