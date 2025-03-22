import type { IRecipeInformationById, IRecipeParams, IRecipeResponse, IRecipeSimilar } from "../../types/RecipeType";
import makeRequest from "../httpClient";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export function fetchGetRecipe(params: IRecipeParams) {
  /** Получение листа рецептов */
  return makeRequest<IRecipeResponse>({
    url: `${API_URL}/recipes/complexSearch?apiKey=${API_KEY}`,
    method: "GET",
    params
  });
}

export function fetchGetRecipeById(id: number) {
  return makeRequest<IRecipeInformationById>({
    url: `${API_URL}/recipes/${id}/information?apiKey=${API_KEY}`,
    method: "GET",
  });
}

export function fetchGetRecipeSimilar(params: IRecipeParams, id: number) {
  return makeRequest<IRecipeSimilar[]>({
    url: `${API_URL}/recipes/${id}/similar?apiKey=${API_KEY}`,
    method: "GET",
    params
  });
}

export function fetchGetRecipeRandom(params: IRecipeParams) {
  return makeRequest<IRecipeInformationById[]>({
    url: `${API_URL}/recipes/random?apiKey=${API_KEY}`,
    method: "GET",
    params
  });
}

export function fetchGetRecipeSummary(id: number) {
  return makeRequest<{
    id: number,
    summary: string,
    title: string
  }>({
    url: `${API_URL}/recipes//${id}/summary?apiKey=${API_KEY}`,
    method: "GET",
  });
}
