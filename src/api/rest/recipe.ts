import type { IRecipeInformationById, IRecipeParams, IRecipeResponse, IRecipeSimilar, ISummeryDescription } from "../../types/RecipeType";
import makeRequest from "../httpClient";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/** Функция для получения рецептов 
 * @param Параметры
*/
export function fetchGetRecipe(params: IRecipeParams) {
  /** Полуение рецептов */
  return makeRequest<IRecipeResponse>({
    url: `${API_URL}/recipes/complexSearch?apiKey=${API_KEY}`,
    method: "GET",
    params
  });
}

/** Функция для получения рецепта 
 * @id Id рецепта
*/
export function fetchGetRecipeById(id: number) {
  /** Получение рецепта */
  return makeRequest<IRecipeInformationById>({
    url: `${API_URL}/recipes/${id}/information?apiKey=${API_KEY}`,
    method: "GET",
  });
}

/** Функция для получения похожих рецептов
 * @param Параметры
 * @id Id рецепта на которых должны быть найдены похожие
*/
export function fetchGetRecipeSimilar(params: IRecipeParams, id: number) {
  /** Получение похожих рецептов */
  return makeRequest<IRecipeSimilar[]>({
    url: `${API_URL}/recipes/${id}/similar?apiKey=${API_KEY}`,
    method: "GET",
    params
  });
}

/** Функция для получения рандомных рецептов 
 * @param Параметры
*/
export function fetchGetRecipeRandom(params: IRecipeParams) {
  /** Получения рандомных рецептов  */ 
  return makeRequest<{recipes: IRecipeInformationById[]}>({
    url: `${API_URL}/recipes/random?apiKey=${API_KEY}`,
    method: "GET",
    params
  });
}
/** Функция для получение краткого описание рецепта 
 * @id Id рецепта
*/
export function fetchGetRecipeSummary(id: number) {
  /** Получние краткого описания */ 
  return makeRequest<ISummeryDescription>({
    url: `${API_URL}/recipes/${id}/summary?apiKey=${API_KEY}`,
    method: "GET",
  });
}
