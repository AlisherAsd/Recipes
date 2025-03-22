import { defineStore } from "pinia";
import { ref } from "vue";
import { IngridientService } from "../api";
import type { IIngredientReponse } from "../types/IngridientType";

export const useIngridientStore = defineStore("ingridient-store", () => {
    const selectedIngridient = ref<IIngredientReponse | null>(null);
    const error = ref<string | null>(null);
    const isLoading = ref<boolean>(false);

    async function fetchIngridientById(id: number) {
        isLoading.value = true;
        error.value = null;
        try {
            const { data }:{ data: IIngredientReponse | null } = await IngridientService.fetchGetIngridientById(String(id));
            selectedIngridient.value = data;
        } catch (err) {
            console.error(error);
            error.value = "Ошибка при загрузке информации о ингридиенте";
        } finally {
            isLoading.value = false;
        }
    }

    return { fetchIngridientById, error, selectedIngridient, isLoading };
})