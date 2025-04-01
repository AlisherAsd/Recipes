<script setup lang="ts">
import AddProductOrList from "../components/Basket/AddPruductOrList.vue"
import ProductList from "../components/Basket/ProductList.vue"
import { useBasketStore } from "../stores/basket-store";

const basketStore = useBasketStore();
</script>


<template>
  <div class="flex flex-col items-center">
    <!-- Добавление продукта или списка -->
    <AddProductOrList />
    <!-- Список продуктов -->
    <ProductList />
  </div>
</template>
