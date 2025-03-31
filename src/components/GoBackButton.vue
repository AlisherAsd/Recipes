<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const HandleGoBack = () => {
  router.back();
};
</script>

<template>
  <div class="text-black">
    <button class="flex gap-1" @click="HandleGoBack">
      <el-icon size="30"><Back /></el-icon>
      <p class="text-xl items-center">Назад</p>
    </button>
  </div>
</template>
