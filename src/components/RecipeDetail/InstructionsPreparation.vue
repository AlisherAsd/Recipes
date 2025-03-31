<script setup lang="ts">
import type { IRecipeInformationById } from "../../types/RecipeType";

const props = defineProps<{
  selectedRecipe: IRecipeInformationById | null;
}>();
</script>

<template>
  <div class="p-10">
    <h2 class="my-4 font-bold text-xl">Инструкция приготовления</h2>
    <ul v-if="props.selectedRecipe">
      <li
        v-for="item in props.selectedRecipe.analyzedInstructions"
        :key="item.name"
      >
        {{ item.name }}
        <ul class="flex flex-col gap-3 w-[100%]">
          <li v-for="subItem in item.steps" :key="subItem.number">
            <div class="flex justify-between">
              <div class="w-[50vw] flex gap-4">
                <p class="font-bold">{{ subItem.number }}</p>
                <p>{{ subItem.step }}</p>
              </div>
              <div
              class="flex items-center"
                v-if="
                  subItem.ingredients &&
                  subItem.ingredients.length > 0 &&
                  subItem.ingredients[0].image
                "
              >
                <img
                  class="h-[13vw] w-[15vw]"
                  :src="
                    'https://spoonacular.com/cdn/ingredients_100x100/' +
                    subItem.ingredients[0].image
                  "
                  alt=""
                />
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
