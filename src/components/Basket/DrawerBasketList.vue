<script setup lang="ts">
import { useBasketStore } from "../../stores/basket-store";
import ProductList from "./ProductList.vue";

const basketStore = useBasketStore();

</script>

<template>
  <el-drawer
    v-model="basketStore.isDrawerOpen"
    :with-header="false"
    size="auto"
  >
    <div class="flex flex-col items-center">
      <ProductList v-loading="basketStore.isLoading"/>
      <router-link to="/basket" class="px-20 flex flex-col justify-center sticky bottom-0 z-10">
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
