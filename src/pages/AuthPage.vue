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

const handleUserAuth = async () => {
  try {
    const data: {data: IUserResponse} = await UsersService.fetchUserAuth(form.value);
    if (data) {
      localStorage.setItem("hash", data.data.hash);
      localStorage.setItem("username", data.data.username);
      localStorage.setItem("password", data.data.spoonacularPassword);
      userStore.authUserData = {
        hash: data.data.hash,
        username: data.data.username,
        password: data.data.spoonacularPassword,
      }
      router.push("/profile");
    }
  } catch (e) {
    console.error("Error fetching users:", e);
  }
};
</script>

<template>
  <div class="bg-gray-600 h-[90vh] flex flex-col justify-center items-center">
    <el-form class="w-100 bg-white flex flex-col gap-3 px-15 py-10">
      <h1 class="font-bold text-2xl mb-5">Войти</h1>

      <el-input v-model="form.username" placeholder="Username" />

      <el-button @click="handleUserAuth" class="mt-10" type="primary"
        >Войти</el-button
      >
    </el-form>
  </div>
</template>
