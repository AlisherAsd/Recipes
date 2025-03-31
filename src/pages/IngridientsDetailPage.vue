<script setup lang="ts">
import { onMounted } from "vue";
import { useIngridientStore } from "../stores/ingridient-store";
import { useRoute } from "vue-router";

const ingridientStore = useIngridientStore();

const route = useRoute();

onMounted(() => {
  const id = Number(route.params.id);
  ingridientStore.fetchIngridientById(id);
});
</script>

<template>
  <div v-loading="ingridientStore.isLoading" class="flex flex-col items-center p-5 pb-10 gap-6">
    <p class="text-gray-400 font-bold">Ингридиент</p>
    <p class="text-2xl uppercase font-bold">{{ ingridientStore.selectedIngridient?.name }}</p>
    <p v-if="ingridientStore.selectedIngridient?.categoryPath">
      <ul class="flex gap-3 font-bold text-gray-400">
        <li>Категории </li>
        <li v-for="cat in ingridientStore.selectedIngridient?.categoryPath" :key="cat">
          {{ cat }}
        </li>
      </ul>
    </p>
    <img
    class="w-100"
      :src="
        'https://spoonacular.com/cdn/ingredients_100x100/' +
        ingridientStore.selectedIngridient?.image
      "
      alt=""
    />
  </div>
</template>

