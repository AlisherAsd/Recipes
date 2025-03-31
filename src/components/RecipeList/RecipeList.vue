<script setup lang="ts">
import { computed } from "vue";
import { useRecipeStore } from "../../stores/recipe-store";
import { storeToRefs } from "pinia";

const recipeStore = useRecipeStore();
const { isLoading, error, recipeList } = storeToRefs(recipeStore);

// Вычисляемое свойство для отключения бесконечной прокрутки когда рецепты заканчиваются
const noMore = computed(
  () =>
    recipeList.value.results.length >= recipeList.value.totalResults
);

// Обработчик прокрутки вниз
const handleOffsetChange = async () => {
  if (recipeStore.params.offset === undefined) return;
  // Увеличиваем offset на количество загружаемых элементов
  recipeStore.updateParams({
    offset: recipeStore.params.offset + 6,
  });

  // Загружаем новые данные
  await recipeStore.fetchRecipe();
};

// Обработчик получения описания рецепта
const handleGetDescription = async (id: number) => {
  recipeStore.fetchRecipeSummary(id);
};
</script>

<template>
  <div class="flex flex-col items-center w-[100%] md:w-[85%]">
    <p class="m-2">
      Найдено {{ recipeList.totalResults }} рецептов
    </p>
    <div v-if="error" class="mt-10 md:text-2xl text-xl">
      {{ error }}
    </div>
    <div
      v-else
      v-infinite-scroll="handleOffsetChange"
      :infinite-scroll-disabled="isLoading || error"
      v-loading="isLoading"
      class="w-[100%]"
    >
      <!-- Рецепты -->
      <div
        v-for="item in recipeList.results"
        :key="item.id"
        class="m-3 border rounded-2xl border-gray-300 h-40 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
      >
        <!-- Рецепт -->
        <div class="flex md:gap-5 gap-2 h-[100%] py-4 px-2  md:px-0">
          <router-link :to="'recipes/' + String(item.id)" class="flex-shrink-0 flex items-center md:min-w-55">
            <img :src="item.image" alt="item" class="md:h-40 md:w-55 h-30 w-40 rounded-2xl" />
          </router-link>
          <div class="w-[100%] flex flex-col justify-center items-center">
            <p class="font-bold text-sm text-gray-400">Рецепт</p>
            <p class="my-3 font-extrabold uppercase h-40">{{ item.title }}</p>
            <el-button
              class="md:w-auto w-40"
              :disabled="isLoading"
              plain
              @click="handleGetDescription(item.id)"
            >
              Информация
            </el-button>
          </div>
        </div>
      </div>
      <div>
        <p v-if="true" class="p-10 text-xl font-bold text-white">
          {{ error }}
        </p>
        <p v-else-if="noMore" class="p-10 text-xl font-bold text-white">
          No more
        </p>
      </div>
    </div>
  </div>
</template>
