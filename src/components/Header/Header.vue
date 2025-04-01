<script setup lang="ts">
import { useBasketStore } from "../../stores/basket-store";
import { useUserStore } from "../../stores/user-store";
import FiltersRecipeHeader from "./FiltersRecipe.vue";

const basketStore = useBasketStore();
const userStore = useUserStore();
</script>

<template>
  <!-- Шапка сайта -->
  <div class="flex pl-4 pr-7 items-center h-18 justify-between text-black">
    <div>
      <ul class="flex gap-4 items-center">
        <!-- Логотип -->
        <router-link :to="{ 'name': 'Home' }">
          <li class="bg-amber-500 h-18 w-18">
            <img src="../../assets/img/logo.jpg" alt="" />
          </li>
        </router-link>
      </ul>
    </div>
    <div>
      <ul class="flex gap-4 items-center">
        <!-- Ссылка на страницу рецептов -->
        <router-link :to="{ 'name': 'Recipes' }">
          <li class="flex gap-3 items-center">
            <el-icon size="24"><Dish /></el-icon>
            <p class="hidden md:flex">Рецепты</p>
          </li>
        </router-link>
        <!-- Кнопка для открытия корзины -->
        <li
          v-if="userStore.authUserData.username !== ''"
          @click="basketStore.isDrawerOpen = true"
          class="flex gap-3 items-center"
        >
          <el-icon size="24"><List /></el-icon>
          <p class="cursor-pointer hidden md:flex">Моя корзина</p>
        </li>
        <!-- Ссылка на страницу профиля -->
        <router-link
          v-if="userStore.authUserData.username !== ''"
          to="/profile"
        >
          <li class="flex gap-3 items-center">
            <el-icon size="24"><Avatar /></el-icon>
            <p class="hidden md:flex">{{ userStore.authUserData.username }}</p>
          </li>
        </router-link>
        <!-- Ссылка на страницу авторизации -->
        <router-link v-else :to="{ 'name': 'Auth' }">
          <li class="flex gap-3 items-center">
            <el-icon size="24"><Avatar /></el-icon>
            Войти
          </li>
        </router-link>
      </ul>
    </div>
  </div>
  <!-- Фильтры для рецептов -->
  <FiltersRecipeHeader class="hidden md:flex" />
</template>
