<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RecipeService } from "../api";
import type { IRecipeInformationById, IRescipe } from "../types/RecipeType";

const recipesRandom = ref<IRescipe[] | null>(null);
const loading = ref(false);
const error = ref<null | string>(null);

onMounted(async () => {
  error.value = null;
  loading.value = true;
  try {
    const data: { data: { recipes: IRecipeInformationById[] } } =
      await RecipeService.fetchGetRecipeRandom({ number: 3 });
    recipesRandom.value = data.data.recipes;
  } catch (e) {
    error.value = "Error fetching recipes. Please try again later.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-loading="loading" class="flex flex-col items-center">
    <div v-if="error">{{ error }}</div>
    <img class="w-full" src="../assets/img/home.jpg" alt="" />
    <div>
      <img src="../assets/img/logo.jpg" alt="" />
      <h1 class="text-3xl font-bold up text-center text-gray-300">Самые лучшие рецепты</h1>
    </div>

    <div class="my-30" v-if="recipesRandom">
      <ul class="flex justify-center">
        <li v-for="recipe in recipesRandom" :key="recipe.id">
          <router-link :to="'/recipes/' + recipe.id">
            <img :src="recipe.image" alt="asd" />
          </router-link>
        </li>
      </ul>
    </div>
    <router-link to="/recipes">
      <button class="mb-30 text-2xl font-bold text-black p-5 rounded-4xl hover:bg-black hover:text-white transition">Перейти к списку рецептов</button>
    </router-link>
  </div>
</template>
