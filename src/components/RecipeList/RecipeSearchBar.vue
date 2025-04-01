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
  // Обновляем параметры и сбрасываем offset, сохраняя текущие значения фильтров
  recipeStore.updateParams({
    query: searchQuery.value,
    offset: 0,
    diet: recipeStore.params.diet,
    cuisine: recipeStore.params.cuisine,
    type: recipeStore.params.type
  });

  // Загружаем новые данные
  await recipeStore.resetAndFetchRecipe();
}, 300);
</script>

<template>
  <div class="px-4 py-20 gap-10 flex flex-col items-center">
    <!-- Заголовок -->  
    <h1 class="text-3xl font-bold">Рецепты</h1>
    <!-- Описание -->
    <div class="flex flex-col items-center">
      <p>Ищите рецепты, выбирая категорию блюда, его диету, или кухню.</p>
      <p>Просто начните писать его название и сайт подберет соответствующий.</p>
    </div>
    <!-- Поле для ввода названия блюда -->
    <el-input
      style="width: 300px"
      size="large"
      placeholder="Введите название блюда"
      v-model="searchQuery"
      @input="handleSearchQueryChange"
    />
    <!-- Фильтры -->
    <div class="w-[100vw] md:hidden">
      <FiltersRecipe />
    </div>
  </div>
</template>
