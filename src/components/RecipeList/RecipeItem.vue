<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRecipeStore } from '../../stores/recipe-store';
import type { IRescipe } from '../../types/RecipeType';


const recipeStore = useRecipeStore();
const { isLoading } = storeToRefs(recipeStore);

const props = defineProps<{ 
  item: IRescipe;
}>();

// Обработчик получения описания рецепта
const handleGetDescription = async (id: number) => {
  recipeStore.fetchRecipeSummary(id);
};

</script>

<template>
    <div class="flex md:gap-5 gap-2 h-[100%] px-2  md:px-0">
          <router-link :to="{ 'name': 'RecipeDetail', params: { id: props.item.id } }" class="flex-shrink-0 flex items-center md:min-w-55">
            <img :src="props.item.image" alt="props.item" class="md:h-40 md:w-55 h-30 w-40 rounded-2xl" />
          </router-link>
          <div class="w-[100%] flex flex-col justify-center py-4 items-center">
            <p class="font-bold text-sm text-gray-400">Рецепт</p>
            <!-- Название рецепта  -->
            <p class="my-3 font-extrabold uppercase line-clamp-4">{{ props.item.title }}</p>
            <!-- Кнопка получения информации -->
            <el-button
              class="md:w-auto w-40"
              :disabled="isLoading"
              plain
              @click="handleGetDescription(props.item.id)"
            >
              Информация
            </el-button>
          </div>
        </div>
</template>
