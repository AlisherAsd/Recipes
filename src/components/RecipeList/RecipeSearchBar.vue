<script setup lang="ts">
import { ref } from "vue";
import { useRecipeStore } from "../../stores/recipe-store";
import { debounce } from "lodash";
import FiltersRecipe from "../Header/FiltersRecipe.vue";

const recipeStore = useRecipeStore();

// Реактивная переменная для поиска
const searchQuery = ref(recipeStore.params.query);

// Обработчик изменения searchQuery
const handleSearchQueryChange = debounce(async () => {
  // Обновляем параметры и сбрасываем offset
  recipeStore.updateParams({
    query: searchQuery.value,
    offset: 0,
  });

  // Загружаем новые данные
  await recipeStore.fetchRecipe();
}, 300);
</script>

<template>
  <div class="px-10 py-20 gap-10 flex flex-col items-center">
    <h1 class="text-3xl font-bold">Рецепты</h1>
    <div class="flex flex-col items-center">
      <p>Ищите рецепты, выбирая категорию блюда, его диету, или кухню.</p>
      <p>Просто начните писать его название и сайт подберет соответствующий.</p>
    </div>
    <el-input
      style="width: 400px"
      size="large"
      placeholder="Введите название блюда"
      v-model="searchQuery"
      @input="handleSearchQueryChange"
    />
    <div class="w-[100vw] md:hidden">
      <FiltersRecipe />
    </div>
  </div>
</template>
