export interface IUserResponse {
  /** Хэш токена */
  hash: string;
  /** Статус */
  status: string;
  /** Имя пользователя */
  username: string;
  /** Пароль */
  spoonacularPassword: string;
}

export interface IUser {
  /** Имя пользователя */
  username: string;
  /** Хэш токена */
  hash: string;
  /** Пароль */
  password: string;
}




