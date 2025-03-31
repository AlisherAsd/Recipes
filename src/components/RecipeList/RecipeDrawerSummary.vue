<script setup lang="ts">
import { useRecipeStore } from '../../stores/recipe-store';

const recipeStore = useRecipeStore();

const closeDrawer = () => {
  recipeStore.summaryRecipe.isOpenDrawer = false;
};
</script>

<template>
  <el-drawer 
    v-model="recipeStore.summaryRecipe.isOpenDrawer" 
    size="70%" 
    :with-header="false"
  >
    <div class="p-4">
      <!-- Кнопка закрытия -->
      <div class="flex justify-end items-center mb-4">
        <el-button 
          type="danger" 
          plain 
          circle 
          @click="closeDrawer"
        >
          <span class="text-xl">×</span>
        </el-button>
      </div>
      
      <!-- Контент -->
      <h2 class="text-xl font-bold">
        {{ recipeStore.summaryRecipe.title }}
      </h2>
      <p class="my-10">{{ recipeStore.summaryRecipe.description }}</p>
    </div>
  </el-drawer>
</template>