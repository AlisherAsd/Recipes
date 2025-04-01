<script setup lang="ts">
import { ref } from "vue";
import { BasketService } from "../../api";
import { useUserStore } from "../../stores/user-store";
import { useBasketStore } from "../../stores/basket-store";

const basketStore = useBasketStore();
const userStore = useUserStore();
const isModalOpen = ref(false);
const isCreateList = ref("Список");

const selectList = ref("");
const product = ref({
  name: "",
  count: 0,
})

// Обработка создания продукта или списка
const handleCreateProductOrList = async () => {
  // Проверка на пустые значения
  if (product.value.count === 0 || !product.value.name.trim() || !selectList.value.trim()) return;

  // Создание продукта или списка
  await BasketService.fetchCreateShoppingOrProduct(
    userStore.authUserData.hash,
    userStore.authUserData.username,
    {
      item: `${product.value.count} package ${product.value.name}`,
      aisle: selectList.value,
      parse: true,
    }
  );
  selectList.value = "";
  product.value.name = "";
  product.value.count = 0;
  // Обновление списка продуктов
  basketStore.fetchGetShoppingList();
  // Закрытие модального окна
  isModalOpen.value = false;
};
</script>

<template>
  <!-- Кнопка добавления продукта или списка -->
  <div class="pb-5 pt-5 sticky top-0 w-[100%] flex justify-center bg-white border-b-2 border-gray-200 z-10">
    <el-button type="success" size="large" @click="isModalOpen = true">Добавить товар</el-button>
  </div>
  <!-- Модальное окно добавления продукта или списка -->
  <el-dialog v-model="isModalOpen" align-center width="auto">
    <div class="flex flex-col gap-5 p-3 items-center">
      <h3 class="mb-3 text-2xl font-bold">
        Добавление товара или списка покупок
      </h3>
      <div class="w-[80%]">
        <div>
          <p class="mb-3 text-gray-400 font-bold">
            Выберите список или создайте новый
          </p>
          <div>
            <!-- Выбор списка или создание нового -->
            <el-radio-group
              v-model="isCreateList"
              @change="isCreateList = $event"
            >
              <el-radio :value="'Список'">Список</el-radio>
              <el-radio :value="'Создать новый'">Создать новый</el-radio>
            </el-radio-group>
            <!-- Создание нового списка -->
            <el-input
              v-if="isCreateList === 'Создать новый'"
              v-model="selectList"
              placeholder="Введите название нового листа"
            ></el-input>
            <!-- Выбор списка -->
            <el-select v-else v-model="selectList">
              <el-option
                v-for="list in basketStore.shoppingList"
                :key="list.aisle"
                :label="list.aisle"
                :value="list.aisle"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="flex flex-col gap-3 mt-3 text-gray-400 font-bold">
          <!-- Введите название продукта -->
          <p class="">Введите название продукта</p>
          <el-input v-model="product.name"></el-input>
          <!-- Сколько упаковок? -->
          <p class="">Сколько упаковок?</p>
          <el-slider v-model="product.count" show-input />
        </div>
        <!-- Кнопка добавления продукта или списка -->
        <div class="flex justify-center mt-5">
          <el-button type="success" size="large" @click="handleCreateProductOrList()">Добавить</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
