<script setup lang="ts">
import { ref } from "vue";
import { UsersService } from "../api";
import type { IUserResponse } from "../types/UserTypes";
import { useUserStore } from "../stores/user-store";
import { useRouter } from "vue-router";

export interface IUser {
  username: string;
}

const userStore = useUserStore();
const router = useRouter()

const form = ref<IUser>({
  username: "",
});

// Обработка авторизации пользователя
const handleUserAuth = async () => {
  try {
    const data: {data: IUserResponse} = await UsersService.fetchUserAuth(form.value);
    if (data) {
      localStorage.setItem("hash", data.data.hash);
      localStorage.setItem("username", data.data.username);
      // Сохранение данных пользователя в хранилище
      userStore.authUserData = {
        hash: data.data.hash,
        username: data.data.username,
      }
      // Перенаправление на страницу профиля
      router.push("/profile");
    }
  } catch (e) {
    console.error("Ошибка при авторизации:", e);
  }
};
</script>

<template>
  <div class="h-[100vh] flex flex-col justify-center items-center">
    <el-form class="w-100 bg-white flex flex-col gap-3 border border-gray-200 shadow-lg px-15 py-10 rounded-2xl">
      <h1 class="font-bold text-2xl mb-5">Войти</h1>

      <el-input v-model="form.username" placeholder="Username" />

      <el-button @click="handleUserAuth" class="mt-10" type="primary"
        >Войти</el-button
      >
    </el-form>
  </div>
</template>
