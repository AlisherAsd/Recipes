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
    const data: { data: {data: IRescipe[]} } = await RecipeService.fetchGetRecipeRandom({ number: 5 });
    recipesRandom.value = data.data.recipes;
  } catch (e) {
    console.error("Error fetching recipes:", e);
    error.value = "Error fetching recipes. Please try again later.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-loading="loading" class="container h-[90vh] text-white">
    <div v-if="error">{{ error }}</div>
    <div class="justify-items-center" v-if="recipesRandom">
      <h2 v-once class="pt-10 text-4xl text-white font-bold">Random Recipes</h2>
      <ul class="flex gap-2 mt-10">
        <li class="w-[18vw] h-[18vw]" v-for="recipe in recipesRandom" :key="recipe.id">
          <router-link :to="'/recipes/' + recipe.id">
            <img class="" :src="recipe.image" alt="">
            {{recipe.title}}


        </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>



<style scoped>

.container {
  background-image: url('../assets/img/bg-home.jpg');
  background-size: cover;
  background-position: center;
}

</style>