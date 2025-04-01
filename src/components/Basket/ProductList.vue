<script setup lang="ts">
import { onMounted } from "vue";
import { useBasketStore } from "../../stores/basket-store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const basketStore = useBasketStore();
const { isLoading, shoppingList, error } = storeToRefs(basketStore);

// Пуста ли корзина
const isProductListEmpty = computed(() => {
  return shoppingList.value?.length === 0;
});

// Обработка удаления продукта
const handleRemoveItem = async (id: string) => {
  await basketStore.fetchDeleteItem(Number(id));
  await basketStore.fetchGetShoppingList();
};

// Получение списка продуктов при монтировании компонента
onMounted(basketStore.fetchGetShoppingList);
</script>
<template>
  <div class="my-10">
    <div class="flex flex-col items-center">
      <p class="text-2xl font-bold text-gray-500 my-4">Корзина покупок</p>
      <p v-if="error" class="text-2xl font-bold text-gray-500">
        Ошибка при загрузке корзины
      </p>
      <p v-if="isProductListEmpty" class="text-2xl font-bold text-gray-500">
        Корзина пуста
      </p>
    </div>
    <!-- Мобильный вариант -->
    <div class="md:hidden">
      <ul class="flex flex-col gap-3" v-if="shoppingList">
        <li
          class="border p-2 rounded-2xl border-gray-200 transition hover:shadow-xl hover:-translate-y-1"
          v-for="list in shoppingList"
          :key="list.aisle"
        >
          <h1 class="text-2xl mb-5 font-bold text-gray-500">
            {{ list.aisle }}
          </h1>
          <!-- Список продуктов -->
          <div v-if="list.items">
            <ul v-for="product in list.items" :key="product.id">
              <!-- Продукт -->
              <li class="grid grid-cols-4 w-full gap-4">
                <div class="col-span-2">
                  <!-- Название продукта -->
                  <h1 class="font-bold uppercase">
                    {{ product.name }}
                  </h1>
                </div>
                <div class="text-gray-400 col-span-1">
                  <!-- Количество продукта -->
                  {{ product.measures.original.amount }}
                  <!-- Величина продукта -->
                  {{ product.measures.original.unit }}
                </div>
                <div class="col-span-1">
                  <!-- Кнопка удаления продукта -->
                  <el-button
                    type="danger"
                    plain
                    circle
                    size="small"
                    @click="handleRemoveItem(String(product.id))"
                  >
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <!-- Декстопный вариант -->
    <div class="gap-10 justify-center hidden md:flex" v-loading="isLoading">
      <ul v-if="shoppingList">
        <li class="" v-for="list in shoppingList" :key="list.aisle">
          <h1 class="text-2xl my-5 font-bold text-gray-500">
            {{ list.aisle }}
          </h1>
          <!-- Список продуктов -->
          <div v-if="list.items">
            <el-table
              border
              :data="list.items"
              style="width: 100%"
              class="transition hover:shadow-xl hover:-translate-y-0.5"
            >
              <el-table-column prop="name" label="Имя" width="180" />
              <el-table-column
                prop="measures.original.amount"
                label="Количество"
                width="160"
              />
              <!-- Величина продукта -->
              <el-table-column prop="measures.original.unit" label="Величина" />
              <!-- Действия -->
              <el-table-column label="Действия" width="120" align="center">
                <template #default="{ row }">
                  <el-button
                    type="danger"
                    plain
                    circle
                    size="small"
                    @click="handleRemoveItem(row.id)"
                  >
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
