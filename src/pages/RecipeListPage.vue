<script setup lang="ts">
import { onMounted } from "vue";

import { useRecipeStore } from "../stores/recipe-store";
import RecipeSearchBar from "../components/RecipeList/RecipeSearchBar.vue";
import RecipeList from "../components/RecipeList/RecipeList.vue";
import RecipeDrawerSummary from "@/components/RecipeList/RecipeDrawerSummary.vue";

const recipeStore = useRecipeStore();

// Загрузка данных при монтировании компонента
onMounted(async () => {
  await recipeStore.fetchRecipe();
});
</script>

<template>
  <!-- Краткая информация -->
  <RecipeDrawerSummary />
  <!-- Поиск -->
  <RecipeSearchBar />
  <!-- Список рецептов -->
  <div class="h-143 flex justify-center" style="overflow: auto">
    <RecipeList />
  </div>
</template>
