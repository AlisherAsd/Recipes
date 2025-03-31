import { defineStore } from "pinia";
import { ref } from "vue";
import type { IAisle, IShoppingListResponse } from "../types/BasketType";
import { BasketService } from "../api";
import { useUserStore } from "./user-store";

export const useBasketStore = defineStore("basket-store", () => {
  const shoppingList = ref<IAisle[] | null>(null);
  const isDrawerOpen = ref(false);

  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  async function fetchGetShoppngList() {
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
    fetchGetShoppngList,
    fetchDeleteItem,
    error,
    isLoading,
    isDrawerOpen,
    shoppingList,
  };
});
