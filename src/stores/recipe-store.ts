import { defineStore } from "pinia";
import { ref } from "vue";
import { RecipeService } from "../api";
import type { IRescipe, IRecipeResponse, IRecipeParams, IRecipeInformationById, IRecipeSimilar } from "../types/RecipeType";

export const useRecipeStore = defineStore("recipe-store", () => {
    const recipeList = ref<IRecipeResponse | null>(null);
    const params = ref<IRecipeParams>({
        query: '',
        number: 4,
        offset: 0,
        diet: '',
    });

    const selectedRecipe = ref<IRecipeInformationById | null>(null);
    const similarSelectedRecipe = ref<IRecipeSimilar[] | null>(null);
    const error = ref<string | null>(null);
    const isLoading = ref<boolean>(false);

    async function fetchRecipe() {
        isLoading.value = true;
        error.value = null;
        try {
            const { data }: {data: IRecipeResponse} = await RecipeService.fetchGetRecipe(params.value);
            recipeList.value = data;
        } catch (err) {
            console.error(error);
            error.value = "Ошибка при загрузке рецептов";
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchRecipeById(id: number) {
        isLoading.value = true;
        error.value = null;
        try {
            const { data }: {data: IRecipeInformationById} = await RecipeService.fetchGetRecipeById(id);
            selectedRecipe.value = data;
        } catch (err) {
            console.error(error);
            error.value = "Ошибка при загрузке информации о рецепте";
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchRecipeSimilar(id: number) {
        isLoading.value = true;
        error.value = null;
        try {
            const { data }: {data: IRecipeSimilar[]} = await RecipeService.fetchGetRecipeSimilar(params.value, id);
            similarSelectedRecipe.value = data;
        } catch (err) {
            console.error(error);
            error.value = "Ошибка при загрузке похожих рецептов";
        } finally {
            isLoading.value = false;
        }
    }

    function updateParams(newParams: IRecipeParams) {
        params.value = {...params.value, ...newParams}
    }


    return { updateParams, recipeList, fetchRecipe, isLoading, error, fetchRecipeById, selectedRecipe, fetchRecipeSimilar, similarSelectedRecipe };
})