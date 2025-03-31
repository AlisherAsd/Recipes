<script setup lang="ts">
import DrawerBasketList from "./components/Basket/DrawerBasketList.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header/Header.vue";
import { useUserStore } from "./stores/user-store";

const userStore = useUserStore();

if (localStorage.getItem("hash")) {
  userStore.authUserData.hash = localStorage.getItem("hash");
  userStore.authUserData.username = localStorage.getItem("username");
  userStore.authUserData.password = localStorage.getItem("password");
}
</script>

<template>
   <Header />
  <DrawerBasketList class="hidden md:flex"/>
  <div class="grid justify-center bg-gray-100">
    <div class="md:w-[70vw] w-[100vw] min-h-[100vh] bg-white">
      <router-view />
    </div>
  </div>
  <Footer />
</template>
