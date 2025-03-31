import type {
  IUserResponse,
} from "../../types/UserTypes";
import makeRequest from "../httpClient";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/** Функция для авторизации 
 * @userData Данные пользователя
*/
export function fetchUserAuth(userData: { username: string }) {
  /** Получение данных пользователя*/
  return makeRequest<IUserResponse>({
    url: `${API_URL}/users/connect?apiKey=${API_KEY}`,
    method: "POST",
    data: userData,
  });
}

