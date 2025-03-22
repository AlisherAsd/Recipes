<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRecipeStore } from "../stores/recipe-store";
import { useRouter } from "vue-router";

const recipeStore = useRecipeStore();
const router = useRouter();

function getRecipeId() {
  const url = window.location.href;
  const id = Number(url.split("/")[4]);
  recipeStore.fetchRecipeById(id);
  recipeStore.fetchRecipeSimilar(id);
}

function handleSimilarRecipeClick(id: number) {
  router.push(`/recipes/${id}`); // Обновляем URL
  recipeStore.fetchRecipeById(id);
  recipeStore.fetchRecipeSimilar(id);
}

onMounted(() => {
  getRecipeId();
});
</script>

<template>
  <div v-loading="recipeStore.isLoading" class="bg-gray-600 h-auto">
    <div class="p-10 text-white flex gap-10 w-[90vw] items-center">
      <div class="flex flex-col gap-10">
        <div v-if="recipeStore.error">{{ recipeStore.error }}</div>
        <div v-if="recipeStore.isLoading">Loading...</div>
        <h1 class="font-bold text-2xl">
          Название: {{ recipeStore.selectedRecipe?.title }}
        </h1>
        <img
          class="h-[40vh] w-[30vw]"
          :src="recipeStore.selectedRecipe?.image"
          alt=""
        />
        <div>
          <h2 class="my-4 font-bold text-xl">Диеты:</h2>
          <ul class="flex gap-5" v-if="recipeStore.selectedRecipe?.diets">
            <li v-for="diet in recipeStore.selectedRecipe?.diets" :key="diet">
              {{ diet }}
            </li>
          </ul>
        </div>
        <div>
          <h2 class="my-4 font-bold text-xl">Краткая интрукция</h2>
          <p>{{ recipeStore.selectedRecipe?.instructions }}</p>
        </div>
        <div>
          <h2 class="my-4 font-bold text-xl">Необходимые ингридиенты</h2>
          <ul class="flex flex-wrap gap-4" v-if="recipeStore.selectedRecipe?.extendedIngredients">
            <li class="w-20" v-for="ingridient in recipeStore.selectedRecipe?.extendedIngredients" :key="ingridient.id" >
              <img class="bg-gray-700 h-20" :src="'https://spoonacular.com/cdn/ingredients_100x100/' +  ingridient.image" alt="">
              <p>{{ ingridient.name }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="my-4 font-bold text-xl">Полная интрукция</h2>
          <ul>
            <li
              v-for="item in recipeStore.selectedRecipe?.analyzedInstructions"
              :key="item.name"
            >
              {{ item.name }}
              <ul class="flex flex-col gap-3">
                <li class="bg-gray-800 p-5" v-for="subItem in item.steps" :key="subItem.number">
                  <div class="flex gap-4">
                    <p class="w-30">Шаг № {{ subItem.number }} </p>
                    <div class="w-200">
                      <p> {{ subItem.step }} </p>
                      <div class="flex gap-4 mt-5 items-center">
                        <p>Нужные ингридиенты: </p>
                        <ul class="flex gap-10 flex-wrap">
                          <li v-for="ingridient in subItem.ingredients" :key="ingridient.id">
                            <div v-if="ingridient.image">
                              <img class="bg-gray-700 w-20 h-20" :src="'https://spoonacular.com/cdn/ingredients_100x100/' + ingridient.image" alt="">
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <h1 class="my-4 font-bold text-2xl">Похожие рецепты</h1>
          <ul>
            <li
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
  </div>
</template>
