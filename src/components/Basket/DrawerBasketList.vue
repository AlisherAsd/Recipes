<script setup lang="ts">
import { useBasketStore } from "../../stores/basket-store";
import ProductList from "./ProductList.vue";

const basketStore = useBasketStore();

const closeDrawer = () => {
  basketStore.isDrawerOpen = false;
};
</script>

<template>
  <!-- Drawer для корзины -->
  <el-drawer
    v-model="basketStore.isDrawerOpen"
    :with-header="false"
    size="auto"
  >
    <div class="flex justify-end items-center">
      <el-button type="danger" plain circle @click="closeDrawer">
        <span class="text-xl">×</span>
      </el-button>
    </div>
    <!-- Список продуктов -->
    <div class="flex flex-col items-center">
      <ProductList />
      <!-- Ссылка на страницу корзины -->
      <router-link
        to="/basket"
        class="px-20 flex flex-col justify-center sticky bottom-0 z-10"
      >
        <!-- Кнопка для перехода на страницу корзины -->
        <el-button
          size="large"
          @click="basketStore.isDrawerOpen = false"
          type="primary"
          >Перейти к корзине</el-button
        >
      </router-link>
    </div>
  </el-drawer>
</template>
