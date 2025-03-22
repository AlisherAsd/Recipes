<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRecipeStore } from "../stores/recipe-store";
import { fetchGetRecipeSummary } from "../api/rest/recipe";
import type { IRecipeResponse } from "../types/RecipeType";
import { dietsMock } from "../assets/mockdata/diets";

const recipeStore = useRecipeStore();

// Реф для хранения локального списка рецептов
const recipeList = ref<IRecipeResponse>({
  results: [],
  offset: 0,
  number: 0,
  totalResults: 0,
});

const filtersNumber = ref(4);
const filtersDiet = ref("");
const porcia = ref(4);
const offset = ref(0); // Начинаем с offset = 0
const searchQuery = ref("");
const recipeSummary = ref<{
  id: number;
  summary: string;
  title: string;
} | null>(null);

const loading = ref(false);
const isFetching = ref(false);
const isOpen = ref(false);
const noMore = computed(
  () => recipeList.value.results.length >= recipeList.value.totalResults
);
const disabled = computed(() => loading.value || noMore.value);
const scrollContainer = ref<HTMLElement | null>(null);

// Функция для обновления локального списка на основе данных из стора
const updateRecipeListFromStore = () => {
  if (recipeStore.recipeList) {
    // Если offset === 0, заменяем результаты
    if (offset.value === 0) {
      recipeList.value = { ...recipeStore.recipeList };
    } else {
      // Иначе добавляем новые результаты к существующим
      recipeList.value = {
        ...recipeStore.recipeList,
        results: [
          ...recipeList.value.results,
          ...recipeStore.recipeList.results,
        ],
      };
    }
  }
};

// Обработчик прокрутки вниз
const handleOffsetChange = async () => {
  if (disabled.value || isFetching.value) return;

  loading.value = true;
  isFetching.value = true;

  // Увеличиваем offset на количество загружаемых элементов
  offset.value += filtersNumber.value;

  recipeStore.updateParams({
    number: porcia.value,
    offset: offset.value,
    query: searchQuery.value,
  })

  // Вызываем метод стора для загрузки данных
  await recipeStore.fetchRecipe();

  // Обновляем локальный список на основе данных из стора
  updateRecipeListFromStore();

  loading.value = false;
  isFetching.value = false;
};

// Обработчик поиска
const handleSearchRecipe = async () => {
  if (!searchQuery.value.trim()) return;

  // Сбрасываем offset при новом поиске
  offset.value = 0;

  recipeStore.updateParams({
    number: porcia.value,
    offset: offset.value,
    query: searchQuery.value,
  })

  // Вызываем метод стора для загрузки данных
  await recipeStore.fetchRecipe();

  // Обновляем локальный список на основе данных из стора
  updateRecipeListFromStore();
};

// Обработчик фильтров
const handleFiltershRecipe = async () => {
  // Сбрасываем offset при изменении фильтров
  offset.value = 0;

  // Вызываем метод стора для загрузки данных
  recipeStore.updateParams({
    number: porcia.value,
    offset: offset.value,
    query: searchQuery.value,
    diet: filtersDiet.value,
  })

  // Вызываем метод стора для загрузки данных
  await recipeStore.fetchRecipe();

  // Обновляем локальный список на основе данных из стора
  updateRecipeListFromStore();
};

// Обработчик получения описания рецепта
const handleGetDescription = async (payloadIsOpen: boolean, id: number) => {
  isOpen.value = payloadIsOpen;
  const { data } = await fetchGetRecipeSummary(id);
  recipeSummary.value = data;
};

// Загрузка данных при монтировании компонента
onMounted(async () => {
  // Вызываем метод стора для загрузки данных
  await recipeStore.fetchRecipe();
  updateRecipeListFromStore();
});

watch(filtersNumber, (newValue) => {
  porcia.value = newValue; // Обновляем porcia при изменении selectedPorcia
});
</script>

<template>
  <div
    ref="scrollContainer"
    class="p-5 h-143 flex h-[90vh] bg-gray-600"
    style="overflow: auto"
    v-loading="recipeStore.isLoading"
  >
    <div class="w-[15vw] sticky top-0">
      <div class="text-white w-[12vw] flex flex-col gap-4">
        <p class="text-xl font-bold my-5">Фильтры</p>
        <div>
          <p class="font-bold mb-2">Подгружать за раз</p>
          <el-select v-model="filtersNumber" placeholder="Select" size="large">
            <el-option
              v-for="item in [4, 8, 12]"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div>
          <p class="font-bold mb-2">Выбирите диету</p>
          <el-select v-model="filtersDiet" placeholder="Select" size="large">
            <el-option
              v-for="item in dietsMock"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div>
          <el-button @click="handleFiltershRecipe">Применить</el-button>
        </div>
      </div>
    </div>
    <div class="justify-items-center w-[70vw]">
      <div class="flex gap-2">
        <el-input placeholder="Введите название блюда" v-model="searchQuery" />
        <el-button @click="handleSearchRecipe">Найти</el-button>
      </div>
      <div
        v-infinite-scroll="handleOffsetChange"
        :infinite-scroll-disabled="disabled"
      >
        <div
          v-for="item in recipeList.results"
          :key="item.id"
          class="p-6 m-3 text-white justify-center bg-gray-700 h-40"
        >
          <div class="flex gap-5">
            <router-link :to="'recipes/' + String(item.id)">
              <img :src="item.image" alt="item" class="h-29" />
            </router-link>
            <div>
              <p class="my-3">{{ item.title }}</p>
              <el-button
                @click="handleGetDescription(true, item.id)"
                type="primary"
              >
                Посмотреть краткую информацию
              </el-button>
            </div>
          </div>
        </div>
        <div class="justify-items-center">
          <p v-if="noMore" class="p-10 text-xl font-bold text-white">No more</p>
        </div>
      </div>
    </div>
    <div class="sticky top-0" v-if="isOpen && recipeSummary">
      <div class="text-white w-[11vw]">
        <p class="text-xl font-bold mb-5">Описание рецепта</p>
        <p class="text-2xl font-bold">{{ recipeSummary.title }}</p>
        <p class="my-4">{{ recipeSummary.summary }}</p>
      </div>
    </div>
  </div>
</template>
