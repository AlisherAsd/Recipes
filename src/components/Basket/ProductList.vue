<script setup lang="ts">
import { onMounted } from "vue";
import { useBasketStore } from "../../stores/basket-store";

const basketStore = useBasketStore();

const handleRemoveItem = async (id: string) => {
  await basketStore.fetchDeleteItem(Number(id));
  await basketStore.fetchGetShoppngList();
}

onMounted(basketStore.fetchGetShoppngList);
</script>
<template>
  <div class="my-10">
    <!-- Мобильный вариант -->
    <div class="md:hidden">
      <ul class="flex flex-col gap-3" v-if="basketStore.shoppingList">
        <li class="border p-2 rounded-2xl border-gray-200" v-for="list in basketStore.shoppingList" :key="list.aisle">
          <h1 class="text-2xl mb-5 font-bold text-gray-500">
            Корзина покупок {{ list.aisle }}
          </h1>
          <div v-if="list.items">
            <ul v-for="product in list.items" :key="product.id">
              <li class="grid grid-cols-4 w-full gap-4">
                <div class="flex gap-3 col-span-2">Продукт 
                  <h1 class="font-bold uppercase">
                     {{ product.name }}
                  </h1>
                </div>
                <div class="text-gray-400 col-span-1">
                  {{ product.measures.original.amount }}
                  {{ product.measures.original.unit }}
                </div>
                <div class="col-span-1">
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
    <div class="gap-10 justify-center hidden md:flex">
      <ul v-if="basketStore.shoppingList">
        <li class="" v-for="list in basketStore.shoppingList" :key="list.aisle">
          <h1 class="text-2xl my-5 font-bold text-gray-500">
            Корзина покупок {{ list.aisle }}
          </h1>
          <div v-if="list.items">
            <el-table border :data="list.items" style="width: 100%">
              <el-table-column prop="name" label="Имя" width="180" />
              <el-table-column
                prop="measures.original.amount"
                label="Количество"
                width="180"
              />
              <el-table-column prop="measures.original.unit" label="Величина" />
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
