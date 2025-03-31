import type {
  ICreateProductResponse,
  IProductCreate,
  IShoppingListResponse,
} from "../../types/BasketType";
import makeRequest from "../httpClient";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/** Функция для листа продуктов
 * @hash Хэш токена
 * @username Имя пользователя
 */
export function fetchGetShoppngList(hash: string, username: string) {
  /** Получение листа рецептов */
  return makeRequest<IShoppingListResponse>({
    url: `${API_URL}/mealplanner/${username}/shopping-list?apiKey=${API_KEY}&hash=${hash}`,
    method: "GET",
  });
}

/** Функция для создания продукта или списка
 * @hash Хэш токена
 * @username Имя пользователя
 * @productData Данные продукта
 */
export function fetchCreateShoppingOrProduct(
  hash: string,
  username: string,
  productData: IProductCreate
) {
  /** Получение созданного продукта */
  return makeRequest<ICreateProductResponse>({
    url: `${API_URL}/mealplanner/${username}/shopping-list/items?apiKey=${API_KEY}&hash=${hash}`,
    method: "POST",
    data: productData,
  });
}
/** Функция для удаения продукта
 * @hash Хэш токена
 * @username Имя пользователя
 * @id Id продукта для удаления
 */
export function fetchDeleteItem(hash: string, username: string, id: number) {
  /** Получение удаления продукта */
  return makeRequest<{}>({
    url: `${API_URL}/mealplanner/${username}/shopping-list/items/${id}?apiKey=${API_KEY}&hash=${hash}`,
    method: "DELETE",
  });
}
