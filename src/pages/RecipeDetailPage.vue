<script setup lang="ts">
import { onMounted } from "vue";
import { useRecipeStore } from "../stores/recipe-store";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import IngrdientList from "../components/RecipeDetail/IngrdientList.vue";
import InstructionsPreparation from "../components/RecipeDetail/InstructionsPreparation.vue";

const recipeStore = useRecipeStore();
const { isLoading, selectedRecipe, error } = storeToRefs(recipeStore);
const router = useRouter();
const route = useRoute();

// Получение рецепта по id и похожих рецептов
const getRecipeByIdAndRecipeSimilar = (id: number) => {
  recipeStore.fetchRecipeById(id);
  recipeStore.fetchRecipeSimilar(id);
};

// Обработка клика по похожему рецепту
function handleSimilarRecipeClick(id: number) {
  router.push(`/recipes/${id}`); // Обновляем URL
  getRecipeByIdAndRecipeSimilar(id);
}

// Загрузка рецепта и похожих рецептов при монтировании компонента
onMounted(() => {
  const id = Number(route.params.id);
  getRecipeByIdAndRecipeSimilar(id);
});
</script>

<template>
  <div v-loading="isLoading">
    <div class="flex flex-col gap-10 items-center mt-10 p-3">
      <!-- Ошибка -->
      <div v-if="error">{{ error }}</div>
      <!-- Название рецепта -->
      <p class="text-gray-400 font-bold">Рецепт</p>
      <h1 class="text-2xl font-extrabold uppercase">
        {{ selectedRecipe?.title }}
      </h1>
      <div class="flex flex-col items-center gap-3">
        <!-- Диеты -->
        <ul
          class="flex gap-2 text-gray-400 font-bold p-2"
          v-if="selectedRecipe?.diets"
        >
          <li>Диеты</li>
          <li v-for="diet in selectedRecipe?.diets" :key="diet">
            {{ diet }}
          </li>
        </ul>
        <!-- Время приготовления -->
        <p
          v-if="selectedRecipe?.cookingMinutes"
          class="text-gray-400 font-bold items-center flex gap-1"
        >
          <el-icon><AlarmClock /></el-icon>
          {{ selectedRecipe?.cookingMinutes }} минут
        </p>
        <!-- Лайки -->
        <p
          v-if="selectedRecipe?.healthScore"
          class="text-gray-400 font-bold items-center flex gap-1"
        >
          <el-icon><Select /></el-icon>
          {{ selectedRecipe?.aggregateLikes }} лайков
        </p>
      </div>
      <!-- Изображение рецепта -->
      <img
        v-if="selectedRecipe?.image"
        class="w-[100%]"
        :src="selectedRecipe?.image"
        alt=""
      />
      <!-- Краткая интрукция -->
      <div v-if="selectedRecipe?.instructions" class="p-10">
        <h2 class="my-4 font-bold text-xl">Краткая интрукция</h2>
        <p>{{ selectedRecipe?.instructions }}</p>
      </div>
      <!-- Список ингридиентов -->
      <IngrdientList :selected-recipe="selectedRecipe" />
      <!-- Инструкция приготовления -->
      <InstructionsPreparation :selected-recipe="selectedRecipe" />
      <!-- Похожие рецепты -->  
      <div class="mb-10 text-center">
        <h1 class="mb-4 font-bold text-2xl">Похожие рецепты</h1>
        <ul class="flex flex-col gap-5">
          <li
            class="font-bold text-gray-400"
            v-for="recipe in recipeStore.similarSelectedRecipe"
            :key="recipe.id"
          >
            <router-link
              :to="`/recipes/${recipe.id}`"
              @click="handleSimilarRecipeClick(recipe.id)"
            >
              {{ recipe.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
