import { defineStore } from "pinia";
import { ref } from "vue";
import type { IAisle, IShoppingListResponse } from "../types/BasketType";
import { BasketService } from "../api";
import { useUserStore } from "./user-store";

// Хранилище корзины
export const useBasketStore = defineStore("basket-store", () => {
  // Список покупок
  const shoppingList = ref<IAisle[] | null>(null);
  // Открытие корзины
  const isDrawerOpen = ref(false);

  // Ошибка
  const error = ref<string | null>(null);
  // Загрузка
  const isLoading = ref<boolean>(false);

  // Получение списка покупок
  async function fetchGetShoppingList() {
    try {
      isLoading.value = true;
      error.value = null;
      const { data }: { data: IShoppingListResponse } =
        await BasketService.fetchGetShoppngList(
          useUserStore().authUserData.hash,
          useUserStore().authUserData.username
        );
      shoppingList.value = data.aisles;
    } catch (err) {
      error.value = "Ошибка при загрузке списка покупок";
    } finally {
      isLoading.value = false;
    }
  }

  // Удаление продукта
  async function fetchDeleteItem(id: number) {
    try {
      isLoading.value = true;
      error.value = null;
      await BasketService.fetchDeleteItem(
        useUserStore().authUserData.hash,
        useUserStore().authUserData.username,
        id
      );
    } catch (err) {
      error.value = "Ошибка при загрузке списка покупок";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    fetchGetShoppingList,
    fetchDeleteItem,
    error,
    isLoading,
    isDrawerOpen,
    shoppingList,
  };
});
