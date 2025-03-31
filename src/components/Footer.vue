<template>
  <footer class="bg-black text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Лого и описание -->
        <div class="mb-6 md:mb-0">
          <h2 class="text-2xl font-bold mb-2">YourLogo</h2>
          <p class="text-gray-400 max-w-md">Краткое описание компании или слоган. Здесь может быть пара слов о вашем бренде.</p>
        </div>

        <!-- Навигация -->
        <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Меню</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Главная</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">О нас</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Услуги</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Контакты</h3>
            <ul class="space-y-2">
              <li class="text-gray-400">+7 (123) 456-78-90</li>
              <li class="text-gray-400">example@mail.com</li>
              <li class="text-gray-400">г. Москва, ул. Примерная, 123</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Копирайт -->
      <div class="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
        <p>© 2023 YourCompany. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Можно добавить логику при необходимости
</script>