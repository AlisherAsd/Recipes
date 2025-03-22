import type { IIngredientReponse } from "../../types/IngridientType";
import makeRequest from "../httpClient";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export function fetchGetIngridientById(id: string) {
    /** Получение листа рецептов */
    return makeRequest<IIngredientReponse>({
      url: `${API_URL}/food/ingredients/${id}/information?apiKey=${API_KEY}`,
      method: "GET",
    });
  }
  