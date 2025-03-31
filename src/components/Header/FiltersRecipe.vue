<script setup lang="ts">
import { ref } from "vue";
import { cuisinesMock } from "../../assets/mockdata/cuisines";
import { dietsMock } from "../../assets/mockdata/diets";
import { typesMock } from "../../assets/mockdata/type";
import { useRecipeStore } from "../../stores/recipe-store";
import { useRoute, useRouter } from "vue-router";
import GoBackButton from "../GoBackButton.vue";

const recipeStore = useRecipeStore();

const filtersDiet = ref(recipeStore.params.diet);
const filtersCuisine = ref(recipeStore.params.cuisine);
const filtersType = ref(recipeStore.params.type);
const route = useRoute();
const router = useRouter();


// Обработчик фильтров
const handleFiltershRecipe = async () => {
  if (route.path !== "/recipes") {
    router.push("/recipes");
  }
  // Обновляем параметры и сбрасываем offset
  recipeStore.updateParams({
    diet: filtersDiet.value,
    offset: 0,
    cuisine: filtersCuisine.value,
    type: filtersType.value,
  });

  // Загружаем новые данные
  await recipeStore.resetAndFetchRecipe();
};

// Обработчик фильтров
const handleResetFilters = async () => {
  if (route.path !== "/recipes") {
    router.push("/recipes");
  }
  // Обновляем параметры и сбрасываем offset
  recipeStore.resetParams();
  filtersDiet.value = "";
  filtersCuisine.value = "";
  filtersType.value = "";
  // Загружаем новые данные
  await recipeStore.resetAndFetchRecipe();
};
</script>

<template>
  <div
    class="flex flex-col border-t-2 border-b-2 border-gray-300 h-24 justify-items-center"
  >
    <p class="my-3 flex justify-center">Подбор рецептов</p>

    <div
      class="text-white flex md:gap-4 gap-1 justify-center items-center"
    >
      <GoBackButton class="hidden md:flex"/>
      <div class="w-30">
        <el-select v-model="filtersDiet" placeholder="Диеты">
          <el-option
            v-for="item in dietsMock"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="w-30">
        <el-select v-model="filtersCuisine" placeholder="Кухни">
          <el-option
            v-for="item in cuisinesMock"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="w-30">
        <el-select v-model="filtersType" placeholder="Блюда">
          <el-option
            v-for="item in typesMock"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <el-button class="z-10 md:w-30 w-20" type="primary" @click="handleFiltershRecipe"
        >Применить</el-button
      >
      <el-button class="!ml-0 z-10 md:w-30 w-20" @click="handleResetFilters"
        >Сбросить</el-button
      >
    </div>
  </div>
</template>
