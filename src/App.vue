<script setup lang="ts">
import DrawerBasketList from "./components/Basket/DrawerBasketList.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header/Header.vue";
import { useUserStore } from "./stores/user-store";

const userStore = useUserStore();

// Проверка на наличие токена в localStorage
if (localStorage.getItem("hash")) {
  userStore.authUserData.hash = localStorage.getItem("hash");
  userStore.authUserData.username = localStorage.getItem("username");
}
</script>

<template>
  <!-- Шапка сайта -->
  <Header />
  <!-- Drawer для корзины -->
  <DrawerBasketList class="hidden md:flex"/>
  <!-- Контейнер для страницы -->
  <div class="grid justify-center bg-gray-100">
    <!-- Контейнер для страницы -->
    <div class="md:w-[70vw] w-[100vw] min-h-[70vh] bg-white">
      <!-- Контейнер для страницы -->
      <router-view />
    </div>
  </div>
  <!-- Футер сайта -->
  <Footer />
</template>
