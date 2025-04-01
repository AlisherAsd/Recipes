<script setup lang="ts">
import { onMounted } from "vue";
import { useIngridientStore } from "../stores/ingridient-store";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const ingridientStore = useIngridientStore();
const { isLoading, selectedIngridient } = storeToRefs(ingridientStore);
const route = useRoute();

// Загрузка данных ингридиента
onMounted(() => {
  const id = Number(route.params.id);
  ingridientStore.fetchIngridientById(id);
});
</script>

<template>
  <div v-loading="isLoading" class="flex flex-col items-center justify-center p-5 pb-10 gap-6 min-h-[100vh]">
    <p class="text-gray-400 font-bold">Ингридиент</p>
    <!-- Название ингридиента -->
    <p class="text-2xl uppercase font-bold">{{ selectedIngridient?.name }}</p>
    <!-- Категории -->
    <p v-if="selectedIngridient?.categoryPath">
      <ul class="flex gap-3 font-bold text-gray-400">
        <li>Категории </li>
        <li v-for="cat in selectedIngridient?.categoryPath" :key="cat">
          {{ cat }}
        </li>
      </ul>
    </p>
    <!-- Изображение ингридиента -->
    <img
    class="w-100"
      :src="
        'https://spoonacular.com/cdn/ingredients_100x100/' +
        selectedIngridient?.image
      "
      alt="Изображение ингридиента"
    />
  </div>
</template>

