<script setup lang="ts">
import { useBasketStore } from "../../stores/basket-store";
import { useUserStore } from "../../stores/user-store";
import FiltersRecipeHeader from "./FiltersRecipe.vue";

const basketStore = useBasketStore();
const userStore = useUserStore();

</script>

<template>
  <div class="bg-black px-7 text-white h-12 hidden md:flex items-center">
    <div class="ml-auto">
      <ul class="flex gap-3">
        <li>Оставить отзыв</li>
        <li>Поддержка</li>
      </ul>
    </div>
  </div>
  <div class="flex pl-4 pr-7 items-center h-18 justify-between text-black">
    <div>
      <ul class="flex gap-4 items-center">
        <router-link to="/">
          <li class="bg-amber-500 h-18 w-18">
            <img src="../../assets/img/logo.jpg" alt="" />
          </li>
        </router-link>
        <router-link to="/recipes">
          <li>Рецепты</li>
        </router-link>
      </ul>
    </div>
    <div>
      <ul class="flex gap-4 items-center">
        <div class="hidden md:flex gap-3 items-center">
          <el-icon size="24"><Search /></el-icon>
          <el-input placeholder="Поиск по сайту" />
        </div>
        <li
          @click="basketStore.isDrawerOpen = true"
          class="flex gap-3 items-center"
        >
          <el-icon size="24"><List /></el-icon>
          <p class="cursor-pointer hidden md:flex">Моя корзина</p>
        </li>
        <router-link
          v-if="userStore.authUserData.username !== ''"
          to="/profile"
        >
          <li class="flex gap-3 items-center">
            <el-icon size="24"><Avatar /></el-icon>
            <p class="hidden md:flex">{{ userStore.authUserData.username }}</p>
          </li>
        </router-link>
        <router-link v-else to="/auth">
          <li class="flex gap-3 items-center">
            <el-icon size="24"><Avatar /></el-icon>
            Войти
          </li>
        </router-link>
      </ul>
    </div>
  </div>
  <FiltersRecipeHeader class="hidden md:flex"/>
</template>
