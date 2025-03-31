<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();

const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push("/auth");
};
</script>

<template>
  <div class="flex flex-col items-center my-20">
    <img class="w-70" src="../assets/img/profile.png" alt="" />
    <p class="my-10 text-2xl font-bold">
      {{ userStore.authUserData.username }}
    </p>
    <el-button @click="handleLogout">Выйти</el-button>
  </div>
</template>
