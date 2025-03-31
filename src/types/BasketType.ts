/** Интерфейс для категории товаров в корзине */
export interface IAisle {
  /** Название категории */
  aisle: string;
  /** Список товаров в категории */
  items: IItem[];
}

/** Интерфейс для ответа со списком покупок */
export interface IShoppingListResponse {
  /** Массив категорий товаров */
  aisles: IAisle[];
  /** Общая стоимость */
  cost: number;
  /** Дата начала */
  startDate: number;
  /** Дата окончания */
  endDate: number;
}

/** Интерфейс для ответа при создании продукта */
export interface ICreateProductResponse {
  /** Уникальный идентификатор */
  id: number;
  /** Название продукта */
  name: string;
  /** Единицы измерения */
  measures: {
    /** Оригинальные единицы измерения */
    original: {
      /** Количество */
      amount: 1.0;
      /** Единица измерения */
      unit: string;
    };
    /** Метрические единицы измерения */
    metric: {
      /** Количество */
      amount: 1.0;
      /** Единица измерения */
      unit: string;
    };
    /** Американские единицы измерения */
    us: {
      /** Количество */
      amount: 1.0;
      /** Единица измерения */
      unit: string;
    };
  };
  /** Варианты использования */
  usages: [];
  /** ID рецептов, где используется */
  usageRecipeIds: [];
  /** Является ли товаром для кладовой */
  pantryItem: false;
  /** Категория в магазине */
  aisle: string;
  /** Стоимость */
  cost: 0.14;
  /** ID ингредиента */
  ingredientId: 1077;
}

/** Интерфейс для создания продукта */
export interface IProductCreate {
  /** Название товара */
  item: string;
  /** Категория в магазине */
  aisle: string;
  /** Нужно ли парсить */
  parse: boolean;
}

/** Интерфейс для товара */
export interface IItem {
  /** Уникальный идентификатор */
  id: number;
  /** Название товара */
  name: string;
  /** Единицы измерения */
  measures: IMeasures;
  /** Варианты использования */
  usages: string[];
  /** ID рецептов, где используется */
  usageRecipeIds: number[];
  /** Является ли товаром для кладовой */
  pantryItem: boolean;
  /** Категория в магазине */
  aisle: string;
  /** Стоимость */
  cost: number;
  /** ID ингредиента */
  ingredientId: number;
}

/** Интерфейс для единиц измерения */
export interface IMeasures {
  /** Оригинальные единицы измерения */
  original: {
    /** Количество */
    amount: number;
    /** Единица измерения */
    unit: string;
  };
  /** Метрические единицы измерения */
  metric: {
    /** Количество */
    amount: number;
    /** Единица измерения */
    unit: string;
  };
  /** Американские единицы измерения */
  us: {
    /** Количество */
    amount: number;
    /** Единица измерения */
    unit: string;
  };
}
