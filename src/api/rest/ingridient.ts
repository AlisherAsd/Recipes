import type { IIngredientReponse } from "../../types/IngridientType";
import makeRequest from "../httpClient";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/** Функция для получения ингридиента
 * @id Id ингридиента
*/
export function fetchGetIngridientById(id: string) {
    /** Получение ингридиента */
    return makeRequest<IIngredientReponse>({
      url: `${API_URL}/food/ingredients/${id}/information?apiKey=${API_KEY}`,
      method: "GET",
    });
  }
  