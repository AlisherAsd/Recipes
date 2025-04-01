<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRecipeStore } from '../../stores/recipe-store';

const recipeStore = useRecipeStore();
const { summaryRecipe } = storeToRefs(recipeStore);

// Обработка закрытия drawer
const closeDrawer = () => {
  summaryRecipe.value.isOpenDrawer = false;
};
</script>

<template>
  <!-- Drawer для описания рецепта -->  
  <el-drawer 
    v-model="summaryRecipe.isOpenDrawer" 
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
        {{ summaryRecipe.title }}
      </h2>
      <p class="my-10">{{ summaryRecipe.description }}</p>
    </div>
  </el-drawer>
</template>