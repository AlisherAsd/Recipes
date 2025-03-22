<template>
  <div v-loading="ingridientStore.isLoading">
    {{ ingridientStore.selectedIngridient?.name }}
    {{ ingridientStore.selectedIngridient?.nutrition }}
    {{ ingridientStore.selectedIngridient?.categoryPath }}
    {{ ingridientStore.selectedIngridient?.shoppingListUnits }}
    {{ ingridientStore.selectedIngridient?.meta }}
    {{ ingridientStore.selectedIngridient?.image }}
    <img
    class="w-100"
      :src="
        'https://spoonacular.com/cdn/ingredients_100x100/' +
        ingridientStore.selectedIngridient?.image
      "
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useIngridientStore } from "../stores/ingridient-store";

const ingridientStore = useIngridientStore();

onMounted(() => {
  const url = window.location.href;
  const id = Number(url.split("/")[4]);
  ingridientStore.fetchIngridientById(id);
});
</script>
