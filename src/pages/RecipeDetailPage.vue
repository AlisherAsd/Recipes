<script setup lang="ts">
import { onMounted } from "vue";
import { useRecipeStore } from "../stores/recipe-store";
import { useRoute, useRouter } from "vue-router";

import IngrdientList from "../components/RecipeDetail/IngrdientList.vue";
import InstructionsPreparation from "../components/RecipeDetail/InstructionsPreparation.vue";

const recipeStore = useRecipeStore();
const router = useRouter();
const route = useRoute();

const getRecipeByIdAndRecipeSimilar = (id: number) => {
  recipeStore.fetchRecipeById(id);
  recipeStore.fetchRecipeSimilar(id);
};

function handleSimilarRecipeClick(id: number) {
  router.push(`/recipes/${id}`); // Обновляем URL
  getRecipeByIdAndRecipeSimilar(id);
}

onMounted(() => {
  const id = Number(route.params.id);
  getRecipeByIdAndRecipeSimilar(id);
});
</script>

<template>
  <div v-loading="recipeStore.isLoading">
    <div class="flex flex-col gap-10 items-center mt-10 p-3">
      <div v-if="recipeStore.error">{{ recipeStore.error }}</div>
      <p class="text-gray-400 font-bold">Рецепт</p>
      <h1 class="text-2xl font-extrabold uppercase">
        {{ recipeStore.selectedRecipe?.title }}
      </h1>
      <div class="flex flex-col items-center gap-3">
        <ul
          class="flex gap-2 text-gray-400 font-bold p-2"
          v-if="recipeStore.selectedRecipe?.diets"
        >
          <li>Диеты</li>
          <li v-for="diet in recipeStore.selectedRecipe?.diets" :key="diet">
            {{ diet }}
          </li>
        </ul>
        {{ recipeStore.selectedRecipe?.aggregateLikes }}
        <p
          v-if="recipeStore.selectedRecipe?.cookingMinutes"
          class="text-gray-400 font-bold items-center flex gap-1"
        >
          <el-icon><AlarmClock /></el-icon>
          {{ recipeStore.selectedRecipe?.cookingMinutes }} минут
        </p>
        <p
          v-if="recipeStore.selectedRecipe?.healthScore"
          class="text-gray-400 font-bold items-center flex gap-1"
        >
          <el-icon><Select /></el-icon>
          {{ recipeStore.selectedRecipe?.aggregateLikes }} лайков
        </p>
      </div>
      <img
        v-if="recipeStore.selectedRecipe?.image"
        class="w-[100%]"
        :src="recipeStore.selectedRecipe?.image"
        alt=""
      />

      <div class="p-10">
        <h2 class="my-4 font-bold text-xl">Краткая интрукция</h2>
        <p>{{ recipeStore.selectedRecipe?.instructions }}</p>
      </div>

      <IngrdientList :selected-recipe="recipeStore.selectedRecipe" />

      <InstructionsPreparation :selected-recipe="recipeStore.selectedRecipe" />

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
