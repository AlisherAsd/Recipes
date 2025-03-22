import makeRequest from "../httpClient";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export function fetchUserAuth() {
  /** Получение листа рецептов */
  return makeRequest({
    url: `${API_URL}/users/connect?apiKey=${API_KEY}`,
    method: "POST",
    data: {
      "username": "your user's name",
      "firstName": "your user's first name",
      "lastName": "your user's last name",
      "email": "your user's email",
    },
  });
}
