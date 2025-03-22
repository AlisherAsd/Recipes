export interface IRescipe {
  /** Рецепт */
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface IRecipeParams {
  /** Парматера запроса рецептов */
  query?: string;
  number?: number;
  offset?: number;
  diet?: string;
}

export interface IRecipeResponse {
  results: IRescipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface IRecipeSimilar {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}

export interface IRecipeInformationById {
  id: number;
  image: string;
  imageType: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number | null;
  cookingMinutes: number | null;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string | null;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: Ingredient[];
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId: number | null;
  spoonacularScore: number;
}

interface Ingredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: Measure;
    metric: Measure;
  };
}

interface Measure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length?: {
    number: number;
    unit: string;
  };
}

interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
  temperature?: {
    number: number;
    unit: string;
  };
}
