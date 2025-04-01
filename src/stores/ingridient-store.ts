import { defineStore } from "pinia";
import { ref } from "vue";
import { IngridientService } from "../api";
import type { IIngredientReponse } from "../types/IngridientType";

// Хранилище ингридиента
export const useIngridientStore = defineStore("ingridient-store", () => {
  // Выбранный ингридиент
  const selectedIngridient = ref<IIngredientReponse | null>(null);
  // Ошибка
  const error = ref<string | null>(null);
  // Загрузка
  const isLoading = ref<boolean>(false);

  // Получение ингридиента по id
  async function fetchIngridientById(id: number) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data }: { data: IIngredientReponse | null } =
        await IngridientService.fetchGetIngridientById(String(id));
      selectedIngridient.value = data;
    } catch (err) {
      console.error(error);
      error.value = "Ошибка при загрузке информации о ингридиенте";
    } finally {
      isLoading.value = false;
    }
  }

  return { fetchIngridientById, error, selectedIngridient, isLoading };
});
