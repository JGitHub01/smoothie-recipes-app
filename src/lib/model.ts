export interface Recipe {
  name: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}
