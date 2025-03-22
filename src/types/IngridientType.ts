// Тип для объекта EstimatedCost
export interface EstimatedCost {
  value: number;
  unit: string;
}

// Тип для объекта Nutrient
export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

// Тип для объекта Property
export interface Property {
  name: string;
  amount: number;
  unit: string;
}

// Тип для объекта Flavonoid
export interface Flavonoid {
  name: string;
  amount: number;
  unit: string;
}

// Тип для объекта CaloricBreakdown
export interface CaloricBreakdown {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
}

// Тип для объекта WeightPerServing
export interface WeightPerServing {
  amount: number;
  unit: string;
}

// Тип для объекта Nutrition
export interface Nutrition {
  nutrients: Nutrient[];
  properties: Property[];
  flavonoids: Flavonoid[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
}

// Основной тип для объекта Ingredient
export interface IIngredientReponse {
  id: number;
  original: string;
  originalName: string;
  name: string;
  amount: number;
  unit: string;
  unitShort: string;
  unitLong: string;
  possibleUnits: string[];
  estimatedCost: EstimatedCost;
  consistency: string;
  shoppingListUnits: string[];
  aisle: string;
  image: string;
  meta: any[]; // Если meta имеет более конкретную структуру, замените any на соответствующий тип
  nutrition: Nutrition;
  categoryPath: string[];
}
