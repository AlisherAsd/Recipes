<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user-store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const router = useRouter();
const { authUserData, isLoading } = storeToRefs(userStore);

const handleLogout = () => {
  userStore.logout();
  router.push("/auth");
};
</script>

<template>
  <div v-loading="isLoading" class="flex flex-col items-center my-20">
    <img class="w-70" src="../assets/img/profile.png" alt="" />
    <p class="my-10 text-2xl font-bold">
      {{ authUserData.username }}
    </p>
    <el-button type="danger" size="large" @click="handleLogout">Выйти</el-button>
  </div>
</template>
