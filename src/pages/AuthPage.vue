<script setup lang="ts">
import { onMounted, ref } from "vue";
import { UsersService } from "../api";

interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

const form = ref<IUser>({
  username: "asdasd",
  firstName: "asdasd",
  lastName: "asdasd",
  email: "asdasd@gmail.com",
});

onMounted(async () => {
  try {
    const data = await UsersService.fetchUserAuth();
    console.log("User data:", data);
  } catch (e) {
    console.error("Error fetching users:", e);
  }
});
</script>

<template>
  <div class="bg-gray-600 h-[90vh] flex flex-col justify-center items-center">
    <el-form class="w-100 bg-white flex flex-col gap-3 px-15 py-10">
      <h1 class="font-bold text-2xl mb-5">Войти</h1>

      <el-input v-model="form.username" placeholder="Username" />

      <el-input v-model="form.firstName" placeholder="FirstName" />

      <el-input v-model="form.lastName" placeholder="LastName" />

      <el-input v-model="form.email" placeholder="Email" />

      <el-button class="mt-10" type="primary">Войти</el-button>
    </el-form>
  </div>
</template>
