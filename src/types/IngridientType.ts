/** Интерфейс для оценочной стоимости */
export interface EstimatedCost {
  /** Значение стоимости */
  value: number;
  /** Единица измерения стоимости */
  unit: string;
}

/** Интерфейс для пищевых веществ */
export interface Nutrient {
  /** Название пищевого вещества */
  name: string;
  /** Количество */
  amount: number;
  /** Единица измерения */
  unit: string;
  /** Процент от дневной нормы */
  percentOfDailyNeeds: number;
}

/** Интерфейс для свойств ингредиента */
export interface Property {
  /** Название свойства */
  name: string;
  /** Количество */
  amount: number;
  /** Единица измерения */
  unit: string;
}

/** Интерфейс для флавоноидов */
export interface Flavonoid {
  /** Название флавоноида */
  name: string;
  /** Количество */
  amount: number;
  /** Единица измерения */
  unit: string;
}

/** Интерфейс для распределения калорий */
export interface CaloricBreakdown {
  /** Процент белков */
  percentProtein: number;
  /** Процент жиров */
  percentFat: number;
  /** Процент углеводов */
  percentCarbs: number;
}

/** Интерфейс для веса порции */
export interface WeightPerServing {
  /** Количество */
  amount: number;
  /** Единица измерения */
  unit: string;
}

/** Интерфейс для пищевой ценности */
export interface Nutrition {
  /** Массив пищевых веществ */
  nutrients: Nutrient[];
  /** Массив свойств */
  properties: Property[];
  /** Массив флавоноидов */
  flavonoids: Flavonoid[];
  /** Распределение калорий */
  caloricBreakdown: CaloricBreakdown;
  /** Вес порции */
  weightPerServing: WeightPerServing;
}

/** Основной интерфейс для ответа с информацией об ингредиенте */
export interface IIngredientReponse {
  /** Уникальный идентификатор */
  id: number;
  /** Оригинальное название с количеством */
  original: string;
  /** Оригинальное название ингредиента */
  originalName: string;
  /** Название ингредиента */
  name: string;
  /** Количество */
  amount: number;
  /** Единица измерения */
  unit: string;
  /** Краткое обозначение единицы измерения */
  unitShort: string;
  /** Полное название единицы измерения */
  unitLong: string;
  /** Возможные единицы измерения */
  possibleUnits: string[];
  /** Оценочная стоимость */
  estimatedCost: EstimatedCost;
  /** Консистенция ингредиента */
  consistency: string;
  /** Единицы измерения для списка покупок */
  shoppingListUnits: string[];
  /** Категория в магазине */
  aisle: string;
  /** URL изображения */
  image: string;
  /** Дополнительные метаданные */
  meta: any[];
  /** Пищевая ценность */
  nutrition: Nutrition;
  /** Путь категории */
  categoryPath: string[];
}
