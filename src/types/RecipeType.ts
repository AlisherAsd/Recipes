/** Интерфейс для базовой информации о рецепте */
export interface IRescipe {
  /** Уникальный идентификатор рецепта */
  id: number;
  /** Название рецепта */
  title: string;
  /** URL изображения рецепта */
  image: string;
  /** Тип изображения */
  imageType: string;
}

/** Интерфейс для параметров поиска рецептов */
export interface IRecipeParams {
  /** Поисковый запрос */
  query?: string;
  /** Количество результатов на странице */
  number?: number;
  /** Смещение для пагинации */
  offset?: number;
  /** Тип диеты */
  diet?: string;
  /** Тип кухни */
  cuisine?: string;
  /** Тип блюда */
  type?: string;
}

/** Интерфейс для ответа API с списком рецептов */
export interface IRecipeResponse {
  /** Массив найденных рецептов */
  results: IRescipe[];
  /** Текущее смещение */
  offset: number;
  /** Количество возвращенных результатов */
  number: number;
  /** Общее количество доступных результатов */
  totalResults: number;
}

/** Интерфейс для похожих рецептов */
export interface IRecipeSimilar {
  /** Уникальный идентификатор рецепта */
  id: number;
  /** Название рецепта */
  title: string;
  /** Тип изображения */
  imageType: string;
  /** Время приготовления в минутах */
  readyInMinutes: number;
  /** Количество порций */
  servings: number;
  /** URL источника рецепта */
  sourceUrl: string;
}

/** Интерфейс для детальной информации о рецепте */
export interface IRecipeInformationById {
  /** Уникальный идентификатор */
  id: number;
  /** URL изображения */
  image: string;
  /** Тип изображения */
  imageType: string;
  /** Название рецепта */
  title: string;
  /** Время приготовления в минутах */
  readyInMinutes: number;
  /** Количество порций */
  servings: number;
  /** URL источника */
  sourceUrl: string;
  /** Вегетарианское блюдо */
  vegetarian: boolean;
  /** Веганское блюдо */
  vegan: boolean;
  /** Без глютена */
  glutenFree: boolean;
  /** Без молочных продуктов */
  dairyFree: boolean;
  /** Очень полезное */
  veryHealthy: boolean;
  /** Недорогое */
  cheap: boolean;
  /** Очень популярное */
  veryPopular: boolean;
  /** Экологически устойчивое */
  sustainable: boolean;
  /** Низкое содержание FODMAP */
  lowFodmap: boolean;
  /** Баллы Weight Watchers */
  weightWatcherSmartPoints: number;
  /** Тип диетического протокола */
  gaps: string;
  /** Время подготовки в минутах */
  preparationMinutes: number | null;
  /** Время приготовления в минутах */
  cookingMinutes: number | null;
  /** Количество лайков */
  aggregateLikes: number;
  /** Оценка полезности */
  healthScore: number;
  /** Текст авторства */
  creditsText: string;
  /** Лицензия */
  license: string | null;
  /** Название источника */
  sourceName: string;
  /** Цена за порцию */
  pricePerServing: number;
  /** Расширенный список ингредиентов */
  extendedIngredients: Ingredient[];
  /** Краткое описание */
  summary: string;
  /** Типы кухни */
  cuisines: string[];
  /** Типы блюд */
  dishTypes: string[];
  /** Типы диет */
  diets: string[];
  /** Поводы для приготовления */
  occasions: string[];
  /** Инструкция по приготовлению */
  instructions: string;
  /** Разобранные инструкции по шагам */
  analyzedInstructions: AnalyzedInstruction[];
  /** Оригинальный ID */
  originalId: number | null;
  /** Оценка Spoonacular */
  spoonacularScore: number;
}

/** Интерфейс для ингредиента */
interface Ingredient {
  /** Уникальный идентификатор */
  id: number;
  /** Категория в магазине */
  aisle: string;
  /** URL изображения */
  image: string;
  /** Консистенция */
  consistency: string;
  /** Название */
  name: string;
  /** Очищенное название */
  nameClean: string;
  /** Оригинальное описание */
  original: string;
  /** Оригинальное название */
  originalName: string;
  /** Количество */
  amount: number;
  /** Единица измерения */
  unit: string;
  /** Дополнительные заметки */
  meta: string[];
  /** Меры измерения */
  measures: {
    /** Американская система */
    us: Measure;
    /** Метрическая система */
    metric: Measure;
  };
}

/** Интерфейс для единиц измерения */
interface Measure {
  /** Количество */
  amount: number;
  /** Краткое название единицы */
  unitShort: string;
  /** Полное название единицы */
  unitLong: string;
}

/** Интерфейс для разобранной инструкции */
interface AnalyzedInstruction {
  /** Название инструкции */
  name: string;
  /** Шаги приготовления */
  steps: Step[];
}

/** Интерфейс для шага приготовления */
interface Step {
  /** Номер шага */
  number: number;
  /** Описание шага */
  step: string;
  /** Используемые ингредиенты */
  ingredients: Ingredient[];
  /** Используемое оборудование */
  equipment: Equipment[];
  /** Длительность шага */
  length?: {
    /** Количество */
    number: number;
    /** Единица времени */
    unit: string;
  };
}

/** Интерфейс для кухонного оборудования */
interface Equipment {
  /** Уникальный идентификатор */
  id: number;
  /** Название */
  name: string;
  /** Локализованное название */
  localizedName: string;
  /** URL изображения */
  image: string;
  /** Температурные параметры */
  temperature?: {
    /** Значение температуры */
    number: number;
    /** Единица измерения температуры */
    unit: string;
  };
}

/** Интерфейс для краткого описания рецепта */
export interface ISummeryDescription {
  /** Уникальный идентификатор */
  id: number;
  /** Описание рецепта */
  summary: string;
  /** Название рецепта */
  title: string;
}