import { defineStore } from "pinia";
import { ref } from "vue";
import type { IUser } from "../types/UserTypes";

// Хранилище пользователя
export const useUserStore = defineStore("user-store", () => {
  // Данные пользователя
  const authUserData = ref<IUser>({
    username: "",
    hash: "",
  });
  // Ошибка
  const error = ref<string | null>(null);
  // Загрузка
  const isLoading = ref<boolean>(false);

  // Выход из системы
  function logout() {
    authUserData.value = {
      username: "",
      hash: "",
    };
    localStorage.removeItem("username");
    localStorage.removeItem("hash");
  }

  return { error, authUserData, isLoading, logout };
});
