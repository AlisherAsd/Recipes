<script setup lang="ts">
import type { IRecipeInformationById } from "../../types/RecipeType";

// Получение рецепта из родительского компонента
const props = defineProps<{
  selectedRecipe: IRecipeInformationById | null;
}>();
</script>

<template>
  <div class="p-10" v-if="props.selectedRecipe?.extendedIngredients.length > 0">
    <h2 class="my-4 font-bold text-xl">Необходимые ингридиенты</h2>
    <ul
      class="flex flex-wrap gap-4"
      v-if="props.selectedRecipe?.extendedIngredients"
    >
      <!-- Список ингридиентов -->
      <li
        class="w-12"
        v-for="ingridient in props.selectedRecipe?.extendedIngredients"
        :key="ingridient.id"
      >
        <!-- Ссылка на страницу ингридиента -->
        <router-link :to="{ 'name': 'IngridientsDetail', params: { id: ingridient.id } }">
          <!-- Изображение ингридиента -->
          <img
            v-if="ingridient.image"
            class="bg-gray-700 h-12 rounded-2xl"
            :src="
              'https://spoonacular.com/cdn/ingredients_100x100/' +
              ingridient.image
            "
            alt="Ингридиент"
          />
        </router-link>
        <!-- Название ингридиента -->
        <p class="text-xs my-1">{{ ingridient.name }}</p>
      </li>
    </ul>
  </div>
</template>
