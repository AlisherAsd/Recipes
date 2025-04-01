<script setup lang="ts">
import type { IRecipeInformationById } from "../../types/RecipeType";

// Получение рецепта из родительского компонента
const props = defineProps<{
  selectedRecipe: IRecipeInformationById | null;
}>();
</script>

<template>
    <div class="p-10" v-if="props.selectedRecipe?.analyzedInstructions.length > 0">
    <!-- Заголовок -->
    <h2 class="my-4 font-bold text-xl">Инструкция приготовления</h2>
    <!-- Список инструкций -->
    <ul v-if="props.selectedRecipe">
      <!-- Инструкция приготовления -->
      <li
        v-for="item in props.selectedRecipe.analyzedInstructions"
        :key="item.name"
      >
        <ul class="flex flex-col gap-3 w-[100%]">
          <li v-for="subItem in item.steps" :key="subItem.number">
            <!-- Номер инструкции -->
            <div class="flex justify-between">
              <div class="w-[50vw] flex gap-4">
                <p class="font-bold">{{ subItem.number }}</p>
                <p>{{ subItem.step }}</p>
              </div>
              <!-- Ингредиенты -->
              <div
              class="flex items-center"
                v-if="
                  subItem.ingredients &&
                  subItem.ingredients.length > 0 &&
                  subItem.ingredients[0].image
                "
              >
                <!-- Изображение ингредиента -->
                <img
                  class="h-[13vw] w-[15vw]"
                  :src="
                    'https://spoonacular.com/cdn/ingredients_100x100/' +
                    subItem.ingredients[0].image
                  "
                  alt="Ингредиент"
                />
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
