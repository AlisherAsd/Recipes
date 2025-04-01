import { defineStore } from "pinia";
import { ref } from "vue";
import { RecipeService } from "../api";
import type {
  IRecipeResponse,
  IRecipeParams,
  IRecipeInformationById,
  IRecipeSimilar,
  ISummeryDescription,
} from "../types/RecipeType";

// Хранилище рецептов
export const useRecipeStore = defineStore("recipe-store", () => {
  // Список рецептов
  const recipeList = ref<IRecipeResponse>({
    results: [],
    offset: 0,
    number: 0,
    totalResults: 0,
  });
  // Параметры запроса
  const params = ref<IRecipeParams>({
    query: "",
    number: 4,
    offset: 0,
    diet: "",
  });
  // Выбранный рецепт
  const selectedRecipe = ref<IRecipeInformationById | null>(null);
  // Похожие рецепты
  const similarSelectedRecipe = ref<IRecipeSimilar[] | null>(null);
  // Краткая информация о рецепте
  const summaryRecipe = ref({
    title: "",
    description: "",
    isOpenDrawer: false,
  });
  // Ошибка
  const error = ref<string | null>(null);
  // Загрузка
  const isLoading = ref<boolean>(false);

  // Функция для загрузки рецептов
  async function fetchRecipe() {
    isLoading.value = true;
    error.value = null;

    try {
      const { data }: { data: IRecipeResponse } =
        await RecipeService.fetchGetRecipe(params.value);

      // Если offset === 0, заменяем результаты
      if (params.value.offset === 0) {
        recipeList.value = data;
      } else {
        // Иначе добавляем новые результаты к существующим
        recipeList.value = {
          ...data,
          results: [...recipeList.value.results, ...data.results],
        };
      }
    } catch (err) {
      console.error(err);
      error.value = "Ошибка при загрузке рецептов";
    } finally {
      isLoading.value = false;
    }
  }

  // Функция для обновления параметров запроса
  function updateParams(newParams: Partial<IRecipeParams>) {
    params.value = { ...params.value, ...newParams };
  }

  // Функция для сброса параметров запроса
  function resetParams() {
    params.value = {
      number: 4,
      offset: 0,
      diet: "",
      query: "",
      cuisine: "",
      type: ""
    };
  }

  // Функция для сброса offset и загрузки новых данных
  async function resetAndFetchRecipe() {
    params.value.offset = 0;
    await fetchRecipe();
  }

  // Функция для загрузки рецепта по ID
  async function fetchRecipeById(id: number) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data }: { data: IRecipeInformationById } =
        await RecipeService.fetchGetRecipeById(id);
      selectedRecipe.value = data;
    } catch (err) {
      console.error(err);
      error.value = "Ошибка при загрузке информации о рецепте";
    } finally {
      isLoading.value = false;
    }
  }

  // Функция для загрузки похожих рецептов
  async function fetchRecipeSimilar(id: number) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data }: { data: IRecipeSimilar[] } =
        await RecipeService.fetchGetRecipeSimilar(params.value, id);
      similarSelectedRecipe.value = data;
    } catch (err) {
      console.error(err);
      error.value = "Ошибка при загрузке похожих рецептов";
    } finally {
      isLoading.value = false;
    }
  }

  // Функция для загрузки краткой информации о рецепте
  async function fetchRecipeSummary(id: number) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data }: { data: ISummeryDescription } =
        await RecipeService.fetchGetRecipeSummary(id);
      summaryRecipe.value.description = data.summary;
      summaryRecipe.value.title = data.title;
      summaryRecipe.value.isOpenDrawer = true;
    } catch (e) {
      error.value = "Ошибка при получени кратких данных о рецепте";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    recipeList,
    params,
    selectedRecipe,
    similarSelectedRecipe,
    error,
    isLoading,
    fetchRecipe,
    updateParams,
    resetAndFetchRecipe,
    fetchRecipeById,
    fetchRecipeSimilar,
    resetParams,
    fetchRecipeSummary,
    summaryRecipe,
  };
});
