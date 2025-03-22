<template>
    <div v-once class="flex items-center h-[10vh] justify-between p-3 text-white bg-gray-800">
        <div>
            <router-link to="/">
                <p class="text-2xl font-bold">logo</p>
            </router-link>
        </div>
        <div>
            <ul class="flex gap-4">
                <router-link to="/recipes">
                    <li>Рецепты</li>
                </router-link>
                <router-link to="/ingridients">
                    <li>Ингридиенты</li>
                </router-link>
                <li>Меню</li>
                <router-link to="/auth">
                    <li>Войти</li>
                </router-link>
            </ul>
        </div>
    </div>
</template>