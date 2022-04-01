export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface RecipesFilter {
  name?: string;
}
